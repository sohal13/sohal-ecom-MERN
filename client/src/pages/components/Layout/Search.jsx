import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

const Search = () => {

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const location = useLocation();
    const [product , setProduct] = useState([])
    const [loading, setLoading] = useState(false);
 
    const SearchProduct = async()=>{
        setLoading(true);
        const queryParams = new URLSearchParams(location.search);
        const searchQuery = queryParams.toString();
        const {data} = await axios.get(`${API_BASE_URL}/product/search?${searchQuery}`);
        console.log(data);
        setLoading(false)
        setProduct(data)
    }
    useEffect(() => {
        SearchProduct();
    }, [location.search]); 

console.log(product);

  return (
    <Layout>
<div className='flex md:p-4 p-2 md:flex-row '>
    <div>

    </div>
    <div className='p-4'>
        <h1 className='font-bold text-2xl p-2'>Search Result</h1>
        {loading ? (
        <div className="flex justify-center ">
                                    <Spin size='large' />
                                </div>
                                ):(
    <div  className='flex flex-wrap md:gap-8 gap-2 justify-center'>
    {product.length === 0 && (<h1 className='text-red-600 text-xl font-bold'>No Product Found</h1>)}
    {product?.map((p)=>(
      <Link to={`/product/${p.slug}`} key={p._id}>
        <div className='md:w-48 w-44 h-56 border border-black rounded hover:scale-105'>
          <img src={p.photo[0]} alt={p.slug} className='md:w-48 w-44 h-40 object-contain self-center p-1'/>
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
  )
}

export default Search