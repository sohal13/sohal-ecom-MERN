import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/pageCmpnt/UserMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {

    const navigate = useNavigate();

  
    const [orderDetail , setOrderDetail] = useState([]);
    const [loading, setLoading] = useState(false);

    const getOrderProduct = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/product/myorders`);
            const data = res.data;
            if (data.success === false) {
                setLoading(false)
                toast.error(data.message)
            }
        setLoading(false)
        setOrderDetail(data.userOrder);
            
        } catch (error) {
            setLoading(false)
            toast.info(error.response.data.message)
            console.log(error);
        }
    }
console.log(orderDetail);
    useEffect(() => {
        getOrderProduct();
    }, [])

    return (

        <Layout>
            <div className='max-w-[95%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <UserMenu />
                    </div>
                    <div className='md:w-[75%] '>
                        <div className=' p-3 flex flex-col gap-3 font-bold'>
                            <h1 className='text-3xl'>Orders</h1>
                            <div className='p-2'>
                                {loading ? (<div className="flex justify-center ">
                                    <Spin size='large' />
                                </div>) : (
                                    <div className='flex flex-wrap gap-4 justify-center md:justify-start '>
                                        {orderDetail?.map((o) => (
                                            <div key={o._id} className='border border-black p-2 rounded flex flex-col justify-between h-full'>
                                           {o.productsId.map((p)=>(
                                             <div key={p._id}>
                                            <div className='flex gap-4 border border-black mt-2 p-2'>
                                                <img src={p.photo} alt={p.name} className='w-20 h-20 object-contain' />
                                                <div className='flex flex-col justify-between'>
                                                <h1 className='font-bold'>{p.name.split(' ').slice(0,3).join(' ')}</h1>
                                                <h1>Price: ₹{p.price}</h1>
                                                <h1 className='text-[12px]'>Delivery-Status:<span className='bg-gray-300 py-1 px-2'>{o.delivery_status.toUpperCase()}</span></h1>
                                                </div>
                                                </div>
                                                  {o?.productsId?.length === 1 && <button onClick={()=>navigate(`details/${o._id}`)} className='bg-green-400 rounded w-full py-1 hover:bg-green-700 mt-2'>Order Details</button>}
                                                 </div>
                                           ))}
                                            {o?.productsId?.length > 1 && <button onClick={()=>navigate(`details/${o._id}`)} className='bg-green-400 rounded w-full py-1 hover:bg-green-700 mt-2'>Order Details</button>}
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

export default UserOrders