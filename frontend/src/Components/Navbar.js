import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");
  const userData = JSON.parse(auth);
  const isAdminValue = userData && userData.isAdmin;

  const logout = () => {
    localStorage.removeItem("user"); 
    navigate("/signup");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: "pink" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin" style={{ color: "black" }}>
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth ? (
              isAdminValue ? (
                
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" style={{ color: "black" }}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin/addauthor"
                      style={{ color: "black" }}
                    >
                      Add Author
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin/addblog"
                      style={{ color: "black" }}
                    >
                      Add Blog
                    </Link>
                  </li>
                  
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/blog"
                      style={{ color: "black" }}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/mostliked"
                      style={{ color: "black" }}
                    >
                      Most Liked
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/mostcommented"
                      style={{ color: "black" }}
                    >
                      Most Commented
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      style={{ color: "black", border: 'none', background: 'none', cursor: 'pointer' }}
                      onClick={() => logout('author')}
                    >
                      Logout 
                    </button>
                  </li>
                </ul>
              ) : (
                
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/blog"
                      style={{ color: "black" }}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/mostliked"
                      style={{ color: "black" }}
                    >
                      Most Liked
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/author/mostcommented"
                      style={{ color: "black" }}
                    >
                      Most Commented
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      style={{ color: "black", border: 'none', background: 'none', cursor: 'pointer' }}
                      onClick={() => logout('author')}
                    >
                      Logout 
                    </button>
                  </li>
                </ul>
              )
            ) : (
              
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signup"
                    style={{ color: "black" }}
                  >
                    Sign Up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/signin"
                    style={{ color: "black" }}
                  >
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
