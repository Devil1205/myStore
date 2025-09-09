const { default: Redis } = require("ioredis");
const mongoose = require("mongoose");

const connectDb = () => {
  const URI = process.env.URI;
  mongoose
    .connect(URI)
    .then(() => {
      console.log("mongo connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

const connectRedis = () => {
  try {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
    });
    redis.on("connect", () => {
      console.log("redis connected successfully");
    });
    redis.on("error", (err) => {
      console.log(err);
    });
    return redis;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { connectDb, connectRedis };
