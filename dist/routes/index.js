"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const artist_routes_1 = require("./artist.routes");
const album_routes_1 = require("./album.routes");
const track_routes_1 = require("./track.routes");
const favorite_routes_1 = require("./favorite.routes");
const user_routes_1 = require("./user.routes");
const createRoutes = (controllers) => {
    const router = (0, express_1.Router)();
    router.use("/", (0, auth_routes_1.createAuthRoutes)(controllers.authController));
    router.use("/users", (0, user_routes_1.createUserRoutes)(controllers.userController));
    router.use("/artists", (0, artist_routes_1.createArtistRoutes)(controllers.artistController));
    router.use("/albums", (0, album_routes_1.createAlbumRoutes)(controllers.albumController));
    router.use("/tracks", (0, track_routes_1.createTrackRoutes)(controllers.trackController));
    router.use("/favorites", (0, favorite_routes_1.createFavoriteRoutes)(controllers.favoriteController));
    return router;
};
exports.createRoutes = createRoutes;
