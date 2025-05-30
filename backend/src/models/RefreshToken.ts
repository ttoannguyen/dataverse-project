import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  token!: string;

  @Column()
  userId!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "userId" })
  user!: User;

  @Column()
  expiryDate!: Date;
}
