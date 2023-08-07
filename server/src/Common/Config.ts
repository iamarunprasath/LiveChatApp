import * as dotenv from "dotenv";
dotenv.config();


export const config = {
  port: process.env.PORT ?? 5000,
  clientUrl: process.env.clientUrl ?? "",
  serverUrl: process.env.serverUrl ?? "",
  messageRateLimit: process.env.messageRateLimit ?? 10,
  redisPort: process.env.redis_port ?? 6379,
  redisHost: process.env.redis_host ?? "",
  redisUsername: process.env.redis_username ?? "",
  redisPassword: process.env.redis_password ?? "",
};
