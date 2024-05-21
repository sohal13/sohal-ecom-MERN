import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {loginStart , loginSuccess ,loginFailed } from '../../redux/User/userSlice';
import { Link , useNavigate , useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

const Login = () => {

  const navigate = useNavigate();
  const dispach = useDispatch();
  const loaction = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData , setFormData] = useState({});
  const {loading , error}=useSelector((state)=>state.user);


  const handelChnage=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      dispach(loginStart())
      const res = await axios.post(`${API_BASE_URL}/auth/login`,formData)
      const data = await res.data;
      if(data.success === false){
        toast.error(data.message,{theme:"dark",autoClose:1000})
        dispach(loginFailed(data.message));
      }else{
        dispach(loginSuccess(data.rest))
      navigate(loaction.state || '/')
    }
    } catch (error) {
      console.log(error);
      dispach(loginFailed(error));
     
    }

  }
  return (
    <>
\<div className='p-3 max-w-lg mx-auto bg-blue-600 rounded-md mt-10'>
<h1 
      className='text-4xl text-center font-bold text-white
      my-7'
      >LogIn<br/>
      <span className='text-orange-600'>sohalE-Store</span>
      </h1>

<form onSubmit={onSubmit} className='flex flex-col gap-4 '>

  <input type='text' 
  placeholder='Enter EMAIL'
  className='border p-3 rounded-lg' id='email'
  onChange={handelChnage}
  required
  />

    <input type='password' 
  placeholder='Enter PASSWORD'
  className='border p-3 rounded-lg' id='password'
  onChange={handelChnage}
  required
  />
<button 
className='bg-orange-600 text-white py-3 rounded-lg text-xl
hover:opacity-90 disabled:opacity-80'
>{loading ?"Loading...":"SignIn"}</button>

</form>
<div className='gap-2 mt-5'>
  <p>Don't have an Account?
    <Link to={'/register'}> <span className='text-orange-500 font-bold'>
     signup
      </span>
      </Link>
      </p>
</div>
</div>
</>
  )
}

export default Login