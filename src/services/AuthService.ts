import { Repository } from "typeorm";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ApiError } from "../middleware/error.middleware";
import { User, UserRole } from "../entities/User";
import { Session } from "../entities/Session";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly SALT_ROUNDS = 10;

  constructor(
    @inject("UserRepository") private readonly userRepository: Repository<User>,
    @inject("SessionRepository") private readonly sessionRepository: Repository<Session>
  ) {
    this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
  }

  async login(email: string, password: string): Promise<string> {
 
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

 
    const isPasswordValid = await compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }


    const token = sign({ id: user.id, email: user.email, role:user.role }, this.JWT_SECRET, {
      expiresIn: "24h",
    });

  
    const session = this.sessionRepository.create({
      userId: user.id,
      token,
    });
    await this.sessionRepository.save(session);

    return token;
  }

  async signup(email: string, password: string): Promise<void> {

    const hashedPassword = await hash(password, this.SALT_ROUNDS);

    const adminUser = await this.userRepository.find();

    const user = this.userRepository.create({
      email,
      passwordHash: hashedPassword,
      role: adminUser.length <= 0 ? UserRole.ADMIN : UserRole.VIEWER
    });

    await this.userRepository.save(user);
  }

  async logout(userId: string): Promise<void> {
  
    await this.sessionRepository.delete({ userId });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    return password.length >= 8 && /\d/.test(password);
  }
}
