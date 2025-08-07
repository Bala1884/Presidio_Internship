import * as LikeDAO from '../dao/like.dao';

export const togglePostLike = async (userId: number, postId: number) => {
  const existing = await LikeDAO.findLike(userId, postId, undefined);
  if (existing) {
    await LikeDAO.deleteLike(userId, postId, undefined);
    return { liked: false };
  } else {
    await LikeDAO.createLike(userId, postId, undefined);
    return { liked: true };
  }
};

export const getPostLikeCount = async (postId: number) => {
  const count = await LikeDAO.countLikes(postId, undefined);
  return { count };
};

export const toggleCommentLike = async (userId: number, commentId: number) => {
  const existing = await LikeDAO.findLike(userId, undefined, commentId);
  if (existing) {
    await LikeDAO.deleteLike(userId, undefined, commentId);
    return { likedByUser: false };
  } else {
    await LikeDAO.createLike(userId, undefined, commentId);
    return { likedByUser: true };
  }
};

export const getCommentLikeCount = async (commentId: number) => {
  const count = await LikeDAO.countLikes(undefined, commentId);
  return { count };
};


export const getPostLikeStatusService = async (userId: number, postId: number) => {
  const liked = !!(await LikeDAO.findLike(userId, postId));
  const count = await LikeDAO.countLikes(postId);
  return { liked, count };
};

export const getCommentLikesStatus = async (userId: number, postId: number) => {

  
  const commentLikes = await LikeDAO.getCommentLikes(postId); 
  const likedComments = await LikeDAO.getUserLikedCommentIds(userId, postId);
  
  const likedSet = new Set(likedComments);

  return commentLikes.map((c) => ({
    comment_id: c.commentId,
    count: c.count,
    likedByUser: likedSet.has(c.commentId),
  }));
};

