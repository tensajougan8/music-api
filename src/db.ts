import { DataSource } from "typeorm";
import { config } from "dotenv";
import { User } from "./entities/User";
import { Favorite } from "./entities/Favorite";
import { Album } from "./entities/Album";
import { Artist } from "./entities/Artist";
import { Session } from "./entities/Session";
import { Track } from "./entities/Track";

config();

export const AppDataSource = new DataSource({
  // type: "postgres",
  // host: process.env.DB_HOST || "localhost",
  // port: Number(process.env.DB_PORT) || 5432,
  // username: process.env.DB_USER || "postgres",
  // password: process.env.DB_PASSWORD || "admin",
  // database: process.env.DB_NAME || "music",
  // entities: [User, Track, Album, Session, Favorite, Artist],
  type: "postgres",
  url: process.env.DB_URL,
  entities: [User, Track, Album, Session, Favorite, Artist], // Use direct entity references
  synchronize: true,
  logging: true,
});
