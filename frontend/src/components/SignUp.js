// src/components/Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./style.css";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  function clicklogin(){
    navigate("/login");
  }
  
  const handleSignup = async (event) => {
    event.preventDefault();
    // console.log("Name:", name);
    // console.log("email:", email);
    // console.log("password: ", password)
   
      await axios.post("http://localhost:5500/users/signup", 
      { 
        "name":name, 
        "email": email, 
        "password":password 
      }, 
      {
        headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        }
      }).then(response=>{
        // console.log("1",response)
        alert("Registration Successful");
        // Redirect or navigate to the login page
        // For example, you can use the useHistory or useNavigate hook
        // history.push("/login");
        navigate("/login");
      
    }).catch(error => {
      alert("Registration failed");
      // console.error("Registration error:", error);
    })
  };
  return (
    <div>

<div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3">Sign Up</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSignup}>
            <div className="mb-4">
                <label for="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name"placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label for="email" className="form-label">Email</label>
                <input type="text" className="form-control" id="email"placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                 placeholder="Enter password"onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {/* <div className="mb-4">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label for="remember" className="form-label">Remember Me</label>
              </div> */}
              <div className="d-grid">
                <button type="submit" className="btn  main-bg btn-success m-2" id="submit">SignUp</button>
              </div>
              <div className="d-grid">
                <button className="btn m-2 btn-primary" onClick={clicklogin}>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  );
}

export default SignUp;
