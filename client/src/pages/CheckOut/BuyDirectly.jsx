import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {toast} from 'react-toastify'

const BuyDirectly = ({directPurchaseItem}) => {

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const {currentUser} = useSelector(state => state.user)
    const [loading , setLoading] = useState(false)

    const handelCheckOut=async()=>{
        setLoading(true)
        try {
            const res = await axios.post(`${API_BASE_URL}/stripe/create-checkout-session`,{
                directPurchaseItem,
                userId: currentUser?._id
            })
            const data = res.data;
            if(data.url){
                setLoading(false)
                window.location.href = data.url
            }else{
                setLoading(false)
                toast.error(data.message);
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
       
    }

  return (
    <div>
        <h1 onClick={()=> handelCheckOut()}>{loading ? "Loading.." : "Buy Now"}</h1>
    </div>
  )
}

export default BuyDirectly