import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../api/axios';
import type { Post } from '../types/post';
import DOMPurify from 'dompurify';
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const axios=useAxios();
 useEffect(() => {
  axios.get(`/posts/${id}`)
    .then((res) => {
      console.log("Fetched post:", res.data);
      setPost(res.data);
    })
    .catch((err) => {
      console.error("Error fetching post:", err);
      alert("Failed to fetch post");
    });
}, [id]);

  if (!post) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
        {post.title}
      </h1>

      {/* Author + date */}
      <div className="flex items-center text-gray-600 text-sm mt-4 mb-6">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
        <div>
          <p className="font-medium">{post.author}</p>
          <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Cover Image */}
      {post.image_urls?.[0] && (
        <img
          src={post.image_urls[0]}
          alt={post.title}
          className="w-full max-h-[500px] object-cover rounded-xl mb-8"
        />
      )}

      {/* Tags */}
      <div className="mb-4">
        {post.tags.split(',').map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-700 text-sm mt-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '') }}></p>

    </div>
  );
};

export default PostDetails;
