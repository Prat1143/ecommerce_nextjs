"use client";
import { apiCall } from '@/utils/api';
import { useState } from 'react';

const ChatPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleQuerySubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResults([]);

        try {
            const response = await apiCall("/chat/query", 'POST', { query });

            if(response?.message) {
                setError(response?.message);
            }

            if (response) {
                setResults(response); 
            }

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Search Products by Query</h1>
            <form onSubmit={handleQuerySubmit} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Eg:- All tops under 10, Get all accessories, Get all accessories under 3"
                    className="border rounded p-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                    Submit
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <div>
                {results.length > 0 ? (
                    <ul>
                        {results.map((item) => (
                            <li key={item._id} className="border p-2 mb-2">
                                <h3 className="font-semibold">{item.title}</h3>
                                <p>SKU: {item.variantSKU}</p>
                                <p>Price: ₹{item.variantPrice}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No results found.</p>
                )}
            </div>
        </div>
    );
};

export default ChatPage;