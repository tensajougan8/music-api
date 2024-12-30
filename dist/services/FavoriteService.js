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
exports.FavoriteService = void 0;
const typeorm_1 = require("typeorm");
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let FavoriteService = class FavoriteService {
    constructor(favoriteRepository, albumRepository, artistRepository, trackRepository, userRepository) {
        this.favoriteRepository = favoriteRepository;
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
        this.trackRepository = trackRepository;
        this.userRepository = userRepository;
    }
    findAll(userId, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, limit = 5, offset = 0 } = query;
            if (!["artist", "album", "track"].includes(category)) {
                throw new error_middleware_1.ApiError(400, "Invalid category");
            }
            return this.favoriteRepository.find({
                where: {
                    user: { id: userId },
                    category: category,
                },
                select: {
                    id: true,
                    category: true,
                    item_id: true,
                    created_at: true,
                    user: { id: true }
                },
                take: limit,
                skip: offset,
                relations: ["artist", "album", "track", "user"],
                order: { created_at: "DESC" },
            });
        });
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { category, item_id } = data;
            // Verify user exists
            const user = yield this.userRepository.findOne({
                where: { id: userId },
            });
            if (!user) {
                throw new error_middleware_1.ApiError(404, `User with ID ${userId} not found`);
            }
            // Check if favorite already exists
            const existingFavorite = yield this.favoriteRepository.findOne({
                where: {
                    user: { id: userId },
                    category,
                    item_id,
                },
            });
            if (existingFavorite) {
                throw new error_middleware_1.ApiError(400, "Item already in favorites");
            }
            // Verify item exists based on category
            yield this.verifyItemExists(category, item_id);
            // Create favorite
            const favorite = this.favoriteRepository.create({
                user,
                category,
                item_id,
                [category]: { id: item_id }, // Set the appropriate relation
            });
            return this.favoriteRepository.save(favorite);
        });
    }
    verifyItemExists(category, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            let item;
            switch (category) {
                case "artist":
                    item = yield this.artistRepository.findOne({ where: { id: itemId } });
                    break;
                case "album":
                    item = yield this.albumRepository.findOne({ where: { id: itemId } });
                    break;
                case "track":
                    item = yield this.trackRepository.findOne({ where: { id: itemId } });
                    break;
            }
            if (!item) {
                throw new error_middleware_1.ApiError(404, `${category} with ID ${itemId} not found`);
            }
        });
    }
    delete(userId, favoriteId) {
        return __awaiter(this, void 0, void 0, function* () {
            const favorite = yield this.favoriteRepository.findOne({
                where: { id: favoriteId, user: { id: userId } },
                relations: ["user"],
            });
            if (!favorite) {
                throw new error_middleware_1.ApiError(404, "Favorite not found");
            }
            yield this.favoriteRepository.remove(favorite);
        });
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("FavoriteRepository")),
    __param(1, (0, tsyringe_1.inject)("AlbumRepository")),
    __param(2, (0, tsyringe_1.inject)("ArtistRepository")),
    __param(3, (0, tsyringe_1.inject)("TrackRepository")),
    __param(4, (0, tsyringe_1.inject)("UserRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], FavoriteService);
