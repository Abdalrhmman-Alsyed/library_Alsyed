import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/entity/feedback.entity';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';

@Module({
  imports: [
TypeOrmModule.forRoot({
  type: 'postgres',
 
  url: "postgresql://postgres:stJQYlZjqyXfTcEIGBRHmvEuVTkPpuKR@postgres.railway.internal:5432/railway",
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
