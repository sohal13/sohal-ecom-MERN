import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useSelector ,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart, decreaseCart, getTotalOfCart, increaseCart, removeFromCart } from '../../redux/Cart/CartSlice';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import PayButton from '../CheckOut/PayButton';

const Cart = () => {

    const navigate = useNavigate()
    const { cartItems } = useSelector(state => state.cart);
    const { cartTotalAmount } = useSelector(state => state.cart);
    const { currentUser } = useSelector(state => state.user);

    const dispatch = useDispatch();
    
    //remove from cart
    const handelRemoveFromCart=(c)=>{
        dispatch(removeFromCart(c))
    }

    //total
    useEffect(()=>{
        dispatch(getTotalOfCart())
    },[cartItems])

    return (
        <Layout>
            <div className='max-w-[95%] mx-auto'>
                <h1 className='text-2xl font-bold'>Shopping Cart</h1>
          {cartItems.length === 0 && <h1 className='text-red-600'>Your Cart is Currently Empty</h1>}
                <table className='w-full'>
    {cartItems.length > 0 && <thead className='p-2'>
        <tr className='text-2xl text-gray-600'>
            <th className='text-start'>Product</th>
            <th className='text-start'>Price</th>
            <th className='text-start'>Quantity</th>
            <th className='text-start'>Total</th>
        </tr>
    </thead>}
    <tbody className='p'>
    {cartItems?.map((c) => (
        <tr key={c._id} className='border border-gray-600 rounded'>
            <td className='flex p-1 gap-2 flex-col md:flex-row '>
                <img  onClick={()=>navigate(`/product/${c.slug}`)} src={c.photo[0]} className='w-20 h-20 md:w-32 md:h-32 cursor-pointer' alt={c.name} />
                <div className='flex flex-col justify-between'>
                    <span className='text-lg md:text-xl text-gray-700 font-bold'>{c.name.split(' ').slice(0, 3).join(' ')}</span>
                    <button onClick={()=> handelRemoveFromCart(c)} className='bg-red-500 p-1 rounded w-16 md:w-20'>Remove</button>
                </div>
            </td>
            <td className='text-lg md:text-xl font-semibold'>₹{c.price}</td>
            <td className='w-auto'>
                <div className='bg-gray-500 p-1 flex justify-around gap-2 w-24 md:w-36 rounded-lg'>
                    <button onClick={()=>dispatch(decreaseCart(c))} className='text-lg md:text-xl'><FaMinus /></button>
                    <main className='bg-white px-4 py-1 md:px-8 md:py-2'>{c.cartQuantity}</main>
                    <button onClick={()=>dispatch(increaseCart(c))} className='text-lg md:text-2xl '><FaPlus /></button>
                </div>
            </td>
            <td className='text-lg md:text-xl font-semibold'>₹{c.price * c.cartQuantity}</td>
        </tr>
    ))}
</tbody>
</table>

<div className='flex justify-between flex-col gap-4 md:flex-row mt-10'>
    <div className='bg-blue-200 rounded p-2 flex flex-col gap-2'>
<div className='flex justify-between p'>
    <h1 className='text-2xl font-bold'>Subtotal</h1>
    <h1 className='text-2xl'>₹{cartTotalAmount}</h1>
</div>
<h1>texes and Shipping Calculated at CheckOut</h1>
<button className='p-2 bg-green-500 rounded font-bold w-full'>{currentUser ? (<Link><PayButton cartItems={cartItems}/></Link>):(<Link to={'/login'}><h1>Login To Check Out</h1></Link>)}</button>
</div>
<div>
        <button onClick={()=>dispatch(clearCart(cartItems))} className='p-2 bg-red-400 rounded '>Clear Cart</button>
    </div>
</div>
            </div>
        </Layout>

    )
}

export default Cart