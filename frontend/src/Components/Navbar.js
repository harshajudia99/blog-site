import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();

  const auth = localStorage.getItem("user");
  const userData = JSON.parse(auth);
  const isAdminValue = userData && userData.isAdmin;

  const logout = () => {
    localStorage.removeItem("user"); // Remove the user data from localStorage
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
                // Render this ul if isAdmin is true
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/" style={{ color: "black" }}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin"
                      style={{ color: "black" }}
                    >
                      Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/admin/blog"
                      style={{ color: "black" }}
                    >
                      Add Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      style={{ color: "black", border: 'none', background: 'none', cursor: 'pointer' }}
                      onClick={() => logout('admin')}
                    >
                      Logout 
                    </button>
                  </li>
                </ul>
              ) : (
                // Render this ul if isAdmin is false
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/blog"
                      style={{ color: "black" }}
                    >
                      Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/mostliked"
                      style={{ color: "black" }}
                    >
                      Most Liked
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/mostcommented"
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
              // Render this ul if there is no user data in localStorage
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
