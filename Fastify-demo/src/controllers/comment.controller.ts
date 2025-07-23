import { FastifyReply, FastifyRequest } from "fastify";
import * as commentService from "../services/comment.service"
export const getAllComments=async(req:FastifyRequest,reply:FastifyReply)=>{
  try {
      const comments = await commentService.getAllComment();
      return reply.send(comments);
    } catch (error: any) {
      return reply.code(500).send({ message: error.message });
    }
}

export const getCommentById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const comment = await commentService.getCommentById(Number(req.params.id));
    return reply.send(comment);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const updateComment = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const comment = await commentService.update(Number(req.params.id), req.body);
    return reply.send(comment);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const deleteComment = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    await commentService.remove(Number(req.params.id));
    return reply.send({ message: 'Comment deleted' });
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};