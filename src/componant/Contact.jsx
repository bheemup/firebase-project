import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import "../App.css";
import { AuthContext } from './context';
import Use from './Use';


function Contact() {
  let {user,setUser}=useContext(AuthContext);
  let navigate =useNavigate();
   
  let signout=()=>{
    sessionStorage.clear()
    navigate("/login")
  }
  if(sessionStorage.getItem("data")){
 
    let res =JSON.parse(sessionStorage.getItem("data"))
    setUser(res)
   
  }
 

  useEffect(()=>{
     if(!(sessionStorage.getItem("data"))){
      navigate("/login")
      alert("Login first")
     
  }
   
  
  },[signout])

 
  const [data,setdata] =useState({
    name:"",
    email:"",
    mobile:"",
    query:"",
  })



  //fetch data from form 
  let name,value;
  const getdata =(event)=>{
       name = event.target.name;
       value =event.target.value;

       setdata({...data,[name]:value})
      //  console.log(data)
  }


  //post data to server onsubmit button
  const postdata = async(e)=>{
    e.preventDefault();
      
      const {name,email,mobile,query}=data;
      if(name=="" || email =="" || mobile=="" || query=="Write here your Query"){
        alert("Fill the details")
      }else{

    let res= await fetch("https://fir-6bed8-default-rtdb.firebaseio.com/userdata.json",
    {
      method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({
           name,
           email,
           mobile,
           query,
        })
    })
     console.log(res)
    if(res){
      setdata({
        name:"",
        email:"",
        mobile:"",
         query:"Write here your Query",
      })
      alert("Data Sent Successfully")
    }
  }

  }


    //fetch data from server 
   const [server,setServer]=useState();
   var count =1;
  useEffect(()=>{
    fetch("https://fir-6bed8-default-rtdb.firebaseio.com/userdata.json")
    .then((res)=>res.json())
    .then((res)=>setServer(res))
    .catch((err)=>console.log(err))
  },[postdata])

  let store=[];
  for(let key in server){
    store.push(server[key])
  }


  return (
    <div className='con'>
      
      <h1>Contact Us(Firebase Project)</h1>

      <form  >

        <div>
          <span>Name :</span>
        <input className='input100' 
        name='name'
        onChange={getdata}
           type="text" 
           autoComplete='off'
          placeholder='type your name' 
          value={data.name}
          
          />
        
         </div>

        <div>
          <span>Email : </span>
        <input className='input100'
        name='email'
        onChange={getdata}
           type="email" 
           autoComplete='off'
           placeholder='Enter your Email'
           value={data.email} />

        </div>

        <div>
          <span>Mobile :</span>
        <input className='input100' 
        name='mobile'
        onChange={getdata}
        type="number" 
        autoComplete='off'
        placeholder='Enter your Mobile Number' 
        value={data.mobile}/>
        </div>

        <br />
  
        <textarea placeholder='Write here your Query' name="query" id="" cols="30" rows="10" 
        value={data.query}
        onChange={getdata}
        >
          
        </textarea>
        <br />
        <br />


         <button  onClick={postdata} className="button-64" >
          <span className="text">Submit</span>
          </button> 
    

       
        <br />
        <br />
        <br />



      </form>


<div>
  {
    <table>
       <tr>
        <td>Srial</td>
        <td>Name</td>
        <td>Email</td>
        <td>mobile</td>
        <td>Query</td>
        </tr>
     
      {store.map((el)=> <Use key={count} item={el} count1={count++} />)}
   
    </table>
    
  }
</div>
  <button className='button-64' onClick={signout}>SignOut</button>
    
    </div>
  )
}

export default Contact
