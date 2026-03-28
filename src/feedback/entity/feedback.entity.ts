import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;
w   
  @Column()
  rating: number;

  @Column()
  message: string;

  
  @Column({ nullable: true , default:'غير معروف'})
  name?: string;

  @CreateDateColumn()
  createdAt: Date;
}