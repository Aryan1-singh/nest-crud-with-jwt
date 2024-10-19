// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string; // Ensure this matches the UserDto

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string; // This should also be stored in the database
}
