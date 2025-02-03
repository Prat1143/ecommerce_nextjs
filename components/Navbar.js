"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { theme } from '../theme';
import { useCart } from '../context/CartContext'; 
import { ShoppingCart } from 'react-feather';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const { getTotalItems, clearCart } = useCart();

    const handleLogout = ()=> {
        clearCart();
        logout();
    }
    
    return (
        <nav className={`bg-${theme.primary} p-4 sticky top-0 z-50 shadow-md`}>
            <div className="flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <Link href="/" className="text-white">My Store</Link>
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
                <div className={`hidden md:flex space-x-4`}>
                    <Link href="/" className="text-white flex items-center">Home</Link>
                    <Link href="/chat" className="text-white flex items-center">QueryDB</Link> 
                    {!user && <Link href="/auth/login" className="text-white flex items-center">Login</Link>}
                    {!user && <Link href="/auth/register" className="text-white flex items-center">Register</Link>}
                    {user && 
                        <Link href="/auth/login" onClick={handleLogout} className="text-white flex items-center">Logout</Link> 
                    }
                    {user && <Link href="/cart" className="text-white flex items-center">
                        <div>
                            <div className="relative flex">
                                <div className="relative inline-block">
                                    <ShoppingCart />
                                    {getTotalItems() > 0 && (
                                        <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full px-1 text-[10px]">
                                            {getTotalItems()} 
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>}
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <Link href="/" className="block text-white">Home</Link>
                    <Link href="/chat" className="text-white flex items-center">QueryDB</Link> 
                    {!user && <Link href="/auth/login" className="block text-white">Login</Link>}
                    {!user && <Link href="/auth/register" className="block text-white">Register</Link>}
                    {user && <Link href="/cart" className="block text-white">Cart</Link>}
                    {user && <button onClick={logout} className="block text-white">Logout</button>}
                    {/* {user && <span>Welcome, {}</span>} */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;