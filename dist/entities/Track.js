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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album");
const Artist_1 = require("./Artist");
let Track = class Track {
};
exports.Track = Track;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Track.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Track.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Track.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Track.prototype, "hidden", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist_1.Artist, { onDelete: "CASCADE" }),
    __metadata("design:type", Artist_1.Artist)
], Track.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Album_1.Album, { onDelete: "CASCADE" }),
    __metadata("design:type", Album_1.Album)
], Track.prototype, "album", void 0);
exports.Track = Track = __decorate([
    (0, typeorm_1.Entity)()
], Track);
