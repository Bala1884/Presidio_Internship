import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRouter } from './routes/user.route';
import redisPlugin from './plugins/redis';

import dotenv from 'dotenv';
import db from './models/index';
import fastify_jwt from "@fastify/jwt";
dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(fastify_jwt, {
  secret: process.env.JWT_SECRET as string,
});

fastify.decorate(
  'authenticate',
  async function (request:FastifyRequest, reply:FastifyReply) {
    try {
      await request.jwtVerify(); // Verifies JWT from Authorization header
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' });
    }
  }
);
fastify.register(redisPlugin);
fastify.register(userRouter, { prefix: '/api/users' });

fastify.get('/', async (request, reply) => {
  return reply.send("hello world");
});

const start = async () => {
  try {
    await fastify.listen({ port: 5000 });
    // await db.sequelize.sync({ alter: true });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
