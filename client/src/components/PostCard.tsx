import type { Post } from '../types/post';

const PostCard = ({ post }: { post: Post }) => {
  console.log(post);
  return (
    <div className="max-w-md mx-auto bg-white border rounded-2xl shadow-sm mb-6 overflow-hidden">
      {/* Header - Author */}
      <div className="flex items-center p-4">
        <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
        <div>
          <p className="font-semibold text-sm">{post.author}</p>
          <p className="text-xs text-gray-500">Just now</p>
        </div>
      </div>

      {/* Image or Placeholder */}
      <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400 text-xl">
        {post.image_urls && post.image_urls.length > 0 ? (
  <img src={post.image_urls[0]} alt="Post image" className="w-full h-full object-cover" />
) : (
  <div className="w-full h-full flex items-center justify-center text-gray-400">
    No image
  </div>
)}
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <h2 className="text-lg font-semibold">{post.title}</h2>
        <p className="text-sm text-blue-500 mb-1">{post.tags}</p>
        <p className="text-sm text-gray-700">{post.content}</p>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex space-x-4 text-gray-700">
        <button className="hover:text-red-500">❤️ Like</button>
        <button className="hover:text-blue-500">💬 Comment</button>
        <button className="hover:text-green-500">🔗 Share</button>
      </div>
    </div>
  );
};

export default PostCard;
