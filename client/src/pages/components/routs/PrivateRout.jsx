
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../redux/User/userSlice';
const PrivateRout = () => {
  const {currentUser} = useSelector(state => state.user);
  const dispach = useDispatch()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isAdmin,setIsAdmin] = useState(currentUser)

  useEffect(()=>{
    const verifyUser=async()=>{
      try {
        const { data } = await axios.get(`${API_BASE_URL}/auth/verifyuser`);
        if (data?.success) {
            if (data?.user) {
                dispach(loginSuccess(data?.user))
                setIsAdmin(data?.user);
            } else {
                setIsAdmin(currentUser);
                toast.error("Login As User To Access");
            }
        } else {
            setIsAdmin(false);
            toast.error("Login As User To Access");
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        setIsAdmin(false);
        toast.error("Login As User To Access");
    }
    }
    verifyUser()
  },[])
 
  console.log(isAdmin);
  return (
   currentUser ? <Outlet/> : (<Navigate to={'/login'}/>)
  )
}

export default PrivateRout;