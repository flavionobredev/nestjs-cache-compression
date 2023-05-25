import { Module } from '@nestjs/common';
import { GetWorldCupResults } from 'src/application/usecases/get-world-cup-results';
import { GetWorldCupResultsUseCase } from 'src/domain/usecase/get-world-cup-results.usecase';
import { CacheModule } from 'src/infra/cache';
import { AppController } from 'src/presentation/controllers/app.controller';

@Module({
  imports: [CacheModule.register({ compress: true, driver: 'redis' })],
  providers: [
    { provide: GetWorldCupResultsUseCase.Token, useClass: GetWorldCupResults },
  ],
  controllers: [AppController],
})
export class WorldCupModule {}
