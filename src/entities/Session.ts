import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId?: string;

  @Column()
  token?: string;

  @ManyToOne(() => User, (user) => user.sessions, { cascade: true })
  user?: User;
}
