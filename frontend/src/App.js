import './App.css';
import './Author.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';
import UpdateAuthor from './Components/UpdateAuthor';
import { SelectAuthor } from './Components/Blog/SelectAuthor';
import { UpdateBlog } from './Components/Blog/UpdateBlog';
import AuthorProfile from './Components/ViewBlog/AuthorProfile';
import { BlogClient } from './Components/BlogClient';
import { ViewBlog } from './Components/ViewBlog/ViewBlog';
import { MostLiked } from './Components/LikesAndComments/MostLiked';
import { MostCommented } from './Components/LikesAndComments/MostCommented';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import { UnauthorizeUser } from './Components/Authentication/UnauthorizeUser';


function App() {
  const auth = localStorage.getItem('user');
  const userData = JSON.parse(auth);
  const isAdmin = userData && userData.isAdmin;

  const AuthGuard = ({ element }) => {
    if (!auth) {
      return <Navigate to="/signin" />;
    }
    return element;
  };

  const AdminRoute = ({ element }) => {
    if(auth){

      if (isAdmin) {
        return element;
      } else {
        return <Navigate to="/unauth" />;
      }
    }else{
      return <Navigate to="/signin" />;
    }
  };

  const AuthorGuard = ({ element }) => {
    if(auth){

      if (!isAdmin || (auth && auth.startsWith('author')) || isAdmin) {
        return element;
      } else {
        return <Navigate to="/signin" />;
      }
    }else{
      return <Navigate to="/signin" />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<AuthGuard element={<Home />} />} />
          <Route path="/admin/addauthor" element={<AdminRoute element={<Admin />} />} />
          <Route path="/author/blog" element={<AuthorGuard element={<BlogClient />} />} />
          <Route path="/admin/updateauthor/:id" element={<AdminRoute element={<UpdateAuthor />} />} />
          <Route path="/admin/addblog" element={<AdminRoute element={<SelectAuthor />} />} />
          <Route path="/admin/updateblog/:id" element={<AdminRoute element={<UpdateBlog />} />} />
          <Route path="/author/profile/:id" element={<AuthorGuard element={<AuthorProfile />} />} />
          <Route path="/author/viewblog/:id" element={<AuthorGuard element={<ViewBlog />} />} />
          <Route path="/author/mostliked" element={<AuthorGuard element={<MostLiked />} />} />
          <Route path="/author/mostcommented" element={<AuthorGuard element={<MostCommented />} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauth" element={<UnauthorizeUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
