import { DynamicModule, Module } from '@nestjs/common';
import { CompressionProvider } from './compression.provider';

@Module({})
export class CompressionModule {
  static register(data: { compress: boolean }): DynamicModule {
    const providers = [
      {
        provide: CompressionProvider,
        useValue: new CompressionProvider({ active: data.compress }),
      },
    ];
    return {
      module: CompressionModule,
      providers: providers,
      exports: providers,
    };
  }
}
