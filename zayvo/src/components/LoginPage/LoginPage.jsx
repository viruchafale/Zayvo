

import React,{useState} from 'react'
import "./LoginPage.css"
import { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from '../../firebase/firebase';
const LoginPage = () => {




function formController(form) {
form.preventDefault();
signInWithEmailAndPassword(auth, form.target.email.value, form.target.password.value)
  .then((userCredential) => {
    console.log(userCredential)
    // Signed up 
    // const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`Error Occured:\n${errorMessage}\n With Code: ${errorCode}`)
    // ..
  });
  
}
  return (
    <div className='login_container'>
        <div className='login_box'>
            <h1 className='header'>Welcome Back</h1>
            <h2 className='header'> Sign in to continue</h2>
            <form onSubmit={formController}>
                <label htmlFor="email">Email or Phone Number</label>
                <br />
                <input name="email" type='text' placeholder='Enter your email or phone number' id='email' className='input_field' />
                <br></br>
                <label htmlFor="password">Password</label>
                <br />
                <input name="password" type='password' placeholder='Enter your password' className='input_field' />
                <br></br>
                <button className='button'>Sign in </button>
                
            </form>
        </div>
    </div>
  )
}

export default LoginPage


