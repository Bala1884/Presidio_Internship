import { useContext, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';
import{PostContext} from '../context/PostContext';
import {assets} from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [visible,setVisible]=useState(false);
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("PostContext must be used within a PostContextProvider");
    }
  const { token, setToken, navigate, backendUrl } = context;

  const handleWrite=()=>{
    if(token){
        navigate('/add-post');
    }
    else{
        toast.error("Login to add post");
    }
  }

    const logout=async()=>{
        const refreshToken=localStorage.getItem('refreshToken');
        await axios.post(backendUrl+'/api/users/logout',{refreshToken});
        navigate('/login');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('token');
        setToken('');
    }
  return (
    
        <nav className='flex items-center justify-between p-5 font-medium'>
            <div className='flex flex-row gap-3 items-center'>
            <Link to={'/'}>
                <img src={assets.logo} className='w-18'/>
            </Link>
            <input className='border rounded py-1 px-2' placeholder='Search' type="text" />
            <img src={assets.search_icon} className='w-6 h-6 cursor-pointer'/>
            </div>
            
            <div className='flex items-center gap-6'>
                <div className='flex gap-8'>
                    <div onClick={handleWrite} className='flex flex-row gap-1 items-center cursor-pointer'>
                        <img className='w-5' src={assets.write_icon} alt="" />
                        <p className='text-gray-500 text-sm'>Write</p>
                    </div>
                    <div className="relative group">
                        <img onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} className='w-5 cursor-pointer'/>
                        {/* Dropdown Menu */}
                        {token && <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-8'>
                            <div className='flex flex-col gap-2 w-36 bg-slate-100 text-gray-500'>
                                <p onClick={logout} className='cursor-pointer hover:text-black'>logout</p>
                            </div>
                        </div>}
                    </div>
                </div>
                
                <img onClick={()=>setVisible(true)} src={assets.menu_icon} alt='' className='w-5 cursor-pointer sm:hidden'/>
                {/* Mobile side bar menu */}
                <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible?'w-full':'w-0'}` }>
                    <div className='flex flex-col text-gray-700'>
                        <div onClick={()=>setVisible(false)}className='flex items-center gap-4 p-3 cursor-pointer'>
                            <img className='rotate-180 h-4' src={assets.dropdown_icon}/>
                            <p>Back</p>
                        </div>
                    </div>
                </div>
            </div>
            
        
        
    </nav>
  )
}

export default Navbar