import React from 'react'
import {useSelector} from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'

const AdminRout = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
   currentUser && currentUser?.role === 1 ? <Outlet/> : (<Navigate to={'/'}/>)
  )
}

export default AdminRout;