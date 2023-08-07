import redis from "ioredis";
import { config } from "./Config";

const getRedisConnection = (
  port: number | string,
  host: string,
  username: string,
  password: string
) => {
  try {
    const client = new redis({
      port: Number(port || 6379),
      host: host,
      username: username,
      password: password,
    });
    return client;
  } catch (e: any) {
    console.error("Error in Redis Connection", e.message);
  }
};

export const client = getRedisConnection(
  config.redisPort,
  config.redisHost,
  config.redisUsername,
  config.redisPassword
);
