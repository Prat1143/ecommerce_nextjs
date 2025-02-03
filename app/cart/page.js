"use client";

import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { apiCall } from '@/utils/api';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';

const CartPage = () => {
    const { getTotalItems, updateCartItemQuantity, removeFromCart, getTotalAmount } = useCart();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    
    useEffect(() => {
        fetchCart();
    }, []);
    
    const fetchCart = async () => {
        try {
            const cartData = await apiCall('/cart', 'GET', null, localStorage.getItem('token'));
            setCart(cartData.items);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        console.log("newQuantity-----------",newQuantity);
        if(newQuantity <= 0) {
            handleRemoveItem(itemId);
        } else {
            await updateCartItemQuantity(itemId, newQuantity);
            fetchCart(); 
        }
    };

    const handleRemoveItem = async(itemId) => {
        await removeFromCart(itemId);
        fetchCart();
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <CartItem key={item._id} item={item} fetchCart={fetchCart} onQuantityChange={handleQuantityChange} handleRemoveItem={handleRemoveItem} />
                    ))}
                    <div className="mt-4">
                        <h2 className="text-xl font-semibold">Total: ₹{getTotalAmount().toFixed(2)}</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;