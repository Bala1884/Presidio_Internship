
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import PostContextProdiver from './context/PostContext.tsx'
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense("Ngo9BigBOggjHTQxAR8/V1JEaF5cWWFCdkx1RHxbf1x1ZFdMY1hbQXFPMyBoS35Rc0VrWXhecnFcQ2ZaU0dwVEFd");
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <PostContextProdiver>
      <App />
    </PostContextProdiver>
  </BrowserRouter>,
)
