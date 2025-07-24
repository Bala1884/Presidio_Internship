import axios from './axios';

export const fetchPosts = async() =>await axios.get('/posts');
export const fetchPostById = async(id: string) => await axios.get(`/posts/${id}`);
