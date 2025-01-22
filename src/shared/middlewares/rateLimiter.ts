import { RateLimiterRedis } from "rate-limiter-flexible";
import { createClient} from "redis";
import { Request, Response, NextFunction } from 'express';
import AppError from "@shared/errors/AppError";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASS || undefined,
});

redisClient.connect().catch(console.error);

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 5,
});

export default async function rateLimiter(request:Request, reponse: Response, next: NextFunction): Promise<void> {
  try {
    await limiter.consume(request.ip as string);

    return next();

  } catch (err) {
    throw new AppError('Too many requests.', 429);
  }
}