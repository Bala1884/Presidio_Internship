import * as userDao from '../dao/user.dao';
import bcrypt from 'bcrypt';
import { FastifyInstance, FastifyRequest } from 'fastify';

export const register = async (data: any) => {
  const existingUser = await userDao.findUserByEmail(data.email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userDao.createUser({ ...data, password: hashedPassword });
  return user;
};

export const login = async (data: any, req: FastifyRequest, fastify:FastifyInstance) => {
    //console.log("req.jwt exists?", typeof fastify.jwt); // should print "function"
    try{
      const user = await userDao.findUserByEmail(data.email);
  if (!user) throw new Error('Invalid email or password');

  const match = await bcrypt.compare(data.password, user.getDataValue('password'));
  if (!match) throw new Error('Invalid email or password');

  const token = fastify.jwt.sign({
    id: user.getDataValue('id'),
    email: user.getDataValue('email'),
  });

  return { token, user };
    }catch(error){
      console.log(error); 
    }
};

export const getAll = async () => await userDao.getAllUsers();

export const getById = async (id: number) => await userDao.findUserById(id);

export const update = async (id: number, data: any) => {
  const user = await userDao.findUserById(id);
  if (!user) throw new Error('User not found');
  return await userDao.updateUser(user, data);
};

export const remove = async (id: number) => {
  const user = await userDao.findUserById(id);
  if (!user) throw new Error('User not found');
  return await userDao.deleteUser(user);
};
