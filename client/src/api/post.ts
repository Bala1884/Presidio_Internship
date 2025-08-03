export const fetchPosts = async (axiosInstance: any) => {
  return await axiosInstance.get('/posts');
};

export const fetchPostById = async (axiosInstance: any, id: string) => {
  return await axiosInstance.get(`/posts/${id}`);
};

export const createPost = async (
  axiosInstance: any,
  formData: FormData
) => {
  return await axiosInstance.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};


