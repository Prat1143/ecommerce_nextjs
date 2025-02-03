const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const apiCall = async (endpoint, method = 'GET', body = null, token = null) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    // If a token is provided, add it to the headers
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
        method,
        headers,
    };

    // If the method is POST or PUT, add the body
    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, options);
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        // If the response is a GET request, return the JSON data
        if (method === 'GET') {
            return await response.json();
        }

        if (method === 'POST') {
            return await response.json(); // Return the response data for POST
        }

        // For POST, PUT, DELETE, return the response status
        return response.status;
    } catch (error) {
        console.error('API call error:', error);
        throw error; // Rethrow the error for further handling
    }
};