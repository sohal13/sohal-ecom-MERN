import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/pageCmpnt/AdminMenu'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebase.js';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Bounce, toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CreateProduct = () => {
    const navigate = useNavigate();

    const { currentUser } = useSelector(state => state.user);
    console.log(currentUser._id);
    const [files, setFile] = useState({});
    const [category, setCategory] = useState([]);
    const [imgloading, setimgLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: currentUser?._id,
        photo: [],
    });
    console.log(formData);
    //collecting user data
    const handelData = (e) => {
        setFormData({
            ...formData, [e.target.id]: e.target.value
        })
    }
    //Image Upload Function
    const submitImage = () => {
        if (files.length > 0 && files.length < 5) {
            setimgLoading(true)
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, photo: formData.photo.concat(urls) })
                setimgLoading(false)
            }).catch((error) => {
                toast.error('Image Upload Failed (2mb Max Per Image', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                })
                setimgLoading(false);
            });
        }
        else (
            toast.error("Image Shoul be More then 0 and Lest Then 5", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        )
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const UploadTask = uploadBytesResumable(storageRef, file);
            UploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Uploades is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    })
                }
            )
        })
    }
    //image delete 
    const handelImgDelete = (index) => {
        setFormData({
            ...formData, photo: formData.photo.filter((_, i) => i !== index),
        })
    }
    //sending data to backend 
    const handelSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`/api/product/create`, formData);
            const data = res.data;
            if (data.success === false) {
                setLoading(false);
                console.log(data.message);
                return toast.error(data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, })
            }
            setLoading(false);
            toast.success(data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, })
            navigate('/dashbord/admin/product')
        } catch (error) {
            setLoading(false)
            console.log(error);
            return toast.error(error?.response?.data.message, { position: "top-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: false, draggable: true, progress: undefined, theme: "dark", transition: Bounce, });
        }
    }

    //get all cat
    const getAllCategory = async () => {
        try {
            const res = await axios.get(`/api/category/categoryes`)
            const data = res.data;
            if (data.success === false) {
                toast.error(data.message, { theme: 'dark', autoClose: 1000 })
            }
            setCategory(data.category)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCategory();
    }, [])

    return (
        <Layout title={"Create Product "}>
            <div className='max-w-[95%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <AdminMenu />
                    </div>
                    <div className='md:w-[75%] '>
                        <div className='flex flex-col items-center md:items-stretch '>
                            <h1 className='text-3xl font-bold'>Create Product</h1>
                            <div className='felx flex-col justify-center items-center bg-blue-700 md:w-auto w-[300px] rounded-md p-2'>
                                <form onSubmit={handelSubmit} className='w-full flex flex-col md:flex-row gap-2 '>
                                    <div className='flex flex-col gap-4 md:w-[50%] '>
                                        <div className='flex gap-1'>
                                            <input id='name' onChange={handelData} placeholder='Name..' className='rounded-md p-1 w-full' />
                                        </div>
                                        <div className='flex gap-1'>
                                            <textarea id='description' onChange={handelData} placeholder='Description..' rows={4} className='w-full rounded-md p-1' />
                                        </div>
                                        <div className='flex gap-1'>
                                            <input id='price' onChange={handelData} placeholder='Price in ₹' type='number' className='w-full rounded-md p-1' />
                                        </div>
                                        <div className='flex gap-1'>
                                            <select key={"1"} id='category' onChange={handelData} value={formData.category} className='w-full rounded-md p-1'>
                                                <option value=''>Select a category</option>
                                                {category?.map((c) => (
                                                    <option key={c._id} value={c._id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex gap-1'>
                                            <input type="number" id='quantity' onChange={handelData} placeholder='Enter Quantity' className='w-full rounded-md p-1' />
                                        </div>
                                        <div className='flex gap-1'>
                                        <select key={"1"} id='shipping' onChange={handelData} value={formData.shipping} className='w-full rounded-md p-1'>
                                                <option value=''>Shipping</option>
                                                    <option key={1} value={true}>
                                                      true
                                                    </option>
                                                   <option key={0} value={false}>
                                                      false
                                                    </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='md:w-[50%] flex gap-2 flex-col'>
                                        <div className='flex flex-col w-full'>
                                            <p className='text-white font-bold'>Product Images :<span className='font-thin text-sm'>first IMAGE will be the Cover (max 4)</span></p>
                                            <div className='flex border rounded gap-2'>
                                                <input onChange={(e) => setFile(e.target.files)} className='p-1 rounded w-full' type='file' id='images' accept='image/*' multiple />
                                                <button disabled={loading || imgloading} type='button' onClick={submitImage} className='p-1 text-green-600 bg-white border border-green-600 rounded hover:shadow-lg hover:text-blue-700 font-bold'>
                                                    {imgloading ? "Uploading.." : "Upload"}
                                                </button>
                                            </div>
                                            <div className='grid grid-cols-2 gap-4 my-1'>
                                                {
                                                    formData.photo.length > 0 && formData.photo.map((url, index) => (
                                                        <div key={url} className='flex  border rounded relative'>
                                                            <img src={url} alt='shoes.png' className='w-20 h-20 object-cover rounded-md' />
                                                            <button type='button' onClick={() => handelImgDelete(index)} className='absolute top-0 right-0 p-1 bg-red-500 border border-white text-white rounded-bl'>Delete</button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <button type='submit' disabled={loading || imgloading} className='w-full border p-2 rounded text-green-700 font-bold bg-white border-green-700'>{loading ? "Listing.." : "List Product"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct