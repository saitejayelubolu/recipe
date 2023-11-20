import React, { useEffect, useState} from "react";
// import "./style.css";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("user-info")) {
      navigate("/");
    }
  });
  let handleSubmit = (event) => {
    const obj = { "email":email, "password": password };
    // console.log("details", obj)
    const url = "http://localhost:5500/users/login";
    axios
      .post(url, obj)
      .then((res) => {
        if(res.status===200){
          alert("Login Successfully");
          // console.log("res:",res.data.message);
          localStorage.setItem("user-info", JSON.stringify(res));
          navigate("/");
        }else{
          alert(res.data.message)
        }
      })
      .catch((err) => {
        alert(err);
        // console.log("Error",err);
      });
    event.preventDefault();
  };
 
  return (
    <div>
      <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label for="username" className="form-label">Username/Email</label>
                <input type="text" className="form-control" id="email"placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Enter password"onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {/* <div className="mb-4">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label for="remember" className="form-label">Remember Me</label>
              </div> */}
              <div className="d-grid">
                <button type="submit" className="btn  main-bg btn-success" id="submit">Login</button>
              </div>
              <div className="d-grid">
                <Link className="btn btn-primary" style={{textAlign:"center",textDecoration:"none",marginTop:"30px"}} to="/signup">SignUp</Link>
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
export default LogIn;
