import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRouter } from './routes/user.route';
import redisPlugin from './plugins/redis';

import dotenv from 'dotenv';
import db from './models/index';
import fastify_jwt from "@fastify/jwt";
import { postRouter } from './routes/post.route';
import { commentRouter } from './routes/comment.route';
dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(fastify_jwt, {
  secret: process.env.JWT_SECRET as string,
});

fastify.register(redisPlugin);
fastify.register(userRouter, { prefix: '/api/users' });
fastify.register(postRouter,{prefix:'/api/posts'});
fastify.register(commentRouter,{prefix:'/api/comments'});

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
