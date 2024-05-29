import React, { useEffect, useState } from 'react'
import { FaBarsStaggered } from "react-icons/fa6";
//import Logo from '../../assets/images/logo.png'
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'
import axios from 'axios';
import useCategory from '../hooks/useCategory.jsx'

const NavBar = () => {
    const navigate = useNavigate();

    const { cartItems } = useSelector(state => state.cart);
    const { currentUser } = useSelector(state => state.user);
    const categoryes = useCategory();
 
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm , setSearchTerm] = useState('')

    const toggleSidebar = () => {
        setShowSearchDropdown(false)
        setShowSidebar(!showSidebar);
    };
    const toggleSearchDropdown = () => {
        setShowSearchDropdown(!showSearchDropdown);
    };

    //handel search my user
    const handelSearch = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('search',searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('search');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
},[loading.search])





    const handelLogout=async()=>{
            setLoading(true)
            try {
                const logout = await axios.post(`/api/auth/logout`)
                const data = logout.data;
                if (data?.success === false) {
                    setLoading(false)
                    console.log(data?.message);
                }
                toast.info(data?.message,{autoClose:1000 , theme:"dark"})
                localStorage.removeItem('persist:root')
                setLoading(false)
                navigate('/login')
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
    }

    return (
        <div className={`max-w-[98%] mx-auto mt-2 h-12 shadow-lg font-sans `}>
            <div className='flex justify-between items-center h-full px-2'>
                <div className='flex gap-2 hover:cursor-pointer ' >
                    <h1 onClick={toggleSidebar} className='flex bg-blue-800 rounded-md px-1 hover:bg-orange-600 items-center'><FaBarsStaggered color='white' className='font-bold md:text-3xl text-3xl' />
                        <span className='hidden md:flex text-2xl font-semibold text-white '>More</span>
                    </h1>
                    <div className=' bg-blue-800 rounded-md w-auto hidden md:flex'>
                            <select onClick={(e)=>navigate(`/category/${e.target.value}`)}  key={"1"} id='category' className='w-full rounded-md bg-blue-800  text-xl text-white font-bold'>
                            <option className='' value={""} >{"Category"}</option>
                                {categoryes?.map((c) => (
                                    <option key={c._id} value={c.slug}>
                                    {c.name}
                                    </option>            
                                ))}
                            </select>
                        </div>
                </div>
                <div className='mb-5 md:mb-8'>
                    <Link to={'/'}><h2 className='md:text-5xl text-3xl font-bold text-orange-600 mt-4'>Sohal<span className='text-blue-800'>E-Store</span></h2></Link>
                </div>
                <div className='text-blue-900'>
                    <ul className='flex gap-1 md:text-xl text-md items-center'>
                        {showSearchDropdown ? (
                            <li onClick={toggleSearchDropdown} className='flex justify-center cursor-pointer items-center bg-orange-600 text-white rounded-md p-1 '>
                                <ImCancelCircle className='md:xl text-2xl' /><span className='hidden md:flex'>Search</span>
                            </li>
                        ) : (
                            <li onClick={toggleSearchDropdown} className='flex justify-center cursor-pointer items-center bg-blue-800 text-white rounded-md p-1 hover:bg-orange-600'>
                                <FaSearch className='md:xl text-2xl' /><span className='hidden md:flex'>Search</span>
                            </li>
                        )}
                        <Link to={'/cart'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white rounded-md p-1 relative hover:bg-orange-600'>
                            <FaShoppingCart className='md:xl text-2xl' /><span className='hidden md:flex'>Cart</span><span className='text-sm absolute top-[-5px] right-[-5px] w-5 h-5 text-center bg-orange-700 rounded-full '>{cartItems.length}</span>
                        </li>
                        </Link>
                        {currentUser ? (
                            <Link to={'/profile'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white  rounded-full md:w-10 md:h-10 w-9 h-9 hover:bg-orange-600'>
                                <span className='md:text-5xl text-4xl md:mb-4 mb-3'>{currentUser?.name[0]}</span>
                            </li>
                            </Link>
                        ) : (<Link to={'/login'}><li className='flex justify-center cursor-pointer items-center  bg-blue-800 text-white  rounded-md p-1 hover:bg-orange-600'>
                            <RiLoginBoxFill className='md:xl text-2xl' /><span className='hidden md:flex'>Login</span>
                        </li>
                        </Link>
                        )}


                    </ul>
                </div>
            </div>
            {showSidebar && (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-70 '>
                    <div className='absolute left-0 top-0 h-full bg-white text-white w-72 py-4'>
                        {/* Sidebar content goes here */}
                        <div className='flex justify-between items-center px-4'>
                            <h2 className='text-2xl font-bold  text-orange-600'>Sohal<span className='text-blue-800'>E-Store</span></h2>
                            <button className='text-white' onClick={toggleSidebar}>
                                <ImCancelCircle className='md:text-3xl text-xl text-red-600' />
                            </button>
                        </div>
                        <ul className='p-4 w-full h-full flex flex-col justify-between' onClick={() => setShowSidebar(false)}>
                            <div className='flex flex-col gap-4'>
                            <Link to={'/'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                                Home
                            </li>
                            </Link>
                            <Link to={'/category'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                                Category
                            </li>
                            </Link>
                            {
                                currentUser?.role === 1 ? (
                                    <Link to={'/dashbord/admin'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                                        Admin DashBord 
                                    </li>
                                    </Link>
                                ) : (
                                    <Link to={'/dashbord/user'}> <li className=' bg-blue-800 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500'>
                                        DashBord
                                    </li>
                                    </Link>
                                )
                            }
                      
                            </div>
                            <div>
                            <li onClick={handelLogout} className=' bg-red-500 p-1 rounded hover:border hover:border-orange-600 text-xl font-bold font-mono text-white hover:text-orange-500 flex'>
                            <RiLoginBoxFill className='md:xl text-2xl' />LogOut
                            </li>
                            </div>
                        </ul>
                    </div>
                </div>
            )}
            {showSearchDropdown && (
                <form onSubmit={handelSearch} className='absolute border border-black top-10 md:right-8 right-2 bg-white  rounded-lg shadow-lg w-[95%] z-10   flex mt-4'>
                    <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type='text' placeholder='Search...' className='outline-none p-2 rounded-md w-full' />
                    <button className='bg-orange-600 text-white  rounded-md px-6 font-bold '><FaSearch className='md:2xl md' /></button>
                </form>
            )}
        </div>
    )
}

export default NavBar