
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loginSuccess } from '../../../redux/User/userSlice';

const AdminRout = () => {

    const {currentUser} = useSelector(state => state.user);
    const dispach = useDispatch()

    const [isAdmin,setIsAdmin] = useState(currentUser)

    useEffect(()=>{
      const verifyUser=async()=>{
        try {
          const { data } = await axios.get('/api/auth/verifyuser');s
          if (data.success) {
              if (data.user) {
                  dispach(loginSuccess(data.user))
                  setIsAdmin(data.user);
              } else {
                  setIsAdmin(false);
                  toast.error("Login As Admin To Access");
              }
          } else {
              setIsAdmin(false);
              toast.error("Login As Admin To Access");
          }
      } catch (error) {
          console.error("Error verifying user:", error);
          setIsAdmin(false);
          toast.error("Login As Admin To Access");
      }
      }
    verifyUser()
    },[])
   
    console.log(isAdmin);

  return (
    currentUser.role === 1 ? <Outlet/> : (<Navigate to={'/'}/>)
  )
}

export default AdminRout;