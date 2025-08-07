import { FastifyInstance } from "fastify";
import { authenticate } from "../middlewares/auth.middleware";
import { getPostLikeCount, togglePostLike, getCommentLikeCount,toggleCommentLike, getPostLikeStatusController,getCommentLikesStatus  } from "../controllers/like.controller";


export async function likeRouter(app:FastifyInstance){
    app.post('/posts/toggle',{preHandler:[authenticate]},togglePostLike);
    app.post('/comments/toggle',{preHandler:[authenticate]},toggleCommentLike);
    app.get<{Params:{id:number}}>('/posts/count/:id',getPostLikeCount);
    app.get<{Params:{id:number}}>('/comments/count/:id',getCommentLikeCount);
    app.get<{Params:{id:number}}>('/posts/:id/status', {preHandler: [authenticate]},getPostLikeStatusController);
    app.get<{Params:{id:number}}>('/comments/status/:id', {preHandler: [authenticate]},getCommentLikesStatus);

}