import { FastifyInstance } from 'fastify';
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByUser
} from '../controllers/post.controller';

import { authenticate } from '../middlewares/auth.middleware';



export async function postRouter(app: FastifyInstance) {
  app.get('/', getAllPosts);
  app.post('/', {preHandler:[authenticate]},addPost);
  app.get<{Params: { id: string };}>('/:id',getPostById);
  app.get<{Params:{id:number}}>('/user/:id',getPostsByUser);
  app.put<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},updatePost);
  app.delete<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},deletePost);
}