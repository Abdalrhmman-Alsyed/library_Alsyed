import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // تفعيل CORS بشكل كامل وصحيح
  app.enableCors({
    origin: true, // يسمح لأي موقع (بما في ذلك الجوالات) بالاتصال
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  app.useStaticAssets(join(process.cwd(), 'public'));

  const port = process.env.PORT || 8080; // تأكد أنه 8080 كما في الـ Logs
  await app.listen(port, "0.0.0.0");
  
  console.log(`السيرفر يعمل بنجاح على المنفذ: ${port}`);
}
bootstrap();