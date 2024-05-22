import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/pageCmpnt/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [allUser , setAllUser] = useState([]);
    const [loding,setLoading] = useState(false);

    const getAllUser=async()=>{
        setLoading(true)
        try {
            const {data} = await axios.get(`${API_BASE_URL}/auth/alluser`) 
            if(data.success !== true){
                setLoading(false)
                toast.info(data?.message)
            }
            setLoading(false)
            console.log(data);
            setAllUser([data.users])
        } catch (error) {
            setLoading(false)
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    useEffect(()=>{
       getAllUser();
    },[])
console.log(allUser);
  return (
    <Layout title={"all User"}>
    <div className='max-w-[95%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <AdminMenu />
                    </div>
                    <div className='md:w-[75%] '>
                        <div>
                            <h1 className='text-3xl font-bold'>
                                Users
                                </h1>
                                <div className='flex flex-wrap gap-4'>
                                    {allUser?.map((u)=>(
                                        <div key={u._id} className='flex gap-2 justify-center items-center md:justify-between flex-col md:flex-row bg-gray-200 p-2 w-full'>
                                            {/*<img src='' alt={u.name}/>*/}
                                         
                                            <div className='flex gap-2'>
                                            <h1 className='w-32 h-32 items-center bg-gray-400'>{u.name[0]}</h1>
                                            <div className='text-2xl flex flex-col justify-between'>
                                                <h1>{u.name}</h1>
                                                <h1>{u.email}</h1>
                                                <h1>{u.phone}</h1>
                                            </div>
                                            </div>
                                            <div className='flex flex-col gap-4 p-2 text-xl'>
                                                <button className='bg-green-400 p-1'>Update</button>
                                                <button  className='bg-red-400 p-1'>Delete</button>
                                                </div>
                                        </div>
                                    ))}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
    </Layout>
  )
}

export default Users