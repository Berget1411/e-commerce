import { Redis } from "@upstash/redis";
import { createClient } from "redis";
import RedisStore from "connect-redis";
import dotenv from "dotenv";

dotenv.config();

export const initializeRedisStore = async () => {
  const redisClient = createClient({
    url: process.env.REDIS_CLIENT_URL,
  });

  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  await redisClient.connect();

  const redisStore = new RedisStore({
    client: redisClient,
    prefix: "session:",
  });

  return redisStore;
};

export const redis = new Redis({
  url: process.env.REDIS_URL,
  token: process.env.REDIS_TOKEN,
});
