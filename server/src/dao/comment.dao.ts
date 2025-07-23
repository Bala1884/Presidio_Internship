import db from "../models";

import { Model , ModelStatic } from 'sequelize';

const Comment=db.Comment as ModelStatic<Model>;

export const createComment=async (data:any)=>await Comment.create(data);
export const findComment=async(id:number)=>await Comment.findByPk(id);
export const getAll=async()=>await Comment.findAll();
export const updateComment = async (comment: any, data: any) => await comment.update(data);
export const deleteComment = async (comment: any) => await comment.destroy();

