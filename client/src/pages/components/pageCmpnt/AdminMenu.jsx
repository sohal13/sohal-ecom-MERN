import React from 'react'
import { Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <div className='w-auto bg-blue-100 text-center p-2'>
        <h1 className='text-3xl font-bold '>Admin Panel</h1>
        <ul className='flex flex-col gap-2 mt-2 bg-blue-200 text-xl'>
            <Link to={'/dashbord/admin/create-category'}>
                <li className='bg-white p-1 border border-black hover:bg-blue-700' >Create Catrgory</li>
            </Link>
            <Link to={'/dashbord/admin/create-product'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >Create Product</li>
            </Link>
            <Link to={'/dashbord/admin/product'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >Product</li>
            </Link>
            <Link to={'/dashbord/admin/orders'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >All Orders</li>
            </Link>
            <Link to={'/dashbord/admin/users'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >Users</li>
            </Link>
        </ul>
    </div>
    </>
  )
}

export default AdminMenu