import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import type { Post } from '../types/post';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert('Failed to fetch post'));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="text-gray-500">By {post.author}</p>
      <p className="mt-4">{post.content}</p>
    </div>
  );
};

export default PostDetails;
