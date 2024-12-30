import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";
import { Track } from "./Track";
import { User } from "./User";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "enum",
    enum: ["artist", "album", "track"],
  })
  category!: "artist" | "album" | "track";

  @Column("uuid")
  item_id?: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user!: User;

  @CreateDateColumn()
  created_at!: Date;

  // Optional relations for easier data retrieval
  @ManyToOne(() => Artist, { nullable: true })
  artist!: Artist;

  @ManyToOne(() => Album, { nullable: true })
  album!: Album;

  @ManyToOne(() => Track, { nullable: true })
  track!: Track;
}
