import { useState } from 'react';
import api from '../api/axios';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/signup', formData);
      localStorage.setItem('token', res.data.token); // Save JWT
      alert('Signup successful!');
    } catch (err) {
      alert('Signup failed!');
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-3 p-4">
      <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="email" placeholder="Email" type="email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Sign Up</button>
    </form>
  );
};

export default Signup;
