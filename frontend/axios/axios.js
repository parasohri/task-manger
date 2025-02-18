 import axios from 'axios';

// Create an instance of axios with custom configuration
export const apiClient = axios.create({
    baseURL: 'https://vercel.com/parasohris-projects/task-manger', // Replace with your API base URL
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' }
});

// Example GET request
 