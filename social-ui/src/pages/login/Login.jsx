import { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './login.css';
import { CircularProgress } from "@material-ui/core";
import { loginCall } from '../../apiCalls';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();

    const { user, isFetching, dispatch } = useContext(AuthContext);
    
    useEffect(() => {
        console.log("user is ", user);
        if(user){
            navigate("/", {replace: true});
        }
    }, [user]);

    const handleClick = (e) => {
        console.log("handling the clicks");
        e.preventDefault();
        loginCall(
            {
                email: email.current.value, 
                password: password.current.value 
            }, 
            dispatch);
    }

    const goToRegister = () => {
        navigate("/register");
    }
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
                    <form onSubmit={handleClick} className="loginForm">
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" type="password" required className="loginInput" ref={password} />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ): (
                                "Login In"
                            )}
                        </button>
                        <span className="loginForgot">Forgot Password?</span>
                    </form>
                    <button className="loginRegisterButton" onClick={goToRegister}>
                            {isFetching ? (
                                <CircularProgress color="white" size="20px" />
                            ): (
                                "Create a New Account"
                            )}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
