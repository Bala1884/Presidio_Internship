import { FastifyInstance } from 'fastify';
import {
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} from '../controllers/post.controller';
import { authenticate } from '../middlewares/auth.middleware';

export async function postRouter(app: FastifyInstance) {
  app.get('/', getAllPosts);
  app.get<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},getPostById);
  app.put<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},updatePost);
  app.delete<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},deletePost);
}