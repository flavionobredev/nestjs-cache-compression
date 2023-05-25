import { Controller, Get, Inject } from '@nestjs/common';
import { GetWorldCupResultsUseCase } from 'src/domain/usecase/get-world-cup-results.usecase';

@Controller('api/world-cup')
export class AppController {
  constructor(
    @Inject(GetWorldCupResultsUseCase.Token)
    private readonly getWorldCupResults: GetWorldCupResultsUseCase,
  ) {}

  @Get('results')
  async getResults() {
    return await this.getWorldCupResults.execute();
  }
}
