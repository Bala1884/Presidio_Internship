import { useContext, useRef, useState } from 'react';
import { RichTextEditorComponent, Inject, HtmlEditor, Toolbar, Image, Link, QuickToolbar } from '@syncfusion/ej2-react-richtexteditor';
import { PostContext } from '../context/PostContext';
import axios from 'axios';


const CreatePost = () => {
  const context=useContext(PostContext);
  const titleRef = useRef<HTMLInputElement>(null);
  const rteRef = useRef<any>(null);

  if (!context) {
        throw new Error("PostContext must be used within a PostContextProvider");
    }
  const {token, navigate, setDraftPost}=context;

  const uploadToCloudinary = async (file: Blob): Promise<string> => {
  const formData = new FormData(); 
  formData.append('file', file);
  formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw err;
  }
};


  const processImagesInContent = async (html: string): Promise<string> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const imgTags = doc.querySelectorAll('img');

  for (const img of imgTags) {
    const src = img.getAttribute('src') || '';
    if (src.startsWith('data:') || img.src.startsWith('blob:')) {
      const blob = await fetch(src).then(res => res.blob());
      const url = await uploadToCloudinary(blob);
      //console.log("Cloudinary URL:", url);
      img.setAttribute('src', url);
    }
  }
  

  return doc.body.innerHTML;
};


  
  const handleSubmit = async () => {
  const title = titleRef.current?.value || '';
  const rawContent = rteRef.current?.getHtml() || '';
  const processedContent = await processImagesInContent(rawContent);
  //console.log(processedContent);

  setDraftPost({ title, content: processedContent });
  navigate('/publish');
};

 
  return (
    <div>
      <input type="text" placeholder='Title' ref={titleRef} className='w-full border border-gray-200 px-3 py-1 text-2xl mb-2' />
      <div className='flex flex-col items-center gap-3'>

        <RichTextEditorComponent ref={rteRef}>
          <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]} />
        </RichTextEditorComponent>

        <button className='bg-black text-white rounded-xl px-3 py-1 cursor-pointer' onClick={handleSubmit}>Submit Post</button>
      </div>
    </div>
  );
};

export default CreatePost;
