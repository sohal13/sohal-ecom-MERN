import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Spin } from 'antd'

const CategoryProduct = () => {

    const {slug} = useParams();

    const [product , setProduct] = useState([])
    const [loading , setLoading] = useState(false)

    const getProduct = async()=>{
        setLoading(true)
        try {
            const res = await axios.get(`/api/product/bycategory/${slug}`)
            const data = res.data;
            setLoading(false)
            setProduct(data?.product)
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    useEffect(()=>{
        getProduct();
    },[])


  return (
    <Layout> 
        <div>
            <h1 className='text-2xl p-2 font-bold md:ml-10'>{slug} Category Products</h1>
<div className='p-2'>
{loading ? (
                 <div className="flex justify-center w-full">
                 <Spin size='large' />
             </div>
              ):(
<div  className='flex flex-wrap md:gap-8 gap-2 md:justify-around'>
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
              {product.length === 0 && <h1 className='text-red-600 text-center'>No Product With This Catgeory</h1>}
</div>
</div>
    </Layout>
    
  )
}

export default CategoryProduct