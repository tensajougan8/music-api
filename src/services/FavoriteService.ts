import { Repository } from "typeorm";
import { Favorite } from "../entities/Favorite";
import { ApiError } from "../middleware/error.middleware";
import { inject, injectable } from "tsyringe";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";
import { Track } from "../entities/Track";
import { User } from "../entities/User";

type FavoriteCategory = "artist" | "album" | "track";
type CreateFavoriteDto = {
  category: FavoriteCategory;
  item_id: string;
};
@injectable()
export class FavoriteService {
  constructor(
    @inject("FavoriteRepository")
    private favoriteRepository: Repository<Favorite>,
    @inject("AlbumRepository") private albumRepository: Repository<Album>,
    @inject("ArtistRepository") private artistRepository: Repository<Artist>,
    @inject("TrackRepository") private trackRepository: Repository<Track>,
    @inject("UserRepository") private readonly userRepository: Repository<User>
  ) {}

  async findAll(
    userId: string,
    query: { category: string; limit?: number; offset?: number }
  ) {
    const { category, limit = 5, offset = 0 } = query;

    if (!["artist", "album", "track"].includes(category)) {
      throw new ApiError(400, "Invalid category");
    }

    return this.favoriteRepository.find({
      where: {
        user: { id: userId },
        category: category as "artist" | "album" | "track",
      },
      select: {
        id: true,
        category: true,
        item_id: true,
        created_at: true,
        user: {id:true}
      },
      take: limit,
      skip: offset,
      relations: ["artist", "album", "track", "user"],
      order: { created_at: "DESC" },
    });
  }

  async create(userId: string, data: CreateFavoriteDto): Promise<Favorite> {
    const { category, item_id } = data;

    // Verify user exists
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new ApiError(404, `User with ID ${userId} not found`);
    }

    // Check if favorite already exists
    const existingFavorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        category,
        item_id,
      },
    });

    if (existingFavorite) {
      throw new ApiError(400, "Item already in favorites");
    }

    // Verify item exists based on category
    await this.verifyItemExists(category, item_id);

    // Create favorite
    const favorite = this.favoriteRepository.create({
      user,
      category,
      item_id,
      [category]: { id: item_id }, // Set the appropriate relation
    });

    return this.favoriteRepository.save(favorite);
  }

  private async verifyItemExists(
    category: FavoriteCategory,
    itemId: string
  ): Promise<void> {
    let item;
    switch (category) {
      case "artist":
        item = await this.artistRepository.findOne({ where: { id: itemId } });
        break;
      case "album":
        item = await this.albumRepository.findOne({ where: { id: itemId } });
        break;
      case "track":
        item = await this.trackRepository.findOne({ where: { id: itemId } });
        break;
    }

    if (!item) {
      throw new ApiError(404, `${category} with ID ${itemId} not found`);
    }
  }
  async delete(userId: string, favoriteId: string) {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: favoriteId, user: { id: userId } },
      relations: ["user"],
    });

    if (!favorite) {
      throw new ApiError(404, "Favorite not found");
    }

    await this.favoriteRepository.remove(favorite);
  }
}
