"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '@/utils/api';
import { useCart } from '@/context/CartContext';
import { use } from "react";
import { toast } from 'react-toastify';

const ProductDetailsPage = ({params}) => {
    const { id } = use(params);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const { productDetailsAddItem, getProductQuantity } = useCart();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                const response = await apiCall(`/items/getProductDetails/${id}`);
                setProduct(response);
                const cartQuantity = getProductQuantity(response._id);
                setQuantity(cartQuantity >= 0 ? cartQuantity : 1);
            };

            fetchProduct();
        }
    }, [id, getProductQuantity]);

    const handleAddToCart = () => {
        if(quantity>0) {
            productDetailsAddItem( product?._id, quantity);
        }
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-14">
                <img src={product.imageSrc} alt={product.title} className="w-full md:w-1/3 h-auto rounded-lg" />
                <div className="md:ml-4 mt-4 md:mt-0">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="text-gray-600 mt-2">{product.body}</p>
                    <p className="text-xl font-bold mt-4">₹{product.variantPrice?.toFixed(2)}</p>
                    <div className="flex items-center mt-4">
                        <button onClick={decreaseQuantity} className="bg-gray-300 px-2 py-1 rounded-l">-</button>
                        <span className="mx-2">{quantity}</span>
                        <button onClick={increaseQuantity} className="bg-gray-300 px-2 py-1 rounded-r">+</button>
                    </div>
                    <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;