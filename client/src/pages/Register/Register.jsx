import React, { useState } from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast } from 'react-toastify';


const Register = () => {

  const navigate = useNavigate()
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [formData , setFormData] = useState({
  })
  const [Loading , setLoading] = useState(false)


  const handelChnage=(e)=>{
     setFormData({
      ...formData,[e.target.id]:e.target.value,
     })
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
try {
    if(formData.password !== formData.confpassword) return toast.error("Password And Conf.Password Not Matching",{theme:'dark',autoClose: 1000})
    setLoading(true)
    const res = await axios.post(`${API_BASE_URL}/auth/register`,formData)
      const data = await res.data;
      if(data.success===false){
        setLoading(false)
        toast.error(data.message,{theme:'dark',autoClose: 1000,})
      }else{
        setLoading(false)
        navigate('/login')
      }

} catch (error) {
  setLoading(false)
  console.log(error);
}
} 

  return (
    <>
    <div className='p-3 max-w-lg mx-auto bg-blue-600 mt-10 rounded-lg'>
      <h1 
      className='text-4xl text-center font-bold text-white
      my-7'
      >Register<br/>
      <span className='text-orange-600'>sohalE-Store</span>
      </h1>
      <form onSubmit={onSubmit} className='flex flex-col gap-4 '>
        <input type='text' 
        placeholder='Enter NAME'
        className='border p-3 rounded-lg' id='name'
        onChange={handelChnage}
        required
        />
        <input type='email' 
        placeholder='Enter EMAIL'
        className='border p-3 rounded-lg' id='email'
        onChange={handelChnage}
        required
        />
          <input type='number' 
        placeholder='Enter PHONE Number'
        className='border p-3 rounded-lg' id='phone'
        onChange={handelChnage}
        required
        />
          <input type='text' 
        placeholder='Enter PASSWORD'
        className='border p-3 rounded-lg' id='password'
        onChange={handelChnage}
        required
        />
           <input type='text' 
        placeholder='Confirm PASSWORD'
        className='border p-3 rounded-lg' id='confpassword'
        onChange={handelChnage}
        required
        />
      <button disabled={Loading}
      className='bg-orange-600 text-white py-3 rounded-lg text-xl
      hover:opacity-90 disabled:opacity-80'
      >{Loading ? "Loading...":"SignIn"}</button>
      </form>
      <div className='gap-2 mt-5'>
        <p>Have an Account?
          <Link to={'/login'}> <span className='text-orange-500 font-bold'>
           login
            </span>
            </Link>
            </p>
      </div>
      </div>
      </>
  )}
export default Register