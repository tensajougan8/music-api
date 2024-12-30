import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Album } from "./Album";
import { Artist } from "./Artist";

@Entity()
export class Track {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @Column()
  duration!: number;

  @Column({ default: false })
  hidden!: boolean;

  @ManyToOne(() => Artist, { onDelete: "CASCADE" })
  artist!: Artist;

  @ManyToOne(() => Album, { onDelete: "CASCADE" })
  album!: Album;

}
