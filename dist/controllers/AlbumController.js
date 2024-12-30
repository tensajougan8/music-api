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
exports.AlbumController = void 0;
const AlbumService_1 = require("../services/AlbumService");
const tsyringe_1 = require("tsyringe");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const albums = yield this.albumService.findAll(req.query);
                const formattedAlbums = albums.map((album) => {
                    var _a;
                    return ({
                        album_id: album.id,
                        artist_name: (_a = album.artist) === null || _a === void 0 ? void 0 : _a.name,
                        name: album.name,
                        year: album.year,
                        hidden: album.hidden,
                    });
                });
                res.json({
                    status: 200,
                    data: formattedAlbums,
                    message: "Albums retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const album = yield this.albumService.findOne(req.params.id);
                const formattedAlbum = {
                    album_id: album.id,
                    artist_name: (_a = album.artist) === null || _a === void 0 ? void 0 : _a.name,
                    name: album.name,
                    year: album.year,
                    hidden: album.hidden,
                };
                res.json({
                    status: 200,
                    data: formattedAlbum,
                    message: "Album retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.albumService.create(req.body);
                res.status(201).json({
                    status: 201,
                    data: null,
                    message: "Album created successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.albumService.update(req.params.id, req.body);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const album = yield this.albumService.delete(req.params.id);
                res.json({
                    status: 200,
                    data: null,
                    message: `Album:${album.name} deleted successfully.`,
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.AlbumController = AlbumController;
exports.AlbumController = AlbumController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [AlbumService_1.AlbumService])
], AlbumController);
