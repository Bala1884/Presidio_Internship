import React, { useContext, useEffect, useState } from 'react'

import{PostContext} from '../context/PostContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState,setCurrentState]=useState('Login');
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const [email,setEmail]=useState("");

  const context = useContext(PostContext);
    if (!context) {
        throw new Error("PostContext must be used within a PostContextProvider");
    }
  const { token, setToken, navigate, backendUrl } = context;
  const onSubmitHandler=async(event:any)=>{
    event.preventDefault();
    try{
      // CREATE USER
      if(currentState==='Sign Up'){
        console.log({name,email,password});
        
        const response= await axios.post(backendUrl+"/api/users/register",{name,email,password});
        if(response.data.success){
          toast.success(response.data.message);
          console.log(response.data);
          localStorage.setItem('accessToken', response.data.result.accessToken);
          localStorage.setItem('refreshToken', response.data.result.accessToken);
        }
        else{
          console.log(response.data);
          toast.error(response.data.message);
        }
      }else{
        // LOGIN USER
        const response=await axios.post(backendUrl+'/api/users/login', {email,password});
        if(response.data.success){
          toast.success(response.data.result.message);
          console.log(response.data);
          setToken(response.data.result.accessToken);
          localStorage.setItem('accessToken',response.data.result.accessToken);
          localStorage.setItem('refreshToken',response.data.result.refreshToken);
        }
         else{
          toast.error(response.data.message);
        }

      }
    }catch(error: any){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-600'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8  bg-gray-800' />
      </div>
      {currentState==='Login'?'':<input onChange={(e)=>setName(e.target.value)} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {
          currentState==='Login'? <p onClick={()=>setCurrentState('Sign Up')}className='cursor-pointer'>Create Account</p> :
                                  <p onClick={()=>setCurrentState('Login')}className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-light px-9 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
    </form>
  )
}

export default Login