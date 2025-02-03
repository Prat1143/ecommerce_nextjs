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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">{isLogin ? 'Login' : 'Register'}</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {!isLogin && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        />
                    </div>
                )}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>

                <div className="mt-4 text-center text-sm">
                    {isLogin ? (
                        <span>
                            Don't have an account?{' '}
                            <button
                                onClick={() => router.push('/auth/register')}
                                className="text-blue-600 hover:underline"
                            >
                                Register here
                            </button>
                        </span>
                    ) : (
                        <span>
                            Already have an account?{' '}
                            <button
                                onClick={() => router.push('/auth/login')}
                                className="text-blue-600 hover:underline"
                            >
                                Login here
                            </button>
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
