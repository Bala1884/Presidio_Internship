import { FastifyInstance } from 'fastify';
import {
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
  createComment,
  getCommentsByPostId,
} from '../controllers/comment.controller';
import { authenticate } from '../middlewares/auth.middleware';


export async function commentRouter(app: FastifyInstance) {
  app.get('/', getAllComments);
  app.post<{Body: { content:string,post_id: number };}>('/', {preHandler:[authenticate]},createComment);
  app.get<{Params:{post_id:number}}>('/posts/:post_id',getCommentsByPostId);
  app.get<{Params: { id: number };}>('/:id', {preHandler:[authenticate]},getCommentById);
  app.put<{Params: { id: number };}>('/:id', {preHandler:[authenticate]},updateComment);
  app.delete<{Params: { id: number };}>('/:id', {preHandler:[authenticate]}, deleteComment);
}