import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as userService from '../services/user.service';

export const registerUser = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await userService.register(req.body);
    console.log('Register request body:', req.body);
    return reply.code(201).send(result);
  } catch (error: any) {
    return reply.code(400).send({ message: error.message });
  }
};

export const loginUser = async (req: FastifyRequest, reply: FastifyReply, fastify:FastifyInstance) => {
  try {
    const result = await userService.login(req.body, req, fastify);
    return reply.send(result);
  } catch (error: any) {
    return reply.code(401).send({ message: error.message });
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
