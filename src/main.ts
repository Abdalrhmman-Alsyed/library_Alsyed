import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // <--- مهم

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // <--- هنا

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  
  app.useStaticAssets(join(__dirname, '..', 'public'));

app.enableCors();
const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
}
bootstrap();