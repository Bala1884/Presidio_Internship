import type { Post } from '../types/post';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="border-b py-6 flex flex-col md:flex-row gap-6 hover:bg-gray-50 px-4 md:px-8">
      {/* Left: Post info */}
      <div className="flex-1">
        {/* Author + time */}
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <div className="w-6 h-6 rounded-full bg-gray-300 mr-2"></div>
          <span className="font-medium">{post.author}</span>
          <span className="mx-2">·</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:underline">{post.title}</h2>
        </Link>

        {/* Summary or content preview */}
        <p className="text-gray-700 text-sm line-clamp-1 mt-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content || '') }}></p>
        {/* Tags */}
        <div className="text-xs text-blue-600 mt-2">
          {post.tags.split(',').map((tag, i) => (
            <span key={i} className="mr-2">#{tag}</span>
          ))}
        </div>
      </div>

      {/* Right: Image */}
      {post.image_urls?.[0] && (
        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gray-200">
          <img
            src={post.image_urls[0]}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
