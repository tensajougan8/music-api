import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Artist } from "./Artist";
import { Album } from "./Album";
import { Track } from "./Track";
import { Session } from "./Session";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

@Entity("user")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.VIEWER,
  })
  role?: UserRole;

  @ManyToMany(() => Artist)
  @JoinTable()
  favoriteArtists?: Artist[];

  @ManyToMany(() => Album)
  @JoinTable()
  favoriteAlbums?: Album[];

  @ManyToMany(() => Track)
  @JoinTable()
  favoriteTracks?: Track[];

  @OneToMany(() => Session, (session) => session.user)
  sessions?: Session[];
}
