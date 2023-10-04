// SignIn.js
import React from 'react';
import styles from './signin.module.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { login } from '../../features/api';



function SignIn() {
   
  const [credential, setCredential] = useState({ userid: "", password: "" });

  const [authenticated, setAuthentciated] = useState(
    localStorage.getItem("authenticated") || false
  );
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const nav = useNavigate();
  const {location} = useLocation();

  const clearError = () => {
    if(loginError || errorMsg !== "") {
      setLoginError(false);
      setErrorMsg("");
    }
  }

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearError();

    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const resp = await login(credential);

    if (resp.status === 200) {
      setAuthentciated(true);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", resp.body.access_token);
      localStorage.setItem("token_type", resp.body.token_type);
      // nav(location?.path || "/dashboard", { replace: true });
      nav(location?.path || "/dashboard", {replace: true});
    } else if(resp.status === 400) {
      setLoginError(true);
      setErrorMsg(resp.body.detail);
    } else {
      setLoginError(true);
      setErrorMsg(resp.body.detail);
    }

  };


  return (
    <div className={styles.container}>
     
      <div className={styles.logo}>
        <img src="./logo.png" alt="Logo" /> 
         <h1 className={styles.title}>Welcome</h1>
      </div>
      <form onSubmit={handleSubmit}>
      <div className={styles.formGroup} >
       
        <input type="text"  placeholder='User ID' id="userid" name='userid' value={credential.userid} onChange={onchange} />
      </div>
      <div className={styles.formGroup}>
       
        <input type="text" placeholder='Password' id="password" value={credential.password} onChange={onchange} name='password' />
        <span className={styles.forgotPassword}>Forgot Password?</span>
      </div>
      <button className={styles.loginButton} >Log In</button>
      </form>
      <p className={styles.signUpLink}>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default SignIn;
