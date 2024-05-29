import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/pageCmpnt/AdminMenu'
import axiosInst from '../../axiosInst.js';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();

    const [allproduct, setAllProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const { currentUser } = useSelector(state => state.user);

    const getAllProducts = async () => {
        setLoading(true)
        try {
            const { data } = await axiosInst.get(`/api/product/getall`,{
            });
            if (data.success === false) {
                setLoading(false)
                toast.error(data.message, { theme: 'dark', autoClose: 1000 })
            }
            setLoading(false)
            toast.success(data.message, { theme: 'dark', autoClose: 1000 })
            setAllProduct(data.product)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])


     //handel Delete product
   const handelDeleteProduct=async(p)=>{
    const confirmlogout = window.prompt("type Your 'Email' To Delete This Product");
    if (confirmlogout === currentUser.email) {
    try{
        const res = await axios.delete(`${API_BASE_URL}/product/delete/${p._id}`)
        const data = res.data;
        if(data.success === false){
            toast.error(data.message,{theme:'dark',autoClose:1000})
        }
        toast.success(data.message,{theme:'dark',autoClose:1000})
        getAllProducts();
       }catch(error){
        console.log(error);
       }
    }
    else {
        toast.info("Product Deleted Request Cancelled",{autoClose:1000 , theme:"dark"})
    }
    }
    console.log(allproduct);
    return (
        <Layout>
            <div className='max-w-[95%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <AdminMenu />
                    </div>
                    <div className='md:w-[75%] '>
                        <div>
                            <h1 className='text-3xl font-bold'>Products</h1>
                            <div className='p-2'>
                                {loading ? (<div className="flex justify-center ">
                                    <Spin size='large' />
                                </div>) : (
                                    <div className='flex flex-col gap-4 '>
                                        {allproduct?.map((p) => (
                                            <div key={p._id} className='border border-black p-2 rounded flex justify-between'>
                                            <div className='flex gap-4' onClick={()=>navigate(`/product/${p.slug}`)}>
                                                <img src={p.photo[0]} alt={p.name} className='w-20 h-20 object-contain' />
                                                <div className='flex flex-col justify-between'>
                                                <h1 className='font-bold'>{p.name.split(' ').slice(0,3).join(' ')}</h1>
                                                <h1>Price: ₹{p.price}</h1>
                                                <h1>Quantity : {p.quantity}</h1>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-around md:px-10 text-white'>
                                                <button onClick={()=>navigate(`/dashbord/admin/product/update/${p.slug}`)} className='bg-blue-600 w-full px-2 rounded p-1 hover:bg-blue-800'>Edit</button>
                                                <button onClick={()=>handelDeleteProduct(p)}  className='bg-red-500 px-2 rounded p-1 hover:bg-red-800'>Delete</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products