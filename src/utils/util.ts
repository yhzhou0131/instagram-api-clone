import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { z } from 'zod';
import { Redis } from 'ioredis';

export function getDirName(meta: ImportMeta) {
  const __filename = fileURLToPath(meta.url);
  const __dirname = dirname(__filename);

  return __dirname;
}

export function validateDataType<T>(data: T, schema: z.ZodType<T>): boolean {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Validation failed: \n${error.message}`);
    } else {
      console.error(`Unknown error: ${error}`);
    }
  }
  return false;
}

export async function clearCacheByKey(
  redisClient: Redis,
  key: string
): Promise<void> {
  redisClient.del(key);
}
