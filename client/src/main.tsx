
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import PostContextProdiver from './context/PostContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PostContextProdiver>
      <App />
    </PostContextProdiver>
  </BrowserRouter>,
)
