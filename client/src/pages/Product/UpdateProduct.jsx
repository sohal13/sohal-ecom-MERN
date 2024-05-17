import React, { useEffect, useState } from 'react'
import { app } from '../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'
import { BsCurrencyRupee } from 'react-icons/bs'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


const UpdateProduct = () => {

    const { currentUser } = useSelector(state => state.user)
    const navigate = useNavigate();
    const prmsid = useParams()

    const [category, setCategory] = useState([]);
    const [file, setFile] = useState([])
    const [formData, setFormData] = useState({});
    const [updatedData , setUpdatedData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [photoError, setphotoError] = useState(false)
    console.log(formData);


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



    useEffect(() => {
        const getListData = async () => {
            const slug = prmsid.slug
            const Listing = await axios.get(`/api/product/get/${slug}`)
            const data = await Listing.data;
            if (data.succcess === false) {
                console.log(data.error);
            }
            setFormData(data?.product)

        }
        getListData()
    }, [])

    const handelphotoSubmit = () => {
        if (file.length > 0 && file.length + formData.photo.length < 7) {

            setLoading(true);
            setphotoError(false);
            const promise = [];

            for (let i = 0; i < file.length; i++) {
                promise.push(storephoto(file[i]));
            }
            Promise.all(promise).then((urls) => {
                setUpdatedData({
                    ...updatedData, photo: formData.photo.concat(urls)
                });
                setphotoError(false);
                setLoading(false)

            }).catch((error) => {
                setphotoError("photo upload failed (2 mb max per photos)")
                console.log(error);
                setLoading(false)
            })
        } else {
            setphotoError("Select an photo/You can Only upload up to 6 iamges")
            setLoading(false);
        }

    }



    const storephoto = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const filename = new Date().getTime() + file.name;
            const storageRef = ref(storage, filename)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`uploded ${process}`);
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            resolve(downloadURL)
                        });
                }
            )
        })
    }

    const handelphotoDelete = (index) => {
        setFormData({
            ...formData,
            photo: formData.photo.filter((_, i) => i !== index)
        });
    };

    const handelChange = (e) => {
        setUpdatedData({
            ...updatedData, [e.target.id]: e.target.value,
        })
    }
console.log("Data =",updatedData);
    const handelUploadData = async (e) => {
        e.preventDefault();
        try {
            if (formData.photo.length < 1) return setphotoError("you must upload at list 1 photo")
            if (formData.price < formData.discountprice) return setphotoError("discount price must be lower then price")
            setLoading(true);
            setphotoError(false)
            const res = await axios.put(`/api/product/update/${formData._id}`, {
                ...updatedData,
            })
            const data = await res.data;

            if (data.succcess === false) {
                setphotoError(data.message)
            }
            setLoading(false)
            navigate(`/showlisting/${data.product._id}`)
        } catch (error) {
            setLoading(false)
            console.log(error);
            setphotoError(error.message)
        }

    }

    return (
        <div className='max-w-[98%] mx-auto p-3 flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold text-center my-7'>Edit Your Listing Property</h1>
            <div className='flex flex-col  bg-blue-700 md:w-[65%] w-full rounded-md p-2'>
            <form onSubmit={handelUploadData} className='flex flex-col sm:flex-row gap-4 justify-between'>
                <div className=' flex flex-col gap-3 flex-1'>
                    <input
                        type='text'
                        placeholder='Name..'
                        id="name"
                        className='py-3 rounded-lg px-3'
                        required
                        onChange={handelChange}
                        defaultValue={formData?.name}
                    />
                    <textarea
                        type='text'
                        placeholder='Description..'
                        id="description"
                        className='py-3 rounded-lg px-3'
                        required
                        rows={6}
                        onChange={handelChange}
                        defaultValue={formData.description}
                    />

                    <div className='flex gap-2'>
                        <label className='flex text-xl'>Prise in RS ₹</label>
                        <input
                            type='number'
                            id='price'
                            className='py-3 rounded w-full'
                            required
                            onChange={handelChange}
                            defaultValue={formData.price}
                        />
                    </div>
                    <div className='flex gap-2 '>
                        <label className='text-xl'>Quantity </label>
                        <input
                            type='number'
                            id='quantity'
                            className=' rounded-lg  py-3 w-full'
                            required
                            onChange={handelChange}
                            defaultValue={formData.quantity}
                        />
                    </div>
        
                        <div className='flex gap-1 '>
                        <label className='text-xl'>Category </label>
                            <select key={"1"} id='category' onChange={handelChange} defaultValue={formData?.category} className='w-full rounded-md py-3'>
                                <option defaultValue=''>{formData?.category?.name}</option>
                                {category?.map((c) => (
                                    <option key={c._id} defaultValue={c._id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex gap-1'>
                        <label className='text-xl'>Shipping </label>
                                        <select key={"1"} id='shipping' onChange={handelChange} defaultValue={formData?.shipping } className='w-full rounded-md py-3'>
                                                <option defaultValue=''>Shipping</option>
                                                    <option key={1} defaultValue={true}>
                                                      true
                                                    </option>
                                                   <option key={0} defaultValue={false}>
                                                      false
                                                    </option>
                                            </select>
                                        </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='font-bold'>photo:<span className='font-thin'>The First photo will be the cover (max 6)</span></p>
                    <div className='flex flex-row justify-between gap-2'>
                        <input
                            multiple
                            onChange={(e) => setFile(e.target.files)}
                            type='file'
                            id='photo'
                            accept='photo/*'
                            className='p-3 border border-gray-700 rounded-lg w-full' />
                        <button
                            type='button'
                            disabled={loading}
                            onClick={handelphotoSubmit}
                            className='border-spacing-7 border bg-green-400 rounded-lg text-[15px] text-gray-700 px-2 hover:scale-105 hover:bg-green-600'>
                            {loading ? "Uploading..." : "upload"}</button>
                    </div>
                    {
                        formData?.photo?.length > 0 && formData?.photo.map((url, index) => (
                            <div className='flex w-full justify-between px-3 border border-gray-300 rounded-lg py-1'
                                key={index}>
                                <img
                                    className='h-20 w-32 self-center object-center rounded-sm'
                                    src={url} alt='listphoto.jpg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handelphotoDelete(index)}
                                    className='bg-red-500 h-10 px-4 self-center rounded-lg capitalize'>DELETE</button>
                            </div>

                        ))
                    }
                    <p className='text-red-600 text-sm'>{photoError && photoError}</p>
                    <button
                        type='submit'
                        className='bg-green-500 rounded-lg py-2 text-white hover:scale-105' >{loading ? "Updating..." : "Update Property"}</button>

                </div>
            </form>
            </div>
        </div>
    )
}

export default UpdateProduct