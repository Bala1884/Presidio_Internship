import db from "../models";

import { Model , ModelStatic } from 'sequelize';

const Post=db.Post as ModelStatic<Model>;
const User=db.User as ModelStatic<Model>;

export const createPost=async (data:any)=>await Post.create(data);
export const findPost=async(id:number)=>await Post.findByPk(id);
export const getAll=async()=>await Post.findAll({include:[{
    model:User,
    as: 'author',
    attributes:['id','name','email'],
}]});
export const updatePost = async (post: any, data: any) => await post.update(data);
export const deletePost = async (post: any) => await post.destroy();

