import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../api/axios';
import type { Post } from '../types/post';
import DOMPurify from 'dompurify';
import type { Comment } from '../types/comment';
import { toast } from 'react-toastify';
const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const axios=useAxios();
  const [comments,setComments]=useState<Comment[]>([]);
  const [draftComment, setDraftComment]=useState<string>("");

   // 🟡 Add Likes State
  const [postLiked, setPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);
  const [commentLikes, setCommentLikes] = useState<Record<number, { liked: boolean; count: number }>>({});
  const [commentLiked, setCommentLiked] = useState(false);

 useEffect(() => {
    fetchPost();
    getComments();
    fetchPostLikes();
    fetchCommentLikes();
}, [id]);

const fetchPost = () => {
    axios.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error("Error fetching post:", err);
        toast.error("Failed to fetch post");
      });
  };

const getComments=()=>{
  axios.get(`comments/posts/${id}`).then((res)=>{
      console.log(res);
      
      console.log("Comments: ",res.data);
      setComments(res.data.data);
    })
    .catch((err)=>{
      console.error("Error fetching Comments:", err);
      alert("Failed to fetch comments");
    })
}

const handleComment = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!draftComment.trim()) return;

  try {
    const res = await axios.post(`/comments`, {
      content: draftComment,
      post_id: post?.id,
    });

    setDraftComment("");
    getComments();
  } catch (error) {
    console.error("Error posting comment", error);
    toast.error("Failed to post comment");
  }
};

 // Fetch post likes
 const fetchPostLikes = async () => {
  try {
    const res = await axios.get(`/likes/posts/${id}/status`);
    setPostLikeCount(res.data.count);
    setPostLiked(res.data.liked);
  } catch (err) {
    console.error("Error fetching post likes", err);
  }
};



  const togglePostLike = async () => {
    try {
      
        await axios.post(`/likes/posts/toggle`, { postId: post?.id });
      
      fetchPostLikes();
    } catch (err:any) {
      console.error("Error toggling post like", err);
      toast.error(err.message);
    }
  };


 const fetchCommentLikes = async () => {
  try {
    const res = await axios.get(`/likes/comments/status/${id}`);
    const data = res.data;
    console.log("Fetched comment likes:", data);
    const likesMap: Record<number, { liked: boolean; count: number }> = {};

    for (const comment of data) {
      likesMap[comment.comment_id] = {
        liked: comment.likedByUser,
        count: comment.count,
      };
    }

    setCommentLikes(likesMap);
  } catch (err) {
    console.error("Error fetching comment likes", err);
  }
};



  const toggleCommentLike = async (commentId: number) => {
  try {
    console.log(commentId);
    
    await axios.post(`/likes/comments/toggle`, { id: commentId });
    await fetchCommentLikes();
  } catch (err) {
    console.error("Error toggling comment like", err);
  }
};



  return (
    !post?<div>Loading</div>:
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
      

      {/* Post Like Section */}
      <div className='my-5'>
        <button onClick={togglePostLike} className={`px-3 py-1 text-sm rounded-full ${postLiked ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'}`}>
          {postLiked ? 'Unlike' : 'Like'}
        </button>
        <span className='ml-2 text-gray-600'>{postLikeCount} {postLikeCount === 1 ? 'like' : 'likes'}</span>
      </div>


      {/* Comments */}
      <hr className='my-8'/>
      <h2 className='text-xl font-semibold mb-4'>Comments({comments.length})</h2>
      {/* input comment */}
      <form onSubmit={handleComment} className='mb-3 flex items-center gap-3 text-md'>
        <input className='w-full rounded-xs border border-gray-600 px-2 py-1' placeholder='What are your thoughts?' type="text" value={draftComment} onChange={(e)=>setDraftComment(e.target.value)} />
        <button onClick={handleComment} className='bg-black text-white text-md rounded-xl px-2 py-2 text-center cursor-pointer'>Comment</button>
      </form>
      
      {comments?.length===0?("No comments found"): (
  <div className="space-y-4">
    {comments.map((comment) => {
  const likeInfo = commentLikes[comment.id] || { liked: false, count: 0 };

  return (
    <div key={comment.id} className="mb-4">
      <p>{comment.content}</p>
      
      <button
        onClick={() => toggleCommentLike(comment.id)}
        className={`px-3 py-1 text-sm rounded-full ${
          likeInfo.liked ? 'bg-red-500 text-white' : 'bg-gray-300 text-black'
        }`}
      >
        {likeInfo.liked ? 'Unlike' : 'Like'}
      </button>
      <span className="ml-2 text-gray-600">
        {likeInfo.count} {likeInfo.count === 1 ? 'like' : 'likes'}
      </span>
    </div>
  );
})}

    </div>)}
    </div>
  )}
  
export default PostDetails;

