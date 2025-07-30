import { FastifyReply, FastifyRequest } from 'fastify';

export const authenticate =async(request: FastifyRequest,reply: FastifyReply): Promise<void> =>{
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};
