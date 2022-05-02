import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export default function Register() {

  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("/auth/register", user);
        navigate("/login", {replace: true});
      } catch(err){
        console.log(err);
      }
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={handleSubmit} className="registerForm">
              <input placeholder="Username" className="loginInput" ref={username} required />
              <input placeholder="Email" className="loginInput" type="email" ref={email} required />
              <input placeholder="Password" className="loginInput" type="password" ref={password} required />
              <input placeholder="Password Again" className="loginInput" type="password" ref={passwordAgain} required />
              <button className="loginButton" type="submit">Sign Up</button>
            </form>
            <button className="loginRegisterButton" onClick={goToLogin}>
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}