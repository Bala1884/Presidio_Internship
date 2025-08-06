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
 useEffect(() => {
  axios.get(`/posts/${id}`)
    .then((res) => {
      console.log("Fetched post:", res.data);
      setPost(res.data);
    })
    .catch((err) => {
      console.error("Error fetching post:", err);
      toast.error("Failed to fetch post");
    });
    getComments();
}, [id]);

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
    {comments?.map((comment) => (
      <div key={comment.id} className="flex flex-col bg-gray-100 p-3 rounded-md">
        <div className='flex gap-2 mb-3 items-center'>
          <div className='rounded-full w-6 h-6 bg-black'></div>
          <p className="text-xs text-gray-500 mt-1">
            by {comment.author?.name} on {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className="text-gray-800">{comment.content}</p>
      </div>
    ))}
    </div>)}
    </div>
  )}
  
export default PostDetails;

