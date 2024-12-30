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
exports.FavoriteController = void 0;
const FavoriteService_1 = require("../services/FavoriteService");
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let FavoriteController = class FavoriteController {
    constructor(favoriteService) {
        this.favoriteService = favoriteService;
        /**
         * GET /favorites/:category
         * Retrieve user's favorites by category
         */
        this.getFavorites = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const category = req.params.category;
                const { limit, offset } = req.query;
                if (!["artist", "album", "track"].includes(category)) {
                    throw new error_middleware_1.ApiError(400, "Invalid category. Must be 'artist', 'album', or 'track'");
                }
                const favorites = yield this.favoriteService.findAll(userId, {
                    category,
                    limit: limit ? parseInt(limit) : undefined,
                    offset: offset ? parseInt(offset) : undefined,
                });
                return res.status(200).json({
                    status: 200,
                    data: favorites,
                    message: "Favorites retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * POST /favorites/add-favorite
         * Add a new favorite
         */
        this.addFavorite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const { category, item_id } = req.body;
                if (!category || !item_id) {
                    throw new error_middleware_1.ApiError(400, "Category and item_id are required");
                }
                if (!["artist", "album", "track"].includes(category)) {
                    throw new error_middleware_1.ApiError(400, "Invalid category. Must be 'artist', 'album', or 'track'");
                }
                yield this.favoriteService.create(userId, {
                    category,
                    item_id,
                });
                return res.status(201).json({
                    status: 201,
                    data: null,
                    message: "Favorite added successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        /**
         * DELETE /favorites/remove-favorite/:id
         * Remove a favorite
         */
        this.removeFavorite = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.body.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    throw new error_middleware_1.ApiError(401, "Unauthorized Access");
                }
                const favoriteId = req.params.id;
                if (!favoriteId) {
                    throw new error_middleware_1.ApiError(400, "Favorite ID is required");
                }
                yield this.favoriteService.delete(userId, favoriteId);
                return res.status(200).json({
                    status: 200,
                    data: null,
                    message: "Favorite removed successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.FavoriteController = FavoriteController;
exports.FavoriteController = FavoriteController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [FavoriteService_1.FavoriteService])
], FavoriteController);
