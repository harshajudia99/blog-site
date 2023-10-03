import './App.css';
import './Author.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';
import UpdateAuthor from './Components/UpdateAuthor';
import { SelectAuthor } from './Components/Blog/SelectAuthor';
import { UpdateBlog } from './Components/Blog/UpdateBlog';
import AuthorProfile from './Components/ViewBlog/AuthorProfile';
import { BlogClient } from './Components/BlogClient';
import { ViewBlog } from './Components/ViewBlog/ViewBlog';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
           
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<BlogClient />} />
              <Route path="/updateauthor/:id" element={<UpdateAuthor />} />
              <Route path="/admin/blog" element={<SelectAuthor />} />
              <Route path="/updateblog/:id" element={<UpdateBlog />} />
              <Route path="/profile/:id" element={<AuthorProfile/>}/>
              <Route path="/viewblog/:id" element={<ViewBlog/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
