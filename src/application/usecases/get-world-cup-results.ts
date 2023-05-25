import { Injectable } from '@nestjs/common';
import { GetWorldCupResultsUseCase } from 'src/domain/usecase/get-world-cup-results.usecase';
import { CacheProtocol } from 'src/infra/cache/cache.protocol';

@Injectable()
export class GetWorldCupResults implements GetWorldCupResultsUseCase {
  private readonly worldCupResults: GetWorldCupResultsUseCase.Result =
    new Array(100).fill({
      country: 'Brazil',
      year: 2002,
      champion: 'Brazil',
      coach: 'Luiz Felipe Scolari',
      goals: 30,
    });

  private readonly KEY = 'world-cup:results';

  constructor(private readonly cacheGateway: CacheProtocol) {}

  async execute(): Promise<GetWorldCupResultsUseCase.Result> {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const resultsFromCache =
      await this.cacheGateway.get<GetWorldCupResultsUseCase.Result>(this.KEY);

    if (resultsFromCache) return resultsFromCache;

    await sleep(1000); // Simulate a slow request

    await this.cacheGateway.set(this.KEY, this.worldCupResults, { ttl: 60 });

    return this.worldCupResults;
  }
}
