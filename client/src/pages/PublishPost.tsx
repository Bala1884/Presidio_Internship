import React, { useState, useContext } from 'react';
import { PostContext } from '../context/PostContext';
import { createPost } from '../api/post';
import useAxios from '../api/axios';
import { toast } from 'react-toastify';
const PublishPost = () => {
  const [tags, setTags] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("PostContext must be used within a PostContextProvider");
  }

  const { token, draftPost, navigate } = context;
  const { title, content } = draftPost || {};

  const axiosInstance = useAxios();
  const handleSubmit = async () => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);
    const formData = new FormData();

    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tagArray.join(','));
    if (thumbnail) {
      formData.append('image', thumbnail);
    }

    try {  
      const res = await createPost(axiosInstance, formData); 
      console.log('Post created:', res.data);
      toast.success(res.data.message);
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setThumbnail(file || null);
  };

  const onClose=()=>{
    navigate('/');
  }
  return (
    <div className='flex flex-col gap-4 ml-3'>
        <input type="text" placeholder='Enter Tags here' className='w-1/2 border border-gray-200 px-3 py-1 text-2xl' value={tags} onChange={(e)=>setTags(e.target.value)} />
        <input className='border w-1/4 border-gray-200' type="file" accept='image/*' onChange={handleFiles}/>
        <div className='flex justify-center gap-2'>
            <button className='bg-black text-white rounded-xl px-3 py-1 cursor-pointer' onClick={handleSubmit}>Submit Post</button>
            <button className='bg-black text-white rounded-xl px-3 py-1 cursor-pointer' onClick={onClose}>Cancel</button>

        </div>
    </div>
  )
}

export default PublishPost