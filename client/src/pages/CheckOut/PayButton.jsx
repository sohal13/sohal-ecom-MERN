import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const PayButton = ({cartItems}) => {

    const {currentUser} = useSelector(state => state.user)

    const [loading , setLoading] = useState(false)

    const handelCheckOut=async()=>{
        setLoading(true)
        try {
            const res = await axios.post(`/api/stripe/create-checkout-session`,{
                cartItems,
                userId: currentUser._id
            })
            const data = res.data;
            console.log(res);
            if(data.url){
                setLoading(false)
                window.location.href = data.url
            }else{
                setLoading(false)
                console.log("Error");
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
       
    }

  return (
    <div>
        <h1 onClick={()=> handelCheckOut()}>{loading ? "Loading.." : "Check Out"}</h1>
    </div>
  )
}

export default PayButton