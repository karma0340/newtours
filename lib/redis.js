import Redis from "ioredis";

// Return a dummy object if Redis isn't configured so the app doesn't crash locally
const createRedisClient = () => {
    if (!process.env.REDIS_URL) {
        console.warn("⚠️ REDIS_URL not found. Caching is disabled.");
        return {
            get: async () => null,
            set: async () => null,
            del: async () => null,
        };
    }

    const redis = new Redis(process.env.REDIS_URL, {
        connectTimeout: 500, // 500ms timeout
        maxRetriesPerRequest: 1
    });
    
    redis.on('error', (err) => console.log('Redis Client Error', err));
    redis.on('connect', () => console.log('✅ Connected to Redis'));
    
    return redis;
};

// Next.js standard way to avoid exhausting connections in development
let redis;

if (process.env.NODE_ENV === "production") {
    redis = createRedisClient();
} else {
    if (!global.redis) {
        global.redis = createRedisClient();
    }
    redis = global.redis;
}

export default redis;
