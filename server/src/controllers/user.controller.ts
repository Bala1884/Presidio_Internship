import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    console.log('Register request body:', req.body);
    const result = await userService.register(req.body);
    return reply.code(201).send({success:true,result});
  } catch (error: any) {
    return reply.code(400).send({ message: error.message });
  }
};

export const loginUser = async (req: FastifyRequest, reply: FastifyReply, fastify:FastifyInstance) => {
  try {
    const result = await userService.login(req.body, req, fastify);
    return reply.send({success:true,result});
  } catch (error: any) {
    return reply.code(401).send({ message: error.message });
  }
};

export const refreshAccessToken = async (
  req: FastifyRequest<{ Body: { refreshToken: string; userId: string } }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) => {
  try {
    const { refreshToken, userId } = req.body;

    const isValid = await userService.verifyRefreshToken(fastify, refreshToken, userId);
    if (!isValid) return reply.code(403).send({ message: 'Invalid refresh token' });

    const decoded = fastify.jwt.decode(refreshToken) as { id: string; email: string };
    const newAccessToken = fastify.jwt.sign({ id: Number(decoded.id), email: decoded.email }, { expiresIn: '15m' });

    return reply.send({ accessToken: newAccessToken });
  } catch (error: any) {
    return reply.code(500).send({ message: error.message });
  }
};


export const logout = async (
  req: FastifyRequest<{ Body: { refreshToken: string } }>,
  reply: FastifyReply,
  fastify: FastifyInstance
) => {
  try {
    const { refreshToken } = req.body;
    const decoded = fastify.jwt.decode(refreshToken) as { id: number };

    if (!decoded?.id) return reply.code(400).send({ message: 'Invalid token' });

    await userService.logoutUser(fastify, decoded.id);

    return reply.send({ message: 'Logged out successfully' });
  } catch (err: any) {
    return reply.code(500).send({ message: err.message });
  }
};


export const getAllUsers = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const users = await userService.getAll();
    return reply.send(users);
  } catch (error: any) {
    return reply.code(500).send({ message: error.message });
  }
};

export const getUserById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const user = await userService.getById(Number(req.params.id));
    return reply.send(user);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const updateUser = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const user = await userService.update(Number(req.params.id), req.body);
    return reply.send(user);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const deleteUser = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    await userService.remove(Number(req.params.id));
    return reply.send({ message: 'User deleted' });
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};
