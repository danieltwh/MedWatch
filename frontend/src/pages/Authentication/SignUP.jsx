
// SignUp.js
import React from 'react';
import styles from './signup.module.css';
import { useState } from 'react';


function SignUp() {


  const [credential , setCredential] = useState({firstname:"" , lastname:"", userid: "", email : "" , password : ""});

  const onchange = (e) =>{  
    setCredential({...credential ,[e.target.name] : e.target.value })
  }
  

  return (
    <div className={styles.container}>
     
      <div className={styles.logo}>
        <img src="./logo.png" alt="Logo" /> <h1 className={styles.title}>MedWatch</h1>
      </div>
      <div className={styles.formGroup}>
        <input type="text" placeholder='First Name' name='firstname'  value={credential.firstname} onChange={onchange}/>
      </div>
      <div className={styles.formGroup}>
        
        <input type="text" placeholder='Last Name' name='lastname'  value={credential.lastname} onChange={onchange} />
      </div>
      <div className={styles.formGroup}>
      <input type="text"  placeholder='User ID'  name='userid' value={credential.userid} onChange={onchange} />
      </div>
      <div className={styles.formGroup}>
       
        <input type="text" placeholder='Email'  name='email'  value={credential.email} onChange={onchange} />
      </div>
      <div className={styles.formGroup}>
       
        <input type="text" placeholder='Password'  name='password'  value={credential.password} onChange={onchange}/>
      </div>
      <div className={styles.checkboxGroup}>
        <label>
          <input type="checkbox" /> Staff
        </label>
        <label>
          <input type="checkbox" /> Family
        </label>
      </div>
      <button className={styles.signupButton}>Join Now</button>
      <p className={styles.signInLink}>
        Already have an account? <a href="/">Sign In</a>
      </p>
    </div>
  );
}

export default SignUp;
