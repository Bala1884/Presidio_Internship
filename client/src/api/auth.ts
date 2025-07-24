import axios from './axios';

export const login = (email: string, password: string) =>
  axios.post('/auth/login', { email, password });

export const signup = (name: string, email: string, password: string) =>
  axios.post('/auth/signup', { name, email, password });
