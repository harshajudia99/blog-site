import React, { useState } from "react";
import "../../Auth.css";
import { Link, useNavigate } from "react-router-dom";
import SelectUser from "./SelectUser";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      userRole: selectedUser,
    };

    try {
      const response = await fetch(`http://localhost:3000/${selectedUser}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/signin");
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <SelectUser setSelectedUser={setSelectedUser} />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>

            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={handleInputChange}
                value={formData.fname}
                name="fname"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g Jane Doe"
                onChange={handleInputChange}
                value={formData.lname}
                name="lname"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Email Address"
                onChange={handleInputChange}
                value={formData.email}
                name="email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label>Mobile Number</label>
              <input
                type="tel"
                className="form-control mt-1"
                placeholder="Mobile Number"
                onChange={handleInputChange}
                value={formData.mobile}
                name="mobile"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={handleInputChange}
                value={formData.password}
                name="password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>

            <div className="text-center">
              Already registered?{" "}
              <span className="link-primary">
                <Link to={"/signin"}>Sign In</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
