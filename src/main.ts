import { NestFactory } from '@nestjs/core';
import { AppModule } from './main/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(process.env.PORT));
}
bootstrap();
