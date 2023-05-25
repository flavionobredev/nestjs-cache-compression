/* eslint-disable @typescript-eslint/no-namespace */
import { WorldCupResult } from '../model/world-cup-result.model';

export interface GetWorldCupResultsUseCase {
  execute(): Promise<GetWorldCupResultsUseCase.Result>;
}

export namespace GetWorldCupResultsUseCase {
  export const Token = Symbol('GetWorldCupResultsUseCase');
  export type Result = WorldCupResult[];
}
