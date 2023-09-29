import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import { Admin } from './Components/Admin';
import { Blog } from './Components/Blog';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
          <Routes>
           
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
       
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
