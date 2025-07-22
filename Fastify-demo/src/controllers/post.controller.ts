import { FastifyReply, FastifyRequest } from "fastify";
import * as postService from "../services/post.service"
export const getAllPosts=async(req:FastifyRequest,reply:FastifyReply)=>{
  try {
      const posts = await postService.getAllPost();
      return reply.send(posts);
    } catch (error: any) {
      return reply.code(500).send({ message: error.message });
    }
}

export const getPostById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const post = await postService.getPostById(Number(req.params.id));
    return reply.send(post);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const updatePost = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const post = await postService.update(Number(req.params.id), req.body);
    return reply.send(post);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const deletePost = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    await postService.remove(Number(req.params.id));
    return reply.send({ message: 'Post deleted' });
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};