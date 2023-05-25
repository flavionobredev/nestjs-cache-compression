/**
 * The cache interface.
 */
export interface CacheGateway {
  /**
   * Gets a value from the cache.
   * @param key The key to get.
   * @example
   * // Gets the user with id 1.
   * const user = await cache.get<User>('user:1');
   */
  get<T = any>(key: string): Promise<T>;

  /**
   * Sets a value in the cache.
   * @param key The key to set.
   * @param value The value to set.
   * @param options The options to set.
   * @example
   * // Sets the user with id 1.
   * await cache.set('user:1', user);
   * // Sets the user with id 1 with a ttl of 10 seconds.
   * await cache.set('user:1', user, { ttl: 10 });
   */
  set(key: string, value: unknown, options?: { ttl: number }): Promise<void>;

  /**
   * Invalidates a key.
   * @param key The key to invalidate.
   * @example
   * // Invalidates the user with id 1.
   * await cache.invalidate('user:1');
   */
  delete(key: string): Promise<void>;

  /**
   * Invalidates all keys that match the given pattern.
   * @param pattern The pattern to match.
   * @example
   * // Invalidates all keys that start with "user".
   * await cache.invalidatePrefix('user:*');
   */
  deleteByPrefix(pattern: string): Promise<void>;

  /**
   * Gets all keys that match the given pattern.
   * @param pattern The pattern to match.
   * @example
   * await cache.keys('user:*');
   * // ['user:1', 'user:2', 'user:3']
   */
  keys(pattern: string): Promise<string[]>;
}
