/*
 * File: regis.ts
 * Path: \src\config
 * Project: kms-backend
 * Created Date: Mon Jun 2025
 * Author: ToanNguyen (Email: nttoan189@gmail.com, GitHub: ttoannguyen)
 * -----
 * Last Modified: Mon Jun 09 2025
 * Modified By: ToanNguyen
 * -----
 */
import Redis from "ioredis";
import config from "./config";

const redisUrl = config.redis;

if (!redisUrl) {
  throw new Error("REDIS_URL is not set in .env");
}

const redis = new Redis(redisUrl);

export default redis;
