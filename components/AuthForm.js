"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiCall } from '../utils/api';
import { useRouter } from 'next/navigation';

const AuthForm = ({ isLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/'); // Redirect to home page if user is logged in
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const url = isLogin ? '/auth/login' : '/auth/signup'; // Define the endpoint
        const body = isLogin ? { email, password } : { email, password, name };
        try {
            const response = await apiCall(url, 'POST', { ...body }); // Use the apiCall function
            console.log("url---------", response)

            if (isLogin) {
                login(response); // Store user data and token in context
                console.log('Login successful:', response);
                router.push('/');
            } else {
                login(response);
                console.log('Registration successfu-----l',response);
                router.push('/');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-lg font-bold">{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p className="text-red-500">{error}</p>}
            {!isLogin && (
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border rounded p-2 w-full"
                    />
                </div>
            )}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                {isLogin ? 'Login' : 'Register'}
            </button>
        </form>
    );
};

export default AuthForm;