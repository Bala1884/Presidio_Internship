import { FastifyReply, FastifyRequest } from "fastify";
import * as commentService from "../services/comment.service";
import * as postService from "../services/post.service";

export const createComment = async (
  req: FastifyRequest<{
    Body: {
      content: string;
      post_id: number;
    };
  }>,
  reply: FastifyReply
) => {
  try {
    const { content, post_id } = req.body;
    const user_id=req.user.id as number;
    const post = await postService.getPostById(post_id);
    if (!post) {
      return reply.status(404).send({ success: false, message: 'Post not found' });
    }

    const comment = await commentService.createComment({ content, post_id,user_id });

    return reply.status(201).send({ success: true, data: comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return reply.status(500).send({ success: false, message: 'Internal server error' });
  }
};

export const getAllComments=async(req:FastifyRequest,reply:FastifyReply)=>{
  try {
      const comments = await commentService.getAllComment();
      return reply.send(comments);
    } catch (error: any) {
      return reply.code(500).send({ message: error.message });
    }
}

export const getCommentsByPostId=async(req:FastifyRequest<{Params:{post_id:number}}>,reply:FastifyReply)=>{
  try{
    const post=await postService.getPostById(req.params.post_id);
    if(!post){
      return reply.send({success:false, message:"Post not found"});
    }
    const comments= await commentService.getCommentsByPostId(req.params.post_id);
    return reply.send({success:true,data:comments});
  }catch(error){
    console.error('Error fetching comments:', error);
    return reply.status(500).send({ success: false, message: 'Internal server error' });
  }
}

export const getCommentById = async (req: FastifyRequest<{ Params: { id: number} }>, reply: FastifyReply) => {
  try {
    const comment = await commentService.getCommentById(req.params.id);
    return reply.send(comment);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const updateComment = async (req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
  try {
    const comment = await commentService.update(Number(req.params.id), req.body);
    return reply.send(comment);
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const deleteComment = async (req: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
  try {
    await commentService.remove(Number(req.params.id));
    return reply.send({ message: 'Comment deleted' });
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};