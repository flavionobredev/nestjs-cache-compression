import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';
import { CacheProtocol } from './cache.protocol';
import { CompressionProvider } from '../compression/compression.provider';

@Injectable()
export class RedisCacheProvider extends CacheProtocol {
  private readonly client = createClient({
    url: process.env.REDIS_URI,
  });

  constructor(private readonly compression: CompressionProvider) {
    super();
    this.client.connect();
  }

  async keys(pattern: string): Promise<string[]> {
    return await this.client.keys(pattern);
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }

  async deleteByPrefix(pattern: string): Promise<void> {
    const keys = await this.client.keys(pattern);
    await Promise.all(
      keys.map(async (key) => {
        await this.client.del(key);
      }),
    );
  }

  async get<T = any>(key: string): Promise<T> {
    const value = await this.client.get(key);
    if (!value) return null;
    return JSON.parse(this.compression.decompress(value));
  }

  async set(
    key: string,
    value: unknown,
    options?: { ttl: number },
  ): Promise<void> {
    console.log('before compression length', JSON.stringify(value).length);
    const toSave = this.compression.compress(JSON.stringify(value));
    console.log('after compression length', toSave.length);
    await this.client.set(key, toSave, {
      EX: options?.ttl,
    });
  }
}
