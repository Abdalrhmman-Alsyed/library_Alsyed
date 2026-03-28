import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/entity/feedback.entity';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '5472',
      database: 'feedback_db',
      entities: [Feedback],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([Feedback]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class AppModule {}