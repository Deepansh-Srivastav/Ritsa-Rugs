import React from 'react'
import GoogleOAuth from '../components/OAuth';
import "./Login.css";
import { IoPersonAddOutline } from "../../../shared/icons/icons.js"

const Login = () => {

  return (
    <section className='login-page'>

      <div className="login-form-container">
        <h3>Welcome Back</h3>
        <div className="login-options">
          <GoogleOAuth />
          <button className="auth-btn">
            <div className="auth-icon">
              <IoPersonAddOutline />
            </div>
            <span>Create a New Account</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;