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
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const error_middleware_1 = require("../middleware/error.middleware");
const Session_1 = require("../entities/Session");
const User_1 = require("../entities/User");
const db_1 = require("../db");
const tsyringe_1 = require("tsyringe");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.authService.login(email, password);
                res.json({
                    status: 200,
                    data: { token },
                    message: "Login successful.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.signup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield this.authService.signup(email, password);
                res.status(201).json({
                    status: 201,
                    data: null,
                    message: "User created successfully.",
                    error: null,
                });
            }
            catch (error) {
                if (error.code === "23505") {
                    next(new error_middleware_1.ApiError(409, "Email already exists."));
                }
                else {
                    next(error);
                }
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    throw new error_middleware_1.ApiError(400, "Bad Request");
                }
                yield this.authService.logout(req.user.id);
                res.json({
                    status: 200,
                    data: null,
                    message: "User logged out successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        const userRepository = db_1.AppDataSource.getRepository(User_1.User);
        const sessionRepository = db_1.AppDataSource.getRepository(Session_1.Session);
        this.authService = new AuthService_1.AuthService(userRepository, sessionRepository);
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AuthService_1.AuthService])
], AuthController);
