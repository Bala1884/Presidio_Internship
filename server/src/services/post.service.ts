import { Model, ModelStatic } from 'sequelize';
import { MultipartFile } from '@fastify/multipart';
import db from '../models';
import cloudinary from '../config/cloudinary';
import * as postDao from '../dao/post.dao';

const Post = db.Post as ModelStatic<Model>;

export const addPost = async (
  data: any,
  files: MultipartFile[],
  userId: number
) => {
  const imageUrls: string[] = [];

  for (const file of files) {
    try {
      const buffer = await file.toBuffer();

      const url = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error.message);
              return reject(new Error('Image upload failed'));
            }
            if (result?.secure_url) {
              resolve(result.secure_url);
            } else {
              reject(new Error('No secure URL returned from Cloudinary'));
            }
          }
        );
        uploadStream.end(buffer);
      });

      imageUrls.push(url);
    } catch (err: any) {
      console.error('Upload loop failed:', err.message);
      throw new Error('Failed to upload image');
    }
  }

  //console.log('>> Creating post in DB');

  const newPost = await Post.create({
    title: data.title,
    content: data.content,
    category: data.category,
    tags: parseTags(data.tags),
    user_id: userId,
    image_urls: imageUrls,
  });

  //console.log('Post created:', (newPost as any).id);
  return newPost;
};

// Helper to parse tags (stringified JSON or plain CSV)
const parseTags = (tags: string): string => {
  try {
    const parsed = JSON.parse(tags);
    if (Array.isArray(parsed)) return parsed.join(',');
    return tags;
  } catch {
    return tags; // fallback to raw string
  }
};

export const getAllPost = async () => {
  const posts = await postDao.getAll();
  return posts.map((post: any) => {
    const postData = post.toJSON();
    return {
      ...postData,
      author: postData.author?.name || 'Unknown',
    };
  });
};

export const getPostById = async (id: number) => {
  const post= await postDao.findPost(id);
  if (!post) throw new Error('Post not found');
  const plainPost = post.toJSON();
  return {
    ...plainPost,
    author: plainPost.author?.name || 'Unknown'
  };
};

export const getPostsByUserId = async (userId: number) => {
  return await postDao.findByUserId(userId);
};

export const update = async (id: number, data: any) => {
  const post = await postDao.findPost(id);
  if (!post) throw new Error('Post not found');
  return await postDao.updatePost(post, data);
};

export const remove = async (id: number) => {
  const post = await postDao.findPost(id);
  if (!post) throw new Error('Post not found');
  return await postDao.deletePost(post);
};
