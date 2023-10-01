import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';
import { Blog } from './Components/Blog';
import UpdateAuthor from './Components/UpdateAuthor';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
           
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/updateauthor/:id" element={<UpdateAuthor />} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
