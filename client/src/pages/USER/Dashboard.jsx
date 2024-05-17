import React from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/pageCmpnt/UserMenu'
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { currentUser } = useSelector(state => state.user);


  return (
    <Layout>
    <div className='max-w-[95%] mx-auto p-3 m-3'>
      <div className='flex md:flex-row flex-col gap-3'>
        <div className='md:w-[20%] w-full'>
        <UserMenu/>
        </div>
        <div className='md:w-[75%] '>
    <div className='border border-black p-3 flex flex-col gap-3 font-bold'>
      <h1 className='text-2xl'>Name : {currentUser?.name}</h1>
      <h1 className='text-2xl'>Email : {currentUser?.email}</h1>
      <h1 className='text-2xl'>Phone : {currentUser?.phone}</h1>
      <h1 className='text-2xl'>Role : {currentUser?.role}</h1>
    </div>
        </div>
      </div>
      
    </div>
        </Layout>
        
  )
}

export default Dashboard