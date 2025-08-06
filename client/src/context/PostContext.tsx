import { createContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type {NavigateFunction} from 'react-router-dom';

interface PostContextType {
  token: string;
  setToken: (token: string) => void;
  navigate: NavigateFunction;
  backendUrl: string;
  draftPost: any;
  setDraftPost: (data: any) => void;
}

export const PostContext=createContext<PostContextType | undefined>(undefined);
const backendUrl=import.meta.env.VITE_BACKEND_URL

interface PostContextProviderProps {
  children: ReactNode;
}

const PostContextProdiver=({ children }: PostContextProviderProps)=>{
    const [token,setToken]=useState<string>(localStorage.getItem("accessToken") || "");
    const navigate=useNavigate();
    const [draftPost, setDraftPost] = useState({});
    const value={
        token, setToken,
        navigate,
        backendUrl,
        draftPost, setDraftPost
    }
    return(
        <PostContext.Provider value={value}>
            {children}
        </PostContext.Provider>
    )
}
export default PostContextProdiver