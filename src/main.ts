import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 1. تفعيل الـ CORS (ضروري جداً ليعمل على الجوال)
  app.enableCors();

  // 2. إعدادات التحقق من البيانات
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // 3. تحديد مجلد الملفات الثابتة (الفرونت آند)
  app.useStaticAssets(join(process.cwd(), 'public'));

  // 4. إعداد المنفذ (Port) - لاحظ التعديل هنا
  const port = process.env.PORT || 3000;
  
  // استخدم await مباشرة بدون callback لضمان الاستقرار في Railway
  await app.listen(port, "0.0.0.0");
  
  // تأكد من طباعة المتغير port نفسه وليس الرقم 3000 يدوياً
  console.log(`السيرفر يعمل الآن على منفذ: ${port}`);
}
bootstrap();