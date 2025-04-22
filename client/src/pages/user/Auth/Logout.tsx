import React from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/Slice/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/Button";


const Logout: React.FC= () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () =>{
        dispatch(logoutUser())
        navigate('/login')
    }
  return <Button onClick={handleLogout}>Logout</Button>
}

export default Logout
