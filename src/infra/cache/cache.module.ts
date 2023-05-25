import { DynamicModule, Module, Provider } from '@nestjs/common';
import { RedisCacheProvider } from './redis.provider';
import { CacheProtocol } from './cache.protocol';
import { CompressionModule } from '../compression/compression.module';

@Module({})
export class CacheModule {
  static register(data: { compress: boolean; driver: 'redis' }): DynamicModule {
    const driversProvider = {
      redis: RedisCacheProvider,
    };

    const providers: Provider[] = [
      {
        provide: CacheProtocol,
        useClass: driversProvider[data.driver] || driversProvider.redis,
      },
    ];

    return {
      module: CacheModule,
      providers: providers,
      exports: providers,
      imports: [CompressionModule.register({ compress: data.compress })],
    };
  }
}
