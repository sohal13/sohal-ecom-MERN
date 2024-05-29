import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInst from '../../axiosInst.js';
import { toast } from 'react-toastify';
import { Spin } from 'antd';

const OrdersDetails = () => {

  const navigate = useNavigate();
  const { id } = useParams()
  const [orderDetail, setOrderDetail] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrderProduct = async () => {
    setLoading(true)
    try {
      const res = await axiosInst.get(`/api/product/myorders/details/${id}`);
      const data = res.data;
      if (data.success === false) {
        setLoading(false)
        toast.error(data.message)
      }
      setLoading(false)
      setOrderDetail([data.userOrder]);

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
      <div>
        <div>
          {loading ? (
            <div className="flex justify-center ">
              <Spin size='large' />
            </div>
          ) : (
            <div className='flex flex-wrap gap-4'>

              {orderDetail?.map((o) => (
                <div key={o._id} className='p-2 flex flex-col md:flex-row justify-center w-full gap-4'>
                  <div className='p-2'>
                  <h1 className='font-bold text-3xl'>Products</h1>
                    {o.productsId?.map((p) => (

                      <div key={p._id} className='p-2'>
                        
                        <div className='flex justify-center w-full border border-black gap-2 mt-2 p-2'>
                          <img src={p.photo[0]} alt={p.name} className='w-32 h-32' />
                          <div className='flex flex-col justify-between p-2'>
                            <h1 className='text-xl font-bold'>{p.name.split(' ').slice(0, 3).join(' ')}</h1>
                            <h1  className='text-xl font-bold'>₹{p.price}</h1>
                            <button onClick={()=>navigate(`/product/${p.slug}`)} className='bg-green-400 p-1 rounded hover:bg-green-600'>Product Detail</button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <h1 className='text-sm text-gray-600'>orederID-{id}</h1>
                  </div>
                  <div className='p-2'>
                  <h1 className='font-bold text-3xl'>Shipping Details</h1>
                    {orderDetail?.map((o) => (
                      <div key={o._id} className='p-2 items-start text-2xl flex flex-col gap-3'>
                        
                        <h1>Order At : {o.createdAt}</h1>
                        <h1>Payment Status : <span className={`${o.payment_status === "paid" ? " bg-green-400" : "bg-gray-300 "} py-1 px-2`}>{o.payment_status.toUpperCase()}</span></h1>
                        <h1 className=''>Delivery Status:<span className='bg-gray-300 p-1'>{o.delivery_status.toUpperCase()}</span></h1>
                        <h1>Total Price : ₹{o.total/100}</h1>
                        <h1>No. of Products : {o.productsId.length}</h1>
                        <h1 className='font-bold text-3xl'>Shipping Address</h1>
                        <h1>Address: {o.shippingAddress.address.city} , {o.shippingAddress.address.line1}</h1>
                        <h1>Area Code: {o.shippingAddress.address.postal_code}</h1>

                        <h1>Name:{o.shippingAddress?.name}</h1>
                        <h1>Email:{o.shippingAddress?.email}</h1>
                        <h1>Phone no:{o.shippingAddress?.phone}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>

        </div>
      </div>
    </Layout >

  )
}

export default OrdersDetails