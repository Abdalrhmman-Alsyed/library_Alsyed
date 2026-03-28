import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback/entity/feedback.entity';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // هنا التعديل الجوهري: نستخدم الرابط من المتغيرات البيئية
      url: process.env.DATABASE_URL, 
      entities: [Feedback],
      synchronize: true, // سيقوم بإنشاء الجداول تلقائياً في قاعدة بيانات Railway
      ssl: {
        rejectUnauthorized: false, // ضروري جداً للاتصال بقواعد البيانات السحابية
      },
    }),
    TypeOrmModule.forFeature([Feedback]),
  ],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class AppModule {}