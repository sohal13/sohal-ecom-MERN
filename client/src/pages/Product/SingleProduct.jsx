import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaShoppingCart } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout/Layout'
import { Spin } from 'antd';
import { addToCart } from '../../redux/Cart/CartSlice';
import BuyDirectly from '../CheckOut/BuyDirectly';

const SingleProduct = () => {


    const { slug } = useParams()
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user)
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    //const {cart,setuserCart} = userCart();

    const [product, setproduct] = useState([]);
    const [shoeImage, setShoeImage] = useState([])
    const [loading, setLoading] = useState(false);
    const [showImg, setShowImage] = useState('');
    const [relatedP, setRelatedP] = useState([]);

    SwiperCore.use([Navigation])

    const getproduct = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${API_BASE_URL}/product/get/${slug}`)
            const data = res.data;
            if (data.success === false) {
                setLoading(false)
                console.log(data.message);
                return toast.error(data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, })
            }
            setLoading(false)
            setproduct(data.product);
            setShoeImage([data.product.photo])
            getRelatedProduct(data?.product._id, data?.product?.category?._id)
        } catch (error) {
            setLoading(false)
            console.log(error);
            return toast.error(error?.response?.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, });
        }
    }


    useEffect(() => {
        getproduct();
    }, [product?.slug])

    const showImage = (url) => {
        setShowImage(url)
    }
    //get similer product

    const getRelatedProduct = async (pid, cid) => {
        setLoading(true)
        try {
            const res = await axios.get(`${API_BASE_URL}/product/related/${pid}/${cid}`)
            const data = res.data
            setLoading(false)
            setRelatedP(data.product)
        } catch (error) {
            console.log(error);
        }
    }

    //add to cart funtion
    const handelAddtoCart=(product)=>{
       dispatch(addToCart(product))
    }

    return (
        <Layout>
            <div className='max-w-[98%] mx-auto mt-2 font-sans min-h-screen h-full p-2'>
                <div className={`${loading ? "loading loading-dots w-[100px]" : "hidden"}`} />
                <div className={`flex gap-4 flex-col md:flex-row ${loading ? "hidden" : ""}`}>
                    <div className='hidden md:block md:max-w-[180px] min-w-[100px]'>
                        {shoeImage.map((innerArray, outerIndex, index) => (
                            <div key={index} className='grid grid-cols-1 gap-2 my-1 w-full'>
                                {innerArray.map((url, innerIndex) => (
                                    <div key={innerIndex} onClick={() => showImage(url)} className='border rounded border-black hover:shadow-lg hover:shadow-blue-600 cursor-pointer'>
                                        <img key={`${outerIndex}-${innerIndex}`}
                                            src={url}
                                            alt={`Shoe Image ${outerIndex}-${innerIndex}`}
                                            className='w-24 h-[93px] object-contain' />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className=''>
                        <div className='hidden md:block md:w-[400px]'>
                            {shoeImage.map((innerArray, outerIndex) => (
                                <div key={outerIndex} className=' relative flex gap-2 my-1 border border-black rounded justify-center'>
                                    <img src={showImg ? (showImg) : (innerArray[0])} alt="" className='md:h-[400px] w-[400px] h-[300px] object-contain' />
                                    <div className="absolute bottom-0 gap-4 flex">
                                        <button onClick={() => handelAddtoCart(product)} className="bg-blue-500 hover:bg-blue-800 text-white px-8 py-2 rounded flex items-center gap-2">
                                            Add to Cart<FaShoppingCart size={20} />
                                        </button>
                                        <button className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-2 rounded flex items-center gap-2">
                                        {currentUser ? (<Link><BuyDirectly directPurchaseItem={product}/></Link>):(<Link to={'/login'}><h1>Login To Check Out</h1></Link>)}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Swiper autoplay={{ delay: 5000 }} navigation className='block md:hidden'>
                            {
                                shoeImage.map((innerArray, outerIndex) => (
                                    <div key={outerIndex} className=''>
                                        {innerArray.map((url, innerIndex) => (
                                            <SwiperSlide key={url}>
                                                <div key={innerIndex} onClick={() => showImage(url)} className='border border-black rounded  w-auto'>
                                                    <img key={`${outerIndex}-${innerIndex}`}
                                                        src={url}
                                                        alt={`Shoe Image ${outerIndex}-${innerIndex}`}
                                                        className=' h-[400px] object-contain w-full' />
                                                </div>
                                            </SwiperSlide>

                                        ))}
                                    </div>
                                ))}
                        </Swiper>
                        <div className="gap-2 flex  md:hidden justify-center">
                            <button onClick={() => handelAddtoCart(product)} className="bg-blue-500 hover:bg-blue-800 text-white px-8 py-2 rounded flex items-center gap-2">
                                Add to Cart<FaShoppingCart size={20} />
                            </button>
                            <button className="bg-orange-500 hover:bg-orange-700 text-white px-8 py-2 rounded flex items-center gap-2">
                           {currentUser ? (<BuyDirectly  directPurchaseItem={product}/>):(<Link to={'/login'}><h1>Login To Check Out</h1></Link>)}
                            </button>
                        </div>

                    </div>
                    <div className='flex flex-col gap-2 font-bold w-auto'>
                        <h1 className='text-xl font-bold'>{product?.name}</h1>
                        <span className='p-2 py-1 text-2xl text-green-700'>₹{product?.price}<span className='text-sm text-black'>only</span></span>
                        <p>Description : <span className='font-thin text-gray-600 text-sm'>{product?.description}</span></p>
                        <p>Category : <span className='font-thin text-gray-600 text-xl'>{product?.category?.name}</span></p>
                    </div>
                </div>
                <div className='mt-4'>
                    <h1 className='text-3xl font-bold p-4'>Similer Product</h1>
                    <div className=''>
                        {loading ? (
                            <div className="flex justify-center ">
                                <Spin size='large' />
                            </div>
                        ) : (
                            <div className='flex flex-wrap md:gap-8 gap-2 md:justify-start md:p-4 justify-between'>
                                {relatedP?.length === 0 && (<h1 className='text-red-600 text-xl font-bold'>No Related Product Found</h1>)}
                                {relatedP?.map((p) => (
                                    <Link onClick={()=>getproduct()} to={`/product/${p.slug}`} key={p._id}>
                                        <div className='md:w-48 w-44 h-56 border border-black rounded hover:scale-105 '>
                                            <img src={p.photo[0]} alt={p.slug} className='md:w-48 w-44 h-40 object-contain self-center p-1' />
                                            <div className='text-center'>
                                                <h1 className='font-bold'>{p.name.split(' ').slice(0, 3).join(' ')}</h1>
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
            </div>
        </Layout>
    )
}

export default SingleProduct