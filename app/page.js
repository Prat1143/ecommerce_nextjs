"use client";
import { useEffect, useState } from 'react';
import ItemCard from '../components/ItemCard';
import { useAuth } from '@/context/AuthContext';
import { apiCall } from '@/utils/api';
import { Search } from 'react-feather';

const HomePage = () => {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const fetchItems = async (page, searchQuery) => {
        setLoading(true);
        try {
            const data = await apiCall(`/items?page=${page}&limit=12&query=${searchQuery}`, 'GET');
            setItems(data.items);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(page, searchQuery);
    }, [page]);

    const handleSearch = (e) => {
        e.preventDefault(); // Prevent default form submission
        fetchItems(1, searchQuery); // Fetch items from the first page with the search query
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSearch} className="flex justify-center mb-4">
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
                    className="border border-gray-300 rounded-l px-4 py-2 w-1/2"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a7 7 0 100 14 7 7 0 000-14zm0 0l6 6m-6-6l-6 6" />
                    </svg> */}
                    <Search size="20" />
                </button>
            </form>

            {loading && <p>Loading...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-4 py-2 rounded-l"
                >
                    Previous
                </button>
                <span className="px-4 py-2">{`Page ${page} of ${totalPages}`}</span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-blue-500 text-white px-4 py-2 rounded-r"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;