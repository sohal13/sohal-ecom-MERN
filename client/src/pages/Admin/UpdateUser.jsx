import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [user , setUser] = useState({}) 
    const [updatedData , setUpdatedData] = useState([]);

    const handelChange = (e) => {
        setUpdatedData({
            ...updatedData, [e.target.id]: e.target.value,
        })
    }

    const userData = async () => {
        setLoading(true)
        try {
            const {data} = await axios.get(`/api/auth/user/${id}`)
            if(data.success === false){
                setLoading(false)
                toast.info(data.message)
            }
            setLoading(false)
            setUser(data.user)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        userData();
    }, [])

    const updateUserData = async(e)=>{
        e.preventDefault();
        setLoading(true)
        try {
            const {data} = await axios.put(`/api/auth/update/${id}`,{ ...updatedData,})
            if(data.success === false){
                setLoading(false)
                toast.info(data.message)
            }
            setLoading(false)
            navigate(`/dashbord/admin/users`)
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    console.log(updatedData);
    return (
        <Layout>
            <div className='max-w-[98%] mx-auto p-3 flex flex-col justify-center items-center'>
            <h1 className='text-3xl text-center'>Update User</h1>
                <div  className='flex flex-col  bg-blue-700 md:w-[40%] w-full rounded-md p-2'>
                <form onSubmit={updateUserData} className='flex flex-col gap-4 justify-between items-center'>
                    <img src={""} alt={user.name} className='rounded-full w-14 h-14 bg-white'/>
                    <label className=''> 
                        Name :
                    <input type='text' id='name' onChange={handelChange} className='p-1 bg-gray-300 rounded w-[100%]' defaultValue={user.name}/>
                    </label>
                    <label> 
                        Email :
                    <input type='email' id='email' onChange={handelChange} className='p-1 bg-gray-300 rounded w-full'  defaultValue={user.email}/>
                    </label>
                    <label>
                        Phone No. :
                    <input type='number' id='phone' onChange={handelChange} className='p-1 bg-gray-300 rounded w-full'  defaultValue={user.phone}/>
                    </label>
                    <label>
                        Role :
                        <select type="number" id='role' onChange={handelChange} defaultValue={user.role} className='w-full rounded-md py-3'>
                                <option defaultValue=''>{user.role}</option>
                                    <option key={1} defaultValue={1}>
                                        {user.role === 1 ? 0 : 1} 
                                    </option>
                                    </select>
                            
                    </label>
                    <button
                        type='submit'
                        className='bg-green-600 rounded-lg p-2 text-white hover:scale-105' >{loading ? "Updating..." : "Update User"}</button>
                </form>
                
                </div>
            </div>
        </Layout>
    )
}

export default UpdateUser