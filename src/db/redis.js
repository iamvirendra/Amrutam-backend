import {createClient} from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("Redis Error:", err));

await redisClient.connect();

export default redisClient;
