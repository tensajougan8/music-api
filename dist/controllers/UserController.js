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
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { limit, offset, role } = req.query;
                const users = yield this.userService.findAll({
                    limit: limit ? parseInt(limit) : undefined,
                    offset: offset ? parseInt(offset) : undefined,
                    role: role,
                });
                return res.status(200).json({
                    status: 200,
                    data: users,
                    message: "Users retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.addUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const adminId = req.body.user.id;
                if (!adminId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const { email, password, role } = req.body;
                if (!email || !password || !role) {
                    throw new error_middleware_1.ApiError(400, "Missing required fields");
                }
                yield this.userService.addUser(adminId, { email, password, role });
                return res.status(201).json({
                    status: 201,
                    data: null,
                    message: "User created successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const adminId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!adminId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const userId = req.params.id;
                if (!userId) {
                    throw new error_middleware_1.ApiError(400, "User ID is required");
                }
                yield this.userService.deleteUser(adminId, userId);
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: "User deleted successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.updatePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const { old_password, new_password } = req.body;
                if (!old_password || !new_password) {
                    throw new error_middleware_1.ApiError(400, "Missing required fields");
                }
                else if (old_password === new_password) {
                    throw new error_middleware_1.ApiError(400, "New password as old password");
                }
                yield this.userService.updatePassword(userId, {
                    old_password,
                    new_password,
                });
                return res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userService.register(email, password);
                res.status(201).json(user);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                res.json({ token });
            }
            catch (error) {
                res.status(401).json({ message: error.message });
            }
        });
    }
};
exports.UserController = UserController;
exports.UserController = UserController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [UserService_1.UserService])
], UserController);
