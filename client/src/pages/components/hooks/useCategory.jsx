import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useCategory (){
    
    const [categoryes , setCategory] = useState([])
    const [loading ,setLoading] = useState(false);
        //get all cat
        const getAllCategory =async()=>{
            setLoading(true)
            try{
             const res = await axios.get(`/api/category/categoryes`)
             const data = res.data;
             if(data.success === false){
            setLoading(false)
                 toast.error(data.message,{theme:'dark',autoClose:1000})
             }
             setCategory(data.category)
            }catch(error){
            setLoading(false)
             console.log(error);
            }
         }
        useEffect(()=>{
             getAllCategory();
        },[])

  return categoryes
}
