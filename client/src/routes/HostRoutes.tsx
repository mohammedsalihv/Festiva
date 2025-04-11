import React from "react";
import { Route, Routes } from "react-router-dom";

import HostLanding from "@/pages/host/Pages/HostLanding";


const HostRoutes : React.FC = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HostLanding/>}/>
    </Routes>
    </>
  )
}

export default HostRoutes