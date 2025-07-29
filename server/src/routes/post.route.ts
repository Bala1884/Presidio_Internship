import { FastifyInstance } from 'fastify';
import {
  addPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller';

import { authenticate } from '../middlewares/auth.middleware';


export async function postRouter(app: FastifyInstance) {
  app.get('/', getAllPosts);
  app.post<{Params: { id: string };}>('/', {preHandler:[authenticate]},addPost);
  app.get<{Params: { id: string };}>('/:id',getPostById);
  app.put<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},updatePost);
  app.delete<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},deletePost);
}