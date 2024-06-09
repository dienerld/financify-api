import { Redis } from 'ioredis';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeysRedis } from './constants';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis;
  constructor(private config: ConfigService) {}
  onModuleDestroy() {
    this.client.disconnect();
  }

  onModuleInit() {
    const url = this.config.get('REDIS_URL');
    if (!url) {
      throw new Error('Missing url redis');
    }
    this.client = new Redis(url);
  }

  async get<T>(key: KeysRedis): Promise<T | null> {
    const cached = await this.client.get(key);
    if (!cached) return null;
    return JSON.parse(cached);
  }

  async set(
    key: KeysRedis,
    value: string | Record<string, unknown> | unknown[],
  ) {
    return this.client.set(key, JSON.stringify(value));
  }

  async keys(pattern: string) {
    return this.client.keys(pattern);
  }

  async getByMultiKeys<T>(keys: string[]): Promise<T[] | null> {
    const cached = (await this.client.mget(keys)).filter(
      (c) => !!c,
    ) as string[];
    if (!cached || cached.length === 0) return null;
    return cached.map((item) => JSON.parse(item));
  }

  async del(key: string) {
    return this.client.del(key);
  }
}
