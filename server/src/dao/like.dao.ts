
import db from "../models";
import { Model, ModelStatic, Sequelize } from 'sequelize';

const Like = db.Like as ModelStatic<Model>;
const Comment=db.Comment as ModelStatic<Model>;
export const findLike = async (userId: number, postId?: number, commentId?: number) => {
  return Like.findOne({
    where: {
      userId, 
      ...(postId !== undefined ? { postId } : {}),
      ...(commentId !== undefined ? { commentId } : {}),
    },
  });
};

export const createLike = async (userId: number, postId?: number, commentId?: number) => {
  return Like.create({
    userId,
    postId: postId ?? null,
    commentId: commentId ?? null,
  });
};

export const deleteLike = async (userId: number, postId?: number, commentId?: number) => {
  return Like.destroy({
    where: {
      userId, 
      ...(postId !== undefined ? { postId } : {}),
      ...(commentId !== undefined ? { commentId } : {}),
    },
  });
};

export const countLikes = async (postId?: number, commentId?: number) => {
  if (postId === undefined && commentId === undefined) {
    throw new Error("Either postId or commentId must be provided.");
  }

  return Like.count({
    where: {
      ...(postId !== undefined ? { post_id:postId } : {}),
      ...(commentId !== undefined ? { commentId } : {}),
    },
  });
};

export const getCommentLikes = async (postId: number) => {
  const results = await Like.findAll({
    attributes: ["comment_id", [Sequelize.fn("COUNT", "commentId"), "count"]],
    include: [{
      model: Comment,
      as:'liked_comment',
      where: Sequelize.where(
      Sequelize.col('liked_comment.post_id'),
      postId
    ),
      attributes: [],
    }],
    group: ["comment_id"],
    raw: true,
  });

  return results.map((r: any) => ({
    commentId: Number(r.comment_id),
    count: Number(r.count),
  }));
};

export const getUserLikedCommentIds = async (userId: number, postId: number) => {
  const likes = await Like.findAll({
    where: { userId },
    include: [{
      model: Comment,
      as:'liked_comment',
      where: Sequelize.where(
      Sequelize.col('liked_comment.post_id'),
      postId
    ),
      attributes: [],
    }],
    attributes: ["commentId"],
    raw: true,
  });

  return likes.map((l: any) => l.commentId);
};
