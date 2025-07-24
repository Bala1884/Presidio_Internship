import { useEffect, useState } from 'react';
import { fetchPosts } from '../api/post';
import PostCard from '../components/PostCard';
import type { Post } from '../types/post';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Home;
