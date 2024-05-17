import axios from 'axios';
import { useEffect, useState } from 'react'

export default function useCategory (){
    const [categoryes , setCategory] = useState([])

        //get all cat
        const getAllCategory =async()=>{
            try{
             const res = await axios.get(`/api/category/categoryes`)
             const data = res.data;
             if(data.success === false){
                 toast.error(data.message,{theme:'dark',autoClose:1000})
             }
             setCategory(data.category)
            }catch(error){
             console.log(error);
            }
         }
        useEffect(()=>{
             getAllCategory();
        },[])

  return categoryes
}
