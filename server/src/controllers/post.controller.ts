import { FastifyReply, FastifyRequest } from "fastify";
import * as postService from "../services/post.service"
import { MultipartFile } from '@fastify/multipart';

export const addPost = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const parts = req.parts();
    const files: MultipartFile[] = [];
    const postData: any = {};
    const userId = (req as any).user?.id;

    console.log(">> Starting to parse parts");

    for await (const part of parts) {
  if (part.type === 'file') {
    console.log(">> Received file:", part.filename);

    await part.toBuffer(); // Force reading stream
    console.log(">> Finished reading file:", part.filename);

    files.push(part as MultipartFile);
  } else {
    console.log(`>> Received field: ${part.fieldname} = ${part.value}`);
    postData[part.fieldname] = part.value;
  }
}
console.log(">> Finished parsing parts ✅");


    // ✅ Now actually call the service to create the post
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
    if(!post) return reply.code(403).send({message:"Post not found"});
    if(post.user_id !== req.user.id) reply.send({message:"Unauthorised"})
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