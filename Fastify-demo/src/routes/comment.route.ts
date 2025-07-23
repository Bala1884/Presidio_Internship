import { FastifyInstance } from 'fastify';
import {
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
} from '../controllers/comment.controller';
import { authenticate } from '../middlewares/auth.middleware';

export async function commentRouter(app: FastifyInstance) {
  app.get('/', getAllComments);
  app.get<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},getCommentById);
  app.put<{Params: { id: string };}>('/:id', {preHandler:[authenticate]},updateComment);
  app.delete<{Params: { id: string };}>('/:id', {preHandler:[authenticate]}, deleteComment);
}