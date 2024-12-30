import { Repository, getRepository } from "typeorm";
import { Album } from "../entities/Album";
import { ApiError } from "../middleware/error.middleware";
import { inject, injectable } from "tsyringe";
import { Artist } from "../entities/Artist";

@injectable()
export class AlbumService {
  constructor(
    @inject("AlbumRepository") private albumRepository: Repository<Album>,
    @inject("ArtistRepository") private artistRepository: Repository<Artist>
  ) {}

  async findAll(query: {
    limit?: number;
    offset?: number;
    artist_id?: string;
    hidden?: boolean;
  }) {
    const { limit = 5, offset = 0, artist_id, hidden } = query;

    const where: any = {};
    if (artist_id) where.artist_id = artist_id;
    if (hidden !== undefined) where.hidden = hidden;

    return this.albumRepository.find({
      where,
      take: limit,
      skip: offset,
      relations: ["artist"],
      order: { year: "DESC" },
    });
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ["artist"],
    });
    if (!album) throw new ApiError(404, "Album not found");
    return album;
  }

  async create(data: Partial<Album>) {
    const { id:artist_id, ...albumData } = data;
   const artist = await this.artistRepository.findOne({
     where: { id: artist_id },
   });

    if (!artist) {
      throw new ApiError(404, "Artist not found");
    }
    const album = this.albumRepository.create({
      ...albumData,
      artist,
    });

    return this.albumRepository.save(album);
  }

  async update(id: string, data: Partial<Album>) {
    const album = await this.findOne(id);
    Object.assign(album, data);
    await this.albumRepository.save(album);
  }

  async delete(id: string) {
    const album = await this.findOne(id);
    await this.albumRepository.remove(album);
    return album;
  }
}
