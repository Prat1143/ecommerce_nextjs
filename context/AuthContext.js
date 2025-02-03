"use client";

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            // Assuming you have a way to decode the token to get user info
            const userData = JSON.parse(localStorage.getItem('user')); // Retrieve user data
            setUser(userData);
            setToken(storedToken);
        }
    }, []);

    const login = (userData) => {
        setUser(userData.user);
        setToken(userData.token);
        localStorage.setItem('token', userData.token); // Store token in local storage
        localStorage.setItem('user', JSON.stringify(userData.user)); // Store user data in local storage
        localStorage.setItem('cart', JSON.stringify(userData?.cartData?.items));
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token'); // Clear token from local storage
        localStorage.removeItem('user'); // Clear user data from local storage
        localStorage.setItem('cart', JSON.stringify([]));
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};