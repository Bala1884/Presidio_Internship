import axios from 'axios';
import { useContext } from 'react';
import { PostContext } from '../context/PostContext';

const useAxios = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("PostContext must be used within a PostContextProvider");
  }

  const { token, backendUrl } = context;

  const instance = axios.create({
    baseURL: backendUrl+'/api',
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
};

export default useAxios;
