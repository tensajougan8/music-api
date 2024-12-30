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
exports.ArtistService = void 0;
const typeorm_1 = require("typeorm");
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let ArtistService = class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 5, offset = 0, grammy, hidden } = query;
            const where = {};
            if (grammy !== undefined)
                where.grammy = grammy;
            if (hidden !== undefined)
                where.hidden = hidden;
            return this.artistRepository.find({
                where,
                take: limit,
                skip: offset,
                order: { name: "ASC" },
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artist = yield this.artistRepository.findOne({
                where: { id },
            });
            if (!artist)
                throw new error_middleware_1.ApiError(404, "Artist not found");
            return artist;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const artist = this.artistRepository.create(data);
            return this.artistRepository.save(artist);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const artist = yield this.findOne(id);
            Object.assign(artist, data);
            yield this.artistRepository.save(artist);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const artist = yield this.findOne(id);
            yield this.artistRepository.remove(artist);
            return artist;
        });
    }
};
exports.ArtistService = ArtistService;
exports.ArtistService = ArtistService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("ArtistRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ArtistService);
