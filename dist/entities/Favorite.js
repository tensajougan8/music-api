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
exports.Favorite = void 0;
const typeorm_1 = require("typeorm");
const Album_1 = require("./Album");
const Artist_1 = require("./Artist");
const Track_1 = require("./Track");
const User_1 = require("./User");
let Favorite = class Favorite {
};
exports.Favorite = Favorite;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Favorite.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["artist", "album", "track"],
    }),
    __metadata("design:type", String)
], Favorite.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], Favorite.prototype, "item_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: "CASCADE" }),
    __metadata("design:type", User_1.User)
], Favorite.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Favorite.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Artist_1.Artist, { nullable: true }),
    __metadata("design:type", Artist_1.Artist)
], Favorite.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Album_1.Album, { nullable: true }),
    __metadata("design:type", Album_1.Album)
], Favorite.prototype, "album", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Track_1.Track, { nullable: true }),
    __metadata("design:type", Track_1.Track)
], Favorite.prototype, "track", void 0);
exports.Favorite = Favorite = __decorate([
    (0, typeorm_1.Entity)()
], Favorite);
