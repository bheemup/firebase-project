import React from 'react';
import "./Nav.css";
import {useContext} from "react";
import {AuthContext} from "./context";


function Nav() {

  let {user} = useContext(AuthContext)

  return (
    <div className="nav">
    <a href="/">Home</a>
   <div className='inner'>
    {
        user? <div className='sub'>
        <img  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="user" />
          <p> Welcome {user}</p>
      </div>: <a href="/login">Login</a>
    }
   
 
   </div>
    </div>
  )
}

export default Nav