"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingUsers = yield this.userRepository.count();
            const role = existingUsers === 0 ? User_1.UserRole.ADMIN : User_1.UserRole.VIEWER;
            const passwordHash = yield bcrypt_1.default.hash(password, 10);
            const user = this.userRepository.create({
                email,
                passwordHash,
                role,
            });
            return this.userRepository.save(user);
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email } });
            if (!user || !(yield bcrypt_1.default.compare(password, user.passwordHash))) {
                throw new Error("Invalid credentials");
            }
            return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: "24h",
            });
        });
    }
    updateRole(userId, newRole, requestingUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOneOrFail({
                where: { id: userId },
            });
            if (user.role === User_1.UserRole.ADMIN && requestingUser.id !== user.id) {
                throw new Error("Cannot modify other admin users");
            }
            user.role = newRole;
            return this.userRepository.save(user);
        });
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 5, offset = 0, role } = query;
            const queryBuilder = this.userRepository.createQueryBuilder("user");
            if (role) {
                queryBuilder.where("user.role = :role", { role });
            }
            queryBuilder.take(limit).skip(offset);
            return queryBuilder.getMany();
        });
    }
    addUser(adminId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify admin user
            const admin = yield this.userRepository.findOne({ where: { id: adminId } });
            if (!admin || admin.role !== User_1.UserRole.ADMIN) {
                throw new error_middleware_1.ApiError(403, "Forbidden Access");
            }
            // Check if role is valid
            if (data.role === User_1.UserRole.ADMIN) {
                throw new error_middleware_1.ApiError(403, "Cannot create admin users");
            }
            // Check if email exists
            const existingUser = yield this.userRepository.findOne({
                where: { email: data.email },
            });
            if (existingUser) {
                throw new error_middleware_1.ApiError(409, "Email already exists.");
            }
            const hashedPassword = yield bcrypt_1.default.hash(data.password, 10);
            const user = this.userRepository.create(Object.assign(Object.assign({}, data), { passwordHash: hashedPassword }));
            yield this.userRepository.save(user);
        });
    }
    deleteUser(adminId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify admin user
            const admin = yield this.userRepository.findOne({ where: { id: adminId } });
            if (!admin || admin.role !== User_1.UserRole.ADMIN) {
                throw new error_middleware_1.ApiError(403, "Forbidden Access");
            }
            // Find user to delete
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new error_middleware_1.ApiError(404, "User not found.");
            }
            // Prevent deleting admin users
            if (user.role === User_1.UserRole.ADMIN) {
                throw new error_middleware_1.ApiError(403, "Cannot delete admin users");
            }
            yield this.userRepository.remove(user);
        });
    }
    updatePassword(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new error_middleware_1.ApiError(404, "User not found.");
            }
            // Verify old password
            const isValidPassword = yield bcrypt_1.default.compare(data.old_password, user.passwordHash);
            if (!isValidPassword) {
                throw new error_middleware_1.ApiError(400, "Invalid old password");
            }
            // Update password
            user.passwordHash = yield bcrypt_1.default.hash(data.new_password, 10);
            yield this.userRepository.save(user);
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
