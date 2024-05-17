import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {

            const itemIndex = state.cartItems.findIndex(
                item => item._id === action.payload._id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info("Increased product quantity", {
                    theme: "dark",
                    autoClose: 1000,
                    position: 'bottom-center'
                })
            } else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct);
                toast.success("Product Added To Cart", {
                    theme: "dark",
                    autoClose: 1000,
                    position: 'bottom-center'
                })
            }
        },
        removeFromCart(state, action) {
            const nextCatItems = state.cartItems.filter(
                cartItem => cartItem._id !== action.payload._id
            )
            state.cartItems = nextCatItems;
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
                toast.info("Decreased product quantity", {
                    theme: "dark",
                    autoClose: 1000,
                    position: 'bottom-center'
                })
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCatItems = state.cartItems.filter(
                    cartItem => cartItem._id !== action.payload._id
                )
                state.cartItems = nextCatItems;
                toast.info("item Remove From Cart", {
                    theme: "dark",
                    autoClose: 1000,
                    position: 'bottom-center'
                })
            }
        },
        increaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                cartItem => cartItem._id === action.payload._id
            )
            if (state.cartItems[itemIndex].cartQuantity > 0) {
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info("Increased product quantity", {
                    theme: "dark",
                    autoClose: 1000,
                    position: 'bottom-center'
                })
            }
        },
        clearCart(state, action) {
            state.cartItems = [];
            toast.success("Cart Is Cleared", {
                theme: "dark",
                autoClose: 1000,
                position: 'bottom-center'
            })
        },
        getTotalOfCart(state, action) {
            let { total , quantity} = state.cartItems.reduce(
                (cartTotal , cartItem) => {
                const {price , cartQuantity} = cartItem;
                const itemTotal = price * cartQuantity

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            }, {
                total: 0,
                quantity: 0
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const { addToCart, removeFromCart, decreaseCart, increaseCart, clearCart  , getTotalOfCart} = cartSlice.actions;

export default cartSlice.reducer;