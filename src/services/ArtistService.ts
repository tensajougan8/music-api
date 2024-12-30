import { Repository } from "typeorm";
import { Artist } from "../entities/Artist";
import { ApiError } from "../middleware/error.middleware";
import { inject, injectable } from "tsyringe";

@injectable()
export class ArtistService {
  constructor(@inject("ArtistRepository") private artistRepository: Repository<Artist>) {}

  async findAll(query: {
    limit?: number;
    offset?: number;
    grammy?: number;
    hidden?: boolean;
  }) {
    const { limit = 5, offset = 0, grammy, hidden } = query;

    const where: any = {};
    if (grammy !== undefined) where.grammy = grammy;
    if (hidden !== undefined) where.hidden = hidden;

    return this.artistRepository.find({
      where,
      take: limit,
      skip: offset,
      order: { name: "ASC" },
    });
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOne({
      where: { id },
    });
    if (!artist) throw new ApiError(404, "Artist not found");
    return artist;
  }

  async create(data: Partial<Artist>) {
    const artist = this.artistRepository.create(data);
    return this.artistRepository.save(artist);
  }

  async update(id: string, data: Partial<Artist>) {
    const artist = await this.findOne(id);
    Object.assign(artist, data);
    await this.artistRepository.save(artist);
  }

  async delete(id: string) {
    const artist = await this.findOne(id);
    await this.artistRepository.remove(artist);
    return artist;
  }
}
