import React, { useState } from 'react'
import "./Login.css"
import {createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {auth} from "../firebase";
import { useNavigate } from 'react-router-dom';


function Signup() {
   
  let navigate =useNavigate();
  const [signup_data,setSignup]=useState({
    name:"",
    email:"",
    password:"",
    conferm_password:"",
  });
  const [err,setErr]=useState("");
    
  const getdata =(e)=>{
     let name =e.target.name;
     let value =e.target.value;
     setSignup({...signup_data,[name]:value})
  }


  const handle_submit=()=>{
    if(signup_data.name=="" ||
     signup_data.email=="" || 
    signup_data.password==""||
     signup_data.password!=signup_data.conferm_password
     ){
        setErr("Fill all fields")
    }else{
      setErr("");
     createUserWithEmailAndPassword(auth,signup_data.email,signup_data.password).then((res)=>{
      console.log(res.user);
    
      const user =res.user;
      alert("success");
      navigate("/login")
      updateProfile(user,{
        displayName:signup_data.name })
      })
     .catch((err)=>setErr(err.message))
     setSignup({
      name:"",
      email:"",
      password:"",
      conferm_password:"",
    }) 
   
  }}

 
  
  return (
    <div className='container' style={{height:"650px"}}>
      <div className='inner-con' style={{width:"500px",height:"85%"}}>
          <h1>Sign Up </h1> 
          <p>Name</p>
          <input type="text"
          autoComplete='off'
          value={signup_data.name}
          name="name"
          onChange={getdata}
           placeholder='Enter name' 
           />
          <p>Email</p>
          <input type="email" 
          autoComplete='off'
          value={signup_data.email}
          name="email"
          onChange={getdata}
          placeholder='Enter email'
           />
          <p>Password</p>
          <input type="password"
          autoComplete='off'
          value={signup_data.password}
          name="password"
          onChange={getdata}
           placeholder='Password' 
           />
          <p>Conferm Password</p>
          <input type="password" 
          autoComplete='off'
          name='conferm_password'
          onChange={getdata}
          placeholder='Repeat password' 
          />
          <br />
 
          <br />
          <h4 style={{color:"red"}} >{err}</h4>
          <button onClick={handle_submit}>Signup</button>
          <h4>If Already have account ?  <a href="/login">Login</a></h4>
      </div>
    </div>
  )
}

export default Signup
