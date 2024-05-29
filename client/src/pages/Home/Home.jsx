import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';


const Home = () => {

  const [product , setProduct ] = useState([]);
  const [loading , setLoading] = useState(false)

  //get all product
  const getAllProducts = async () => {
    setLoading(true)
    try {
        const { data } = await axios.get(`/api/product/getall`);
        if (data.success === false) {
            setLoading(false)
            toast.error(data.message, { theme: 'dark', autoClose: 1000 })
        }
        setLoading(false)
        setProduct(data.product)
    } catch (error) {
        setLoading(false)
        console.log(error);
    }
}

useEffect(() => {
    getAllProducts();
}, [])


  return (
    <div>
      <Layout>
          <div className='flex md:p-4 p-2 md:flex-row '>
            <div >
              <h1 className='text-center text-2xl font-bold'>All Product</h1>
              <h1 className='text-xl font-bold p-2'>Products</h1>
              {loading ? (
                 <div className="flex justify-center w-full">
                 <Spin size='large' />
             </div>
              ):(
<div  className='flex flex-wrap md:gap-8 gap-2 justify-center'>

  {product?.map((p)=>(
  <Link to={`/product/${p.slug}`} key={p._id}>
    <div className='w-48 h-56 border border-black rounded hover:scale-105'>
      <img src={p.photo[0]} alt={p.slug} className='w-48 h-40 object-contain self-center p-1'/>
      <div className='text-center'>
        <h1 className='font-bold'>{p.name.split(' ').slice(0,3).join(' ')}</h1>
        <h1 className='text-green-600 font-bold'>₹{p.price}</h1>
      </div>
    </div>
  </Link>
))
}
</div>
              )}
              
            </div>
          </div>
      </Layout>
    </div>
  )
}

export default Home