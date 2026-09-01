const Redis = require("ioredis");

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PSWD
});

redis.on("connect", () => {
    console.log("Server is connected with REDIS.");
});

redis.on("error", (err) => {
    console.log("Redis Error:", err);
});

module.exports = redis;