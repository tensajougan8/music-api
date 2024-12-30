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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const typeorm_1 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const error_middleware_1 = require("../middleware/error.middleware");
const User_1 = require("../entities/User");
const tsyringe_1 = require("tsyringe");
let AuthService = class AuthService {
    constructor(userRepository, sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.SALT_ROUNDS = 10;
        this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user by email
            const user = yield this.userRepository.findOne({
                where: { email },
            });
            if (!user) {
                throw new error_middleware_1.ApiError(401, "Invalid credentials");
            }
            // Compare password
            const isPasswordValid = yield (0, bcrypt_1.compare)(password, user.passwordHash);
            if (!isPasswordValid) {
                throw new error_middleware_1.ApiError(401, "Invalid credentials");
            }
            // Generate JWT token
            const token = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email, role: user.role }, this.JWT_SECRET, {
                expiresIn: "24h",
            });
            // Store token in active sessions
            const session = this.sessionRepository.create({
                userId: user.id,
                token,
            });
            yield this.sessionRepository.save(session);
            return token;
        });
    }
    signup(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Hash password
            const hashedPassword = yield (0, bcrypt_1.hash)(password, this.SALT_ROUNDS);
            const adminUser = yield this.userRepository.find();
            // Create user
            const user = this.userRepository.create({
                email,
                passwordHash: hashedPassword,
                role: !adminUser ? User_1.UserRole.ADMIN : User_1.UserRole.VIEWER
            });
            yield this.userRepository.save(user);
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Remove all active sessions for user
            yield this.sessionRepository.delete({ userId });
        });
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    isValidPassword(password) {
        return password.length >= 8 && /\d/.test(password);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("UserRepository")),
    __param(1, (0, tsyringe_1.inject)("SessionRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AuthService);
