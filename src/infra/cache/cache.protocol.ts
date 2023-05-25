import { CacheGateway } from 'src/domain/gateway/cache.gateway';

export abstract class CacheProtocol implements CacheGateway {
  abstract get<T = any>(key: string): Promise<T>;
  abstract set(
    key: string,
    value: unknown,
    options?: { ttl: number },
  ): Promise<void>;
  abstract delete(key: string): Promise<void>;
  abstract deleteByPrefix(pattern: string): Promise<void>;
  abstract keys(pattern: string): Promise<string[]>;
}
