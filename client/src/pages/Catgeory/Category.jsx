import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../components/hooks/useCategory';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
const Category = () => {
    const navigate = useNavigate();
    const categoryes = useCategory();

  return (
    <Layout title={'All Catgeory'}>
        <div className=''>
            <h1 className='p-2 font-bold text-3xl'>All Catgeory</h1>
                {categoryes.length === 0 ? (<div className="flex justify-center ">
                                    <Spin size='large' />
                                </div>):(
                    <div className='flex md:flex-row flex-wrap gap-4 p-4 justify-around'>
                  {categoryes?.map((c)=>(
                    <div key={c._id} onClick={()=>navigate(`/category/${c.slug}`)} className="bg-blue-200 p-2 rounded w-40 hover:scale-105 cursor-pointer">
                   <img src={c.photo} className='w-40 h-40 self-center object-contain rounded p-1'/>
                   <h1 className='text-center font-bold'>{c.name}</h1>
                </div>
                ))}
                </div> 
                )}
            
        </div>
    </Layout>
  )
}

export default Category