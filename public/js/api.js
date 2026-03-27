// Fetch wrapper functions for REST API endpoints

const apiBaseUrl = 'https://api.example.com'; // Replace with the actual API base URL

async function fetchData(endpoint) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function postData(endpoint, data) {
    const response = await fetch(`${apiBaseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

// Add more REST API functions as needed

export { fetchData, postData };