import * as postDao from "../dao/post.dao";

export const getAllPost=async()=>await postDao.getAll();

export const getPostById=async(id:number)=>await postDao.findPost(id);

export const update=async(id:number, data:any)=>{
    const post=await postDao.findPost(id);
    if(!post) throw new Error("Post not found");
    return await postDao.updatePost(post,data);
}

export const remove=async(id:number)=>{
    const post=await postDao.findPost(id);
    if(!post) throw new Error("Post not found");
    return await postDao.deletePost(post);
}