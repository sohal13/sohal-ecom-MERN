import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../../firebase'
import { toast } from 'react-toastify';

const UpdateCategory = () => {

    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const { slug } = useParams();
    const [category, setCatgeory] = useState();
    const [file, setFile] = useState(undefined);
    const [formData, setFormData] = useState({});
    const [fileper ,setFileper]=useState(0);
    const [fileError ,setFileError]=useState(false);

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

    const getThisCatgeory = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/category/${slug}`)
            const data = res.data;
            setCatgeory(data?.category)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getThisCatgeory();
    }, [])

    const handelChnage = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handelSubmit=async(e)=>{
        e.preventDefault()
        try {
            const res = await axios.put(`${API_BASE_URL}/category/update/${category._id}`,formData)
            const data = res.data;
            if (data.success === false) {
                toast.error(data.message, { theme: 'dark', autoClose: 1000 })
            }
            toast.success(data.message, { theme: 'dark', autoClose: 1000 })
            navigate(`/dashbord/admin/create-category`)
        } catch (error) {
            console.log(error);
        }
    }
console.log(category);
console.log(formData);
    console.log(category);
    return (
        <Layout>
            <div className='md:max-w-[90%] mx-auto p-4'>
                <h1 className='text-2xl font-bold'>Update This Catgeory</h1>
                <form onSubmit={handelSubmit}  className='p-4 flex flex-col gap-2 md:items-start '>
                    <label className='font-bold'>
                        Click on image to Update {fileper}%
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type='file' 
                        hidden
                        accept='image/*' />
                    <img
                        className='h-40 w-full p-2 cursor-pointer rounded object-contain border border-black hover:scale-105'
                        src={formData?.photo || category?.photo} alt='avtar.jpg'
                    />
                    </label>
                
                        <input type='text' id='name' className='p-2 border border-black rounded' onChange={handelChnage} defaultValue={category?.name} />
<button className='bg-green-600 p-2 rounded '>Update</button>
                </form>
            </div>

        </Layout>

    )
}

export default UpdateCategory