

import React, { useState } from 'react'
import "./Login.css"
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate} from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from './context';

 function Login() {

  let {setUser} = useContext(AuthContext);
  
   let navigate =useNavigate();
   
  const [login_data,setLogin]=useState({
    email:"",
    password:"",
  });

  const [err,setErr]=useState("");
  
    
  const getdata =(e)=>{
     let name =e.target.name;
     let value =e.target.value;
     setLogin({...login_data,[name]:value})
  }


  const handle_submit =()=>{
    if(
     login_data.email=="" || 
    login_data.password==""){
      setErr("Fill all fields")
    }else{
      setErr("");
     signInWithEmailAndPassword(auth,login_data.email,login_data.password).then((res)=>{
      // console.log(res.user)
      setUser(res.user.displayName)

      sessionStorage.setItem("data",JSON.stringify(res.user.displayName))
     
      navigate("/");
      alert("Loging Successfull") 
     })
     .catch((err)=>setErr(err.message))
    }
  }

  return (
    <div className='container'>
      <div className='inner-con'>
          <h1>Login </h1>
          <br />
          <p>Email</p>
          <input type="email"
      
          name="email"
          value={login_data.email}
          onChange={getdata}
          placeholder='Enter email' />

          <p>Password</p>
          <input type="password" 
      
          name="password"
          value={login_data.password}
          onChange={getdata}
          placeholder='Password' />
          <br />
          <br />
          <br />
          <div style={{color:"red",fontWeight:"700"}}>{err}</div>
          <button onClick={handle_submit}>Login</button>
          <h4>If Don`t have account?  <a href="/signup">Signup</a></h4>


      </div>
    </div>
  )
}  
export default Login;