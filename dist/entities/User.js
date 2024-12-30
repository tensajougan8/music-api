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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const Artist_1 = require("./Artist");
const Album_1 = require("./Album");
const Track_1 = require("./Track");
const Session_1 = require("./Session");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["EDITOR"] = "editor";
    UserRole["VIEWER"] = "viewer";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: UserRole,
        default: UserRole.VIEWER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Artist_1.Artist),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "favoriteArtists", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Album_1.Album),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "favoriteAlbums", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Track_1.Track),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "favoriteTracks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Session_1.Session, (session) => session.user),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("user")
], User);
