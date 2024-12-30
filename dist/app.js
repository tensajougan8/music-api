"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const auth_routes_1 = require("./routes/auth.routes");
const error_middleware_1 = require("./middleware/error.middleware");
const artist_routes_1 = require("./routes/artist.routes");
const album_routes_1 = require("./routes/album.routes");
const track_routes_1 = require("./routes/track.routes");
const user_routes_1 = require("./routes/user.routes");
const favorite_routes_1 = require("./routes/favorite.routes");
const createApp = (authController, artistController, albumController, trackController, favoriteController, userController
// Add other controllers here
) => {
    const app = (0, express_1.default)();
    // Middleware
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    // Routes
    app.use("/api/v1/auth", (0, auth_routes_1.createAuthRoutes)(authController));
    app.use("/api/v1/artists", (0, artist_routes_1.createArtistRoutes)(artistController));
    app.use("/api/v1/albums", (0, album_routes_1.createAlbumRoutes)(albumController));
    app.use("/api/v1/tracks", (0, track_routes_1.createTrackRoutes)(trackController));
    app.use("/api/v1/favorites", (0, favorite_routes_1.createFavoriteRoutes)(favoriteController));
    app.use("/api/v1/users", (0, user_routes_1.createUserRoutes)(userController));
    // Add other routes here
    // Error handling
    app.use(error_middleware_1.errorHandler);
    return app;
};
exports.createApp = createApp;
