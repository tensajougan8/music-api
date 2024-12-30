"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const User_1 = require("./entities/User");
const Favorite_1 = require("./entities/Favorite");
const Album_1 = require("./entities/Album");
const Artist_1 = require("./entities/Artist");
const Session_1 = require("./entities/Session");
const Track_1 = require("./entities/Track");
(0, dotenv_1.config)();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "music",
    entities: [User_1.User, Track_1.Track, Album_1.Album, Session_1.Session, Favorite_1.Favorite, Artist_1.Artist],
    synchronize: true,
});
