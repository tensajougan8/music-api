import { Repository } from "typeorm";
import { User, UserRole } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../middleware/error.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class UserService {
  constructor(
    @inject("UserRepository") private readonly userRepository: Repository<User>
  ) {}

  async register(email: string, password: string): Promise<User> {
    const existingUsers = await this.userRepository.count();
    const role = existingUsers === 0 ? UserRole.ADMIN : UserRole.VIEWER;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      passwordHash,
      role,
    });

    return this.userRepository.save(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new Error("Invalid credentials");
    }

    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });
  }

  async updateRole(
    userId: string,
    newRole: UserRole,
    requestingUser: User
  ): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    if (user.role === UserRole.ADMIN && requestingUser.id !== user.id) {
      throw new Error("Cannot modify other admin users");
    }

    user.role = newRole;
    return this.userRepository.save(user);
  }

  async findAll(query: { limit?: number; offset?: number; role?: UserRole }) {
    const { limit = 5, offset = 0, role } = query;

    const queryBuilder = this.userRepository.createQueryBuilder("user");


    if (role) {
      queryBuilder.where("user.role = :role", { role });
    }
    queryBuilder.take(limit).skip(offset);

    return queryBuilder.getMany();
  }

  async addUser(
    adminId: string,
    data: { email: string; password: string; role: UserRole }
  ) {

    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new ApiError(403, "Forbidden Access");
    }

    if (data.role === UserRole.ADMIN) {
      throw new ApiError(403, "Cannot create admin users");
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ApiError(409, "Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      ...data,
      passwordHash: hashedPassword,
    });

    await this.userRepository.save(user);
  }

  async deleteUser(adminId: string, userId: string) {
  
    const admin = await this.userRepository.findOne({ where: { id: adminId } });
    if (!admin || admin.role !== UserRole.ADMIN) {
      throw new ApiError(403, "Forbidden Access");
    }


    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    if (user.role === UserRole.ADMIN) {
      throw new ApiError(403, "Cannot delete admin users");
    }

    await this.userRepository.remove(user);
  }

  async updatePassword(
    userId: string,
    data: { old_password: string; new_password: string }
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }


    const isValidPassword = await bcrypt.compare(
      data.old_password,
      user.passwordHash
    );
    if (!isValidPassword) {
      throw new ApiError(400, "Invalid old password");
    }
    user.passwordHash = await bcrypt.hash(data.new_password, 10);
    await this.userRepository.save(user);
  }
}
