import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Artist } from "./Artist";
import { Track } from "./Track";

@Entity()
export class Album {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name?: string;

  @Column()
  year?: number;

  @ManyToOne(() => Artist, (artist) => artist.albums)
  artist?: Artist;

  @OneToMany(() => Track, (track) => track.album)
  tracks?: Track[];

  @Column()
  hidden?: boolean;
}
