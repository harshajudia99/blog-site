import './App.css';
import './Author.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css"
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
import { MostLiked } from './Components/LikesAndComments/MostLiked';
import { MostCommented } from './Components/LikesAndComments/MostCommented';
import SignIn from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';

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
              <Route path="/mostliked" element={<MostLiked/>}/>
              <Route path="/mostcommented" element={<MostCommented/>}/>
              <Route path="/signin" element={<SignIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
