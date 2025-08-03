import { useEffect, useState } from 'react';
import useAxios from '../api/axios';
import { fetchPosts } from '../api/post';
import PostCard from '../components/PostCard';
import type { Post } from '../types/post';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const axios=useAxios();

  useEffect(() => {
    fetchPosts(axios).then((res) => setPosts(res.data));
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
