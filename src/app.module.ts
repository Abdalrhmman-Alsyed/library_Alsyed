import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/entity/feedback.entity';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
 
  url: process.env.DATABASE_URL || 'postgresql://postgres:5472@localhost:5432/feedback_db', 
  entities: [Feedback],
  synchronize: true,
  
  ssl: process.env.DATABASE_URL 
    ? { rejectUnauthorized: false } 
    : false, 
}),
    TypeOrmModule.forFeature([Feedback]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class AppModule {}
