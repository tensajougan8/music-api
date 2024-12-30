import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Album } from "./Album";

@Entity()
export class Artist {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name?: string;

  @Column()
  grammy?: number;

  @Column()
  hidden?: boolean;

  @Column({ nullable: true })
  biography?: string;

  @OneToMany(() => Album, (album) => album.artist, { cascade: true })
  albums?: Album[];
}
