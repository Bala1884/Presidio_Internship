import * as userDao from '../dao/user.dao';
import bcrypt from 'bcrypt';
import fastify, { FastifyInstance, FastifyRequest } from 'fastify';

export const register = async (data: any) => {
  const existingUser = await userDao.findUserByEmail(data.email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = await userDao.createUser({ ...data, password: hashedPassword });
  return user;
};

export const storeRefreshToken=async(fastify:FastifyInstance, token:string, userId:string, ttlSeconds=7*24*60*60)=>{
  if (!token || !userId) {
    console.warn("Invalid args to storeRefreshToken:", { token, userId });
    return;
  }
  console.log(token+" "+userId);
  await fastify.redis.set(`refresh:${userId}`, token, { EX: ttlSeconds });
  const saved=await fastify.redis.get(`refresh:${Number(userId)}`);
  console.log(saved);
  
}

export const verifyRefreshToken=async(fastify:FastifyInstance, token:string, userId:string)=>{
  const saved = await fastify.redis.get(`refresh:${Number(userId)}`);
  // console.log("Expected token:", saved);
  // console.log("Provided token:", token);
  return saved===token;
}

export const login = async (data: any, req: FastifyRequest, fastify:FastifyInstance) => {
    //console.log("req.jwt exists?", typeof fastify.jwt); // should print "function"
    try{
      const user = await userDao.findUserByEmail(data.email).then((res)=>res?.toJSON());
      
  if (!user) throw new Error('Invalid email');

  const match = await bcrypt.compare(data.password, user.password);
  if (!match) throw new Error('Invalid email or password');

  const accessToken = fastify.jwt.sign({
    id: user.id,
    email: user.email,
  },{expiresIn:'15m'});
  
  const refreshToken=fastify.jwt.sign({id:user.id,email:user.email},{ expiresIn: '7d' })

  await storeRefreshToken(fastify,refreshToken,user.id);
   return {
    message: 'Login successful',
    accessToken,
    refreshToken
  };
    }catch(error){
      console.log(error); 
    }
};

export const logoutUser = async (fastify: FastifyInstance, userId: number) => {
  await fastify.redis.del(`refresh:${userId}`);
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
