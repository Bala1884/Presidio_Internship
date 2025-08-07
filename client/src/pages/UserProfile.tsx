import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxios from '../api/axios';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

interface UserProfileData {
  id: number;
  name: string;
  email: string;
  bio: string;
  profileImageUrl?: string;
}

interface Post {
  id: number;
  title: string;
  createdAt: string;
  image_urls: string[];
}

const UserProfile = () => {
  const { id } = useParams();
  const axios = useAxios();
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      if (!id) return;
      const [userRes, postsRes] = await Promise.all([
        axios.get(`/users/${id}`),
        axios.get(`/posts/user/${id}`),
      ]);
      setUser(userRes.data);
      setPosts(postsRes.data.data);
    } catch (err: any) {
      console.error("Error loading profile/posts:", err);
      setError("Failed to load user profile or posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const deletePost = async (postId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(prev => prev.filter(post => post.id !== postId));
      toast.success("Post deleted");
    } catch (err: any) {
      console.error("Failed to delete post:", err);
      toast.error("Failed to delete the post");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-10 p-6">
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.profileImageUrl || assets.profile_icon}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-1">Bio</h3>
        <p className="text-gray-600 text-sm">{user.bio || 'No bio available.'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Posts by {user.name}</h3>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-sm">No posts found.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center justify-between border border-gray-200 p-3 rounded hover:shadow transition">
                <Link to={`/post/${post.id}`} className="flex items-start gap-4">
                  {post.image_urls?.[0] && (
                    <img
                      src={post.image_urls[0]}
                      alt={post.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-medium text-gray-800">{post.title}</h4>
                    <p className="text-xs text-gray-500">
                      Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <img
                  onClick={() => deletePost(post.id)}
                  src={assets.deleteIcon}
                  alt="Delete"
                  className="w-6 h-6 cursor-pointer hover:opacity-75"
                  title="Delete Post"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
