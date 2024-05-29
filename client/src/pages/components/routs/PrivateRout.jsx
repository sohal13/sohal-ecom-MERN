
import axiosInst from '../../../axiosInst.js';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../redux/User/userSlice';
const PrivateRout = () => {
  const {currentUser} = useSelector(state => state.user);
 const dispach = useDispatch()

  const [user,setuser] = useState(currentUser)

  useEffect(()=>{
    const verifyUser=async()=>{
      try {
        const { data } = await axiosInst.get(`/api/auth/verifyuser`);
        if (data?.success === true) {
            if (data.user.role === 1) {
                dispach(loginSuccess(data.user))
            } else {
                setuser(data.user);
            }
        } else {
            setuser(false);
        }
    } catch (error) {
        console.error("Error verifying user:", error);
        setuser(false);
        toast.error("Login As User To Access");
    }
    }
    verifyUser()
  },[])
 
  console.log(user);
  return (
   currentUser && user ? <Outlet/> : (<Navigate to={'/login'}/>)
  )
}

export default PrivateRout;