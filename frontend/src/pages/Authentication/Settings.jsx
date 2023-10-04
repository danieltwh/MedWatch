// Settings.js
import React from 'react';
import styles from './settings.module.css';

// import { useState } from 'react';

function Settings() {
  
  // const [credential , setCredential] = useState({firstname:"" , lastname:"", userid: ""});

  // const onchange = (e) =>{  
  //   setCredential({...credential ,[e.target.name] : e.target.value })
  // }
  
   

  return (
    <div className={styles.container}>
      <div className={styles.settingsWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.formGroup}>
      <h1 className={styles.title}>Settings</h1> 
            
            <input type="text"  placeholder='First Name' name='firstname' />
          </div>
          <div className={styles.formGroup}>
      
            <input type="text" placeholder='Last Name' name='lastname' />
          </div>
          <div className={styles.formGroup}>
         
            <input type="text"  placeholder='User ID' name='userid'/>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.formGroup}>
        
            <input type="text" placeholder='Email' className={styles.emailInput} readOnly value="user@example.com" />
          </div>
          <a href="/resetpass" className={styles.changePassButton}>Change Password</a>
        </div>
      </div>
         <button className={styles.saveButton}>Save</button>
  

     
    </div>
  );
}

export default Settings;
