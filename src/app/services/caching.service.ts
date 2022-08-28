import { Injectable } from '@angular/core';
/**
 * Provides in memory caching
 */
@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cache = new Map<string, Cache>();

  constructor() { }

  /**
   * Sets in memory cache that will expire in given time
   * @param key Key in cache store
   * @param cache Something to cache
   * @param expireTime Expire time of cache in minutes
   */
  public set(key: string, cache: any, expireTime: number) {
    this.cache.set(key, {
      cache: cache,
      expireTimestamp: Date.now() + (expireTime * 60000)
    });
    setTimeout(() => {
      this.cache.delete(key);
    }, expireTime * 60000);
  }

  /**
   * Gets in memory cache with given key
   * @param key Key in the cache store
   * @returns Cache or false if cache does not exist of is expired
   */
  public get(key: string): any | false {
    const c = this.cache.get(key);
    if (c == undefined) return false;
    return c.cache;
  }
}

interface Cache {
  cache: any,
  expireTimestamp: number
}
