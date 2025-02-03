"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import {apiCall } from '../utils/api';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { token, user } = useAuth();

    // Load cart from local storage on initial load
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');

        if (storedCart && storedCart !== "undefined") {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Update local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const updateCartItemQuantity = async (itemId, quantity) => {
        try {
            if (!user) {
                toast.error('Please login or register to add products to cart.');
                return;
            }
            const response = await apiCall('/cart/update', 'POST', { itemId, quantity }, token);
            const updatedCartItems = response.items.map(cartItem => ({
                _id: cartItem._id,
                itemId: cartItem.item,
                quantity: cartItem.quantity,
                totalCost: cartItem.totalCost,
            }));

            setCart(updatedCartItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const productDetailsAddItem = async (itemId, quantity) => {
        try {
            if (!user) {
                toast.error('Please login or register to add products to cart.');
                return;
            }
            const response = await apiCall('/cart/update', 'POST', { itemId, quantity }, token);
            const updatedCartItems = response.items.map(cartItem => ({
                _id: cartItem._id,
                itemId: cartItem.item,
                quantity: cartItem.quantity,
                totalCost: cartItem.totalCost,
            }));
            toast.success('Item added to cart successfully!');
            setCart(updatedCartItems);
        } catch (error) {
            console.error(error.message);
        }
    };
    
    const removeFromCart = async (itemId) => {
        try {
            const response = await apiCall('/cart/remove', 'POST', { itemId }, token); // Call API to remove item
            
            const updatedCartItems = response.items.map(cartItem => ({
                _id: cartItem._id,
                itemId: cartItem.item,
                quantity: cartItem.quantity,
                totalCost: cartItem.totalCost,
            }));

            if(updatedCartItems.length <=0) {
                localStorage.setItem('cart', JSON.stringify(updatedCartItems));
            }
            setCart(updatedCartItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const getTotalItems = () => {
        if(cart.length <=0) {
            const storedCart = localStorage.getItem('cart');

            if (storedCart && storedCart !== "undefined") {
                let parsedCart = JSON.parse(storedCart);
                return parsedCart.reduce((total, item) => total + item.quantity, 0);
            }
        }
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalAmount = () => {
        if(cart.length <=0) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) {
                let parsedCart = JSON.parse(storedCart);
                return parsedCart.reduce((total, item) => total + item.totalCost, 0);
            }
        }
        return cart.reduce((total, item) => total + item.totalCost, 0);
    };

    const addToCart = async(item) => {
        try {
            if (!user) {
                toast.error('Please login or register to add products to cart.');
                return;
            }
            
            const response = await apiCall('/cart/add', 'POST', {itemId:item?._id, quantity:1}, token); // Call API to add item
            if(response) {
                const updatedCartItems = response.items.map(cartItem => ({
                    _id: cartItem._id,
                    itemId: cartItem.item,
                    quantity: cartItem.quantity,
                    totalCost: cartItem.totalCost,
                }));
                setCart(updatedCartItems);
                toast.success('Item added to cart successfully!');
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    const getProductQuantity = (productId) => {
        const product = cart.find(item => item.itemId === productId || item.item === productId);
        return product ? product.quantity : 0;
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, getTotalItems, getTotalAmount, getProductQuantity, productDetailsAddItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};