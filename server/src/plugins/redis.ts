import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import { createClient } from 'redis';

// Create the Redis client
const redis = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: +(process.env.REDIS_PORT || 6379),
  },
});

redis.on('error', (err) => console.error('Redis Client Error', err));

// Ensure Redis connects before proceeding

export default fp(async (fastify: FastifyInstance) => {
  await redis.connect();
  fastify.decorate('redis', redis);
});

declare module 'fastify' {
  interface FastifyInstance {
    redis: typeof redis;
  }
}

