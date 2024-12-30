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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackService = void 0;
const typeorm_1 = require("typeorm");
const error_middleware_1 = require("../middleware/error.middleware");
const tsyringe_1 = require("tsyringe");
let TrackService = class TrackService {
    constructor(trackRepository, albumRepository, artistRepository) {
        this.trackRepository = trackRepository;
        this.albumRepository = albumRepository;
        this.artistRepository = artistRepository;
    }
    findAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit = 5, offset = 0, artist_id, album_id, hidden } = query;
            const where = {};
            if (artist_id)
                where.artist_id = artist_id;
            if (album_id)
                where.album_id = album_id;
            if (hidden !== undefined)
                where.hidden = hidden;
            return this.trackRepository.find({
                where,
                take: limit,
                skip: offset,
                relations: ["artist", "album"],
                order: { name: "ASC" },
            });
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.trackRepository.findOne({
                where: { id },
                relations: ["artist", "album"],
            });
            if (!track)
                throw new error_middleware_1.ApiError(404, "Track not found");
            return track;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { artist_id, album_id } = data, trackData = __rest(data, ["artist_id", "album_id"]);
            const artist = yield this.artistRepository.findOne({
                where: { id: artist_id },
            });
            if (!artist) {
                throw new error_middleware_1.ApiError(404, "Artist not found");
            }
            const album = yield this.albumRepository.findOne({
                where: { id: album_id },
            });
            if (!album) {
                throw new error_middleware_1.ApiError(404, "Album not found");
            }
            const track = this.trackRepository.create(Object.assign(Object.assign({}, trackData), { artist,
                album }));
            return this.trackRepository.save(track);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.findOne(id);
            Object.assign(track, data);
            yield this.trackRepository.save(track);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const track = yield this.findOne(id);
            yield this.trackRepository.remove(track);
            return track;
        });
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("TrackRepository")),
    __param(1, (0, tsyringe_1.inject)("AlbumRepository")),
    __param(2, (0, tsyringe_1.inject)("ArtistRepository")),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], TrackService);