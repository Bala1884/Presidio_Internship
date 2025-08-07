import { FastifyReply, FastifyRequest } from "fastify";
import * as postService from "../services/post.service"
import { MultipartFile } from '@fastify/multipart';

export const addPost = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parts = req.parts();
    const files: MultipartFile[] = [];
    const postData: any = {};
    const userId = (req as any).user?.id;

    for await (const part of parts) {
  if (part.type === 'file') {
    await part.toBuffer();
    files.push(part as MultipartFile);
  } else {
    postData[part.fieldname] = part.value;
  }
}
    const result = await postService.addPost(postData, files, userId);

    return reply.send({ success: true, message: 'Post created', data: result });
  } catch (err: any) {
    return reply.status(500).send({ success: false, message: err.message });
  }
};


export const getAllPosts=async(req:FastifyRequest,reply:FastifyReply)=>{
  try {
      const posts = await postService.getAllPost();
      return reply.send(posts);
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      return reply.code(500).send({ message: error.message });
    }
}

export const getPostById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const post = await postService.getPostById(Number(req.params.id)) as any;
    
    if (!post) {
      return reply.code(404).send({ message: "Post not found" });
    }

    return reply.send(post);
  } catch (error: any) {
    return reply.code(500).send({ message: error.message });
  }
};
export const getPostsByUser = async (
  req: FastifyRequest<{ Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const userId = (req.params as any).id;
    const posts = await postService.getPostsByUserId(userId);
    return reply.send({ data: posts });
  } catch (error: any) {
    return reply.code(500).send({ success: false, message: error.message });
  }
};


export const updatePost = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const post=await postService.getPostById(Number(req.params.id)) as any;
    if (!post) {
      return reply.code(404).send({ message: "Post not found" });
    }

    if (post.user_id !== req.user.id) {
     return reply.code(403).send({ message: 'Unauthorized access' });
   }

    const updatedPost = await postService.update(Number(req.params.id), req.body);
    return reply.send({success:true, updatePost});
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};

export const deletePost = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const post=await postService.getPostById(Number(req.params.id))as any;
    if(!post){
      return reply.code(404).send({message:"Post not found"});
    }
    if (post.user_id !== req.user.id) {
     return reply.code(403).send({ message: 'Unauthorized access' });
   }
    await postService.remove(Number(req.params.id));
    return reply.send({ message: 'Post deleted' });
  } catch (error: any) {
    return reply.code(404).send({ message: error.message });
  }
};