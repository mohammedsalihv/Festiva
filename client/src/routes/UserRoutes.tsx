import React from 'react';
import {Routes , Route } from 'react-router-dom'

import Login from '../pages/user/Auth/Login';
import Signup from '@/pages/user/Auth/Signup';
import Otp from '@/pages/user/Auth/Otp';


import Home from "@/pages/user/services/Home";




const UserRoutes : React.FC = () => {
  return (
    <>
       <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/otp-verification' element={<Otp/>}/>


          <Route path='/home' element={<Home/>}/>
       </Routes>
    </>
  )
}

export default UserRoutes