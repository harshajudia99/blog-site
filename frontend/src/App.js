import './App.css';
import './Author.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';
import UpdateAuthor from './Components/UpdateAuthor';
import { ViewBlog } from './Components/ViewBlog';
import { SelectAuthor } from './Components/Blog/SelectAuthor';
import { UpdateBlog } from './Components/Blog/UpdateBlog';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
           
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<ViewBlog />} />
              <Route path="/updateauthor/:id" element={<UpdateAuthor />} />
              <Route path="/admin/blog" element={<SelectAuthor />} />
              <Route path="/updateblog/:id" element={<UpdateBlog />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
