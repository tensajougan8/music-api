import { Repository } from "typeorm";
import { Track } from "../entities/Track";
import { ApiError } from "../middleware/error.middleware";
import { inject, injectable } from "tsyringe";
import { Album } from "../entities/Album";
import { Artist } from "../entities/Artist";

type TrackCreateInput = Partial<Track> & {
      artist_id: string;
      album_id: string;
    };
@injectable()
export class TrackService {
  constructor(
    @inject("TrackRepository") private trackRepository: Repository<Track>,
    @inject("AlbumRepository") private albumRepository: Repository<Album>,
    @inject("ArtistRepository") private artistRepository: Repository<Artist>
  ) {}

  async findAll(query: {
    limit?: number;
    offset?: number;
    artist_id?: string;
    album_id?: string;
    hidden?: boolean;
  }) {
    const { limit = 5, offset = 0, artist_id, album_id, hidden } = query;

    const where: any = {};
    if (artist_id) where.artist_id = artist_id;
    if (album_id) where.album_id = album_id;
    if (hidden !== undefined) where.hidden = hidden;

    return this.trackRepository.find({
      where,
      take: limit,
      skip: offset,
      relations: ["artist", "album"],
      order: { name: "ASC" },
    });
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: ["artist", "album"],
    });
    if (!track) throw new ApiError(404, "Track not found");
    return track;
  }

  async create(data: TrackCreateInput) {
    const { artist_id, album_id, ...trackData } = data;
    const artist = await this.artistRepository.findOne({
      where: { id: artist_id },
    });
    if (!artist) {
      throw new ApiError(404,"Artist not found");
    }

    const album = await this.albumRepository.findOne({
      where: { id: album_id },
    });
    if (!album) {
      throw new ApiError(404,"Album not found");
    }

    const track = this.trackRepository.create({
      ...trackData,
      artist,
      album,
    });
    return this.trackRepository.save(track);
  }

  async update(id: string, data: Partial<Track>) {
    const track = await this.findOne(id);
    Object.assign(track, data);
    await this.trackRepository.save(track);
  }

  async delete(id: string) {
    const track = await this.findOne(id);
    await this.trackRepository.remove(track);
    return track;
  }
}
