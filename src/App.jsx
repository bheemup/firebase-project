import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Contact from './componant/Contact'
import Login from './componant/Login'
import Nav from './componant/Nav'
import Signup from './componant/Signup'

function App() {


  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Contact/>}  />
      <Route path='/login' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App