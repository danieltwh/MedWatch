// ResetPassword.js
import React from 'react';
import styles from './resetpass.module.css';

function ResetPassword() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Reset Password</h1>
      <div className={styles.formGroup}>
    
        <input type="text" placeholder='User ID'/>
      </div>
      <div className={styles.formGroup}>
       
        <input type="password"  placeholder='New Password'/>
      </div>
      <div className={styles.formGroup}>
     
        <input type="password" placeholder='Confirm password' />
      </div>
      <button className={styles.resetButton}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;
