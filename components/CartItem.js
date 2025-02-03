"use client"; // This makes the component a client component

import { useCart } from '../context/CartContext';

const CartItem = ({ item, fetchCart, onQuantityChange, handleRemoveItem }) => {
    // console.log("item-------------",item)

    const handleIncrease = () => {
        // updateCartItemQuantity(item?.item?._id, item.quantity + 1); // Increase quantity
        onQuantityChange(item?.item?._id, item.quantity + 1);
        // fetchCart();
    };

    const handleDecrease = () => {
        if (item.quantity >= 0) {
            // updateCartItemQuantity(item?.item?._id, item.quantity - 1); // Decrease quantity
            onQuantityChange(item?.item?._id, item.quantity - 1);
            // fetchCart();
        }
    };

    const handleRemove = () => {
        handleRemoveItem(item?.item?._id);
    };

    return (
        <div className="flex items-center border-b py-4">
            <img src={item?.item?.imageSrc} alt={item?.item?.title} className="h-24 w-24 object-contain mr-4" />
            <div className="flex-grow">
                <h3 className="text-lg font-semibold">{item?.item?.title}</h3>
                <div>
                    <h4>Price: {item?.totalCost.toFixed(2)}</h4>
                </div>
                <div className="flex items-center mt-2">
                    <button onClick={handleDecrease} className="bg-gray-200 px-2 py-1 rounded">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={handleIncrease} className="bg-gray-200 px-2 py-1 rounded">+</button>
                </div>
            </div>
            <button onClick={handleRemove} className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default CartItem;