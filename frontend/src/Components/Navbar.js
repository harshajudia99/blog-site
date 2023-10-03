import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: 'pink' }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/admin" style={{ color: 'black' }}>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" style={{ color: 'black' }}>
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/admin" style={{ color: 'black' }}>
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/blog" style={{ color: 'black' }}>
                  Add Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog" style={{ color: 'black' }}>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
