import {  Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PostDetails from './pages/PostDetails';
import Navbar from './components/Navbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextEditor from './pages/CreatePost';
import PublishPost from './pages/PublishPost';

function App() {
  return (
    <div>
    <Navbar/>
    <ToastContainer 
        aria-label="notification"
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="add-post" element={<TextEditor/>}/>
        <Route path="/publish" element={<PublishPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
