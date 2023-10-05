import React, { useState } from "react";
import "../../Auth.css";
import { Link, useNavigate } from "react-router-dom";
import SelectUser from "./SelectUser";

export default function SignIn() {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignInData({
      ...signInData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", signInData.email);
    formData.append("password", signInData.password);
    try {
      const response = await fetch(`http://localhost:3000/${selectedUser}/signin`, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
          localStorage.setItem("user", JSON.stringify(result));
       

        if (selectedUser === "author") {
          navigate("/blog");
        } else {
          navigate("/admin");
        }
      } else {
        alert("Invalid email or password");
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
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label className="label">Email address</label>
              <input
                type="email"
                name="email"
                value={signInData.email}
                className="form-control mt-1"
                onChange={handleInputChange}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                value={signInData.password}
                className="form-control mt-1"
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="text-center">
              Not registered?{" "}
              <span className="link-primary">
                <Link to={"/signup"}>Sign Up</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
