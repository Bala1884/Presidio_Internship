import { FastifyRequest, FastifyReply } from 'fastify';
import * as LikeService from '../services/like.service';

export const togglePostLike = async (req: FastifyRequest, reply: FastifyReply) => {
  try{
    const { postId } = req.body as { postId: number };
    const userId = (req as any).user?.id;
    console.log("req.user:", req.user);

    const result = await LikeService.togglePostLike(userId, postId);
    reply.send(result);
  }catch(error:any){
    console.log(error.message);
    return reply.status(500).send({ success: false, message: error.message });   
  }
};

export const getPostLikeCount = async (req: FastifyRequest, reply: FastifyReply) => {
  try{

    const postId = (req as any).params.id;
    const result = await LikeService.getPostLikeCount(postId);
    reply.send(result);
  }catch(error:any){
    console.log(error.message);
    return reply.status(500).send({ success: false, message: error.message });
  }
};

export const toggleCommentLike = async (req: FastifyRequest, reply: FastifyReply) => {
  try{
    const  {id:commentId}  = (req as any).body;
    const userId = req.user.id;
    console.log("commentId received is "+commentId);
    if (!commentId) {
      
    return reply.code(400).send({ error: 'Comment ID is required' });
  }
    const result = await LikeService.toggleCommentLike(userId, commentId);
    reply.send(result);
  }catch(error:any){
    console.log(error.message);
    return reply.status(500).send({ success: false, message: error.message });
    
  }
};

export const getCommentLikeCount = async (req: FastifyRequest, reply: FastifyReply) => {
  try{
    const commentId = (req as any).params.id;
    const result = await LikeService.getCommentLikeCount(commentId);
    reply.send(result);
  }catch(error:any){
    return reply.status(500).send({ success: false, message: error.message });
  }
};


export const getPostLikeStatusController = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = (req as any).user?.id;
    const postId = (req.params as any).id;

    if (!postId || !userId) {
      return reply.status(400).send({ message: "Missing data" });
    }

    const result = await LikeService.getPostLikeStatusService(userId, postId);
    return reply.send(result);
  } catch (error) {
    console.error("Error getting post like status:", error);
    return reply.status(500).send({ message: "Internal Server Error" });
  }
};

export const getCommentLikesStatus = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const commentId = (req.params as any).id;
    const userId = (req as any).user.id;

    const status = await LikeService.getCommentLikesStatus(userId, commentId);
    reply.send(status);
  } catch (err:any) {
    console.log(err);
    
    reply.code(400).send({ error: err.message });
  }
};
