import { Module } from '@nestjs/common';
import { WorldCupModule } from '../modules/world-cup.module';

@Module({
  imports: [WorldCupModule],
})
export class AppModule {}
