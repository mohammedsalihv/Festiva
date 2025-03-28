import React from 'react';
import {Routes , Route } from 'react-router-dom'

import Login from '../pages/Auth/Login';
import Signup from '@/pages/Auth/Signup';
import Otp from '@/pages/Auth/Otp';

const UserRoutes : React.FC = () => {
  return (
    <>
       <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/otp-verification' element={<Otp/>}/>
       </Routes>
    </>
  )
}

export default UserRoutes