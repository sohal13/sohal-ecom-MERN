
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/pageCmpnt/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Select } from 'antd'
const { Option } = Select;



const AdminOrders = () => {

    const navigate = useNavigate();

    const [allorders, setAllOrders] = useState([]);
    const [orderStatus, setOrderStatus] = useState(["pending", "processing", "shipping", "deliverd", "cancel"]);
    const [chnageState, setChangeState] = useState("")
    const [loading, setLoading] = useState(false)
    const getAllUserOrders = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/product/allorders`)
            const data = res.data;
            console.log(data);
            if (data.success !== true) {
                setLoading(false)
                toast.info(data.message)
            }
            setLoading(false)
            setAllOrders(data.orders)

        } catch (error) {
            setLoading(false)
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {
        getAllUserOrders();
    }, [])
    console.log(chnageState);
const handelChnageStatus=async(orderId,value)=>{
    setLoading(true)
try {
    const {data}= await axios.put(`/api/product/order-update/${orderId}`,{orderStatus:value})
    if(data.success !== true){
    setLoading(false)
    toast.info(data?.message)
    }
    toast.success(data.message,{autoClose:1000,theme:'dark'})
    getAllUserOrders();

} catch (error) {
    setLoading(false)
    toast.error(error.response.data.message)
}
}
    return (
        <Layout title={"All Orders Data"}>
            <div className='max-w-[98%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <AdminMenu />
                    </div>
                    <div className='md:w-[75%]'>
                        <div className='border border-black p-3 flex flex-col gap-3 font-bold'>
                            <h1 className='text-2xl'>All Orders</h1>
                            <div>
                                {loading ? (<div className="flex justify-center ">
                                    <Spin size='large' />
                                </div>) : (
                                    <div className='flex flex-wrap gap-4 justify-center md:justify-start w-[100%]'>
                                        {allorders?.map((o) => (
                                            <div key={o._id} className='border border-black p-2 rounded flex flex-col justify-between h-full'>
                                                {o.productsId.map((p) => (
                                                    <div key={p._id}>
                                                        <div className='flex gap-4 border border-black mt-2 p-2'>
                                                            <img src={p.photo} alt={p.name} className='w-20 h-20 object-contain' />
                                                            <div className='flex flex-col justify-between'>
                                                                <h1 className='font-bold'>{p.name.split(' ').slice(0, 3).join(' ')}</h1>
                                                                <h1>Price: ₹{p.price}</h1>
                                                                <h1 className='text-[12px]'>Delivery-Status:<span className=''>
                                                                    <Select onChange={(value) => handelChnageStatus(o._id,value)} defaultValue={o.delivery_status.toUpperCase()}>
                                                                        {orderStatus?.map((s,i)=>(
                                                                            <Option key={i} value={s}>
                                                                            {s.toUpperCase()}
                                                                        </Option>
                                                                        ))}
                                                                    </Select></span></h1>
                                                            </div>
                                                        </div>
                                                        {o?.productsId?.length === 1 && <button onClick={() => navigate(`details/${o._id}`)} className='bg-green-400 rounded w-full py-1 hover:bg-green-700 mt-2'>Order Details</button>}
                                                    </div>
                                                ))}
                                                {o?.productsId?.length > 1 && <button onClick={() => navigate(`details/${o._id}`)} className='bg-green-400 rounded w-full py-1 hover:bg-green-700 mt-2'>Order Details</button>}
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

export default AdminOrders