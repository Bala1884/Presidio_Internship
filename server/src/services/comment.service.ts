import * as commentDao from "../dao/comment.dao";



export const getAllComment=async()=>await commentDao.getAll();

export const getCommentById=async(id:number)=>await commentDao.findComment(id);

export const update=async(id:number, data:any)=>{
    const comment=await commentDao.findComment(id);
    if(!comment) throw new Error("Comment not found");
    return await commentDao.updateComment(comment,data);
}

export const remove=async(id:number)=>{
     const comment=await commentDao.findComment(id);
    if(!comment) throw new Error("Comment not found");
    return await commentDao.deleteComment(comment);
}