import React from 'react'
import { Link } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className='w-auto bg-blue-100 text-center p-2'>
        <h1 className='text-3xl font-bold '>User Panel</h1>
        <ul className='flex flex-col gap-2 mt-2 bg-blue-200 text-xl'>
            <Link to={'/dashbord/user/Profile'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >Profile</li>
            </Link>
            <Link to={'/dashbord/user/orders'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >Orders</li>
            </Link>
            <Link to={'/dashbord/user/users'}>
                <li className='bg-white p-1 border border-black  hover:bg-blue-700' >WishList</li>
            </Link>
        </ul>
    </div>
    </>
  )
}

export default UserMenu