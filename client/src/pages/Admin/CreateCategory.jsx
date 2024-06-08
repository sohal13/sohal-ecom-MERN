import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import AdminMenu from '../components/pageCmpnt/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { useNavigate } from 'react-router-dom';
const CreateCategory = () => {

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({});
    const [file ,setFile]=useState(undefined);
    const [fileError ,setFileError]=useState(false);
    const [updateUser,setUserUpdate]=useState(null)
    const [fileper ,setFileper]=useState(0);

    useEffect(()=>{
        if(file){
          handelFileUpdate(file);
        }
      },[file])
    
      const handelFileUpdate=(file)=>{
        const storage = getStorage(app);
        const fileName =new Date().getTime() + file.name;
        const storagrRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storagrRef,file);
        
        uploadTask.on('state_changed',
        (snapshot)=>{
          const process = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setFileper(Math.round(process));
        },
        (error)=>{
          setFileError(true)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl)=>{
            setFormData({...formData,
              photo:downloadUrl})
          })
        }
        );
      }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/category/create-category`,formData)
            const data = res.data;
            if (data.success === false) {
                toast.error(data.message, { theme: 'dark', autoClose: 1000 })
            }
            toast.success(data.message, { theme: 'dark', autoClose: 1000 })
            getAllCategory();
        } catch (error) {
            console.log(error);
        }
    }

    const handelChnage = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
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

    //handel Delete Catgeory
    const handelDeleteCategroy = async (c) => {
        try {
            const res = await axios.delete(`/api/category/delete/${c._id}`)
            const data = res.data;
            if (data.success === false) {
                toast.error(data.message, { theme: 'dark', autoClose: 1000 })
            }
            toast.success(data.message, { theme: 'dark', autoClose: 1000 })
            getAllCategory();
        } catch (error) {
            console.log(error);
        }
    }
 
    return (
        <Layout title={"Create Category"}>
            <div className='md:max-w-[95%] mx-auto p-3 m-3'>
                <div className='flex md:flex-row flex-col gap-3'>
                    <div className='md:w-[20%] w-full'>
                        <AdminMenu />
                    </div>
                    <div className='md:w-[75%]'>
                        <div>
                            <h1 className='text-3xl font-bold'>Manage Category</h1>
                            <div className='p-3'>
                                <form onSubmit={handelSubmit} className='flex justify-between p-2 flex-col gap-2'>
                                    <input
                                        onChange={(e) => setFile(e.target.files[0])}
                                        type='file'
                                        accept='image/*' />
                                    <input id='name'
                                    className='w-full p-2 border-none' 
                                    type='text' placeholder='Enter new Category Name' 
                                    onChange={handelChnage} required 
                                    />
                                    <button className='p-2 px-8 rounded bg-green-600 hover:bg-green-800'>Submit</button>
                                </form>
                            </div>
                            <div className='p-4 flex flex-wrap justify-between gap-4'>
                                {category?.map((c) => (
                                    <div key={c._id} className='flex flex-col bg-gray-200 rounded'>
                                        <img src={c?.photo} alt={c.name} className='w-full h-20 object-contain'/>
                                        <h1 className='text-xl font-bold text-center' >{c.name}</h1>
                                        <div className="flex gap-2">
                                            <button onClick={() => navigate(`/dashbord/admin/update-category/${c.slug}`)} className='bg-blue-600 p-1 px-5 text-white rounded hover:bg-blue-800'>Edit</button>
                                            <button onClick={() => handelDeleteCategroy(c)} className='bg-red-500 p-1 px-2 text-white rounded hover:bg-red-800'>Delete</button>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>

    )
}

export default CreateCategory