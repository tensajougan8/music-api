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
exports.TrackController = void 0;
const TrackService_1 = require("../services/TrackService");
const tsyringe_1 = require("tsyringe");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tracks = yield this.trackService.findAll(req.query);
                const formattedTracks = tracks.map((track) => ({
                    track_id: track.id,
                    artist_name: track.artist.name,
                    album_name: track.album.name,
                    name: track.name,
                    duration: track.duration,
                    hidden: track.hidden,
                }));
                res.json({
                    status: 200,
                    data: formattedTracks,
                    message: "Tracks retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getOne = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const track = yield this.trackService.findOne(req.params.id);
                const formattedTrack = {
                    track_id: track.id,
                    artist_name: track.artist.name,
                    album_name: track.album.name,
                    name: track.name,
                    duration: track.duration,
                    hidden: track.hidden,
                };
                res.json({
                    status: 200,
                    data: formattedTrack,
                    message: "Track retrieved successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.trackService.create(req.body);
                res.status(201).json({
                    status: 201,
                    data: null,
                    message: "Track created successfully.",
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.trackService.update(req.params.id, req.body);
                res.status(204).send();
            }
            catch (error) {
                next(error);
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const track = yield this.trackService.delete(req.params.id);
                res.json({
                    status: 200,
                    data: null,
                    message: `Track:${track.name} deleted successfully.`,
                    error: null,
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
};
exports.TrackController = TrackController;
exports.TrackController = TrackController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [TrackService_1.TrackService])
], TrackController);
