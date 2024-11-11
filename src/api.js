import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

// GET: Fetch data
export const getData = async () => {
    return await axios.get(`${API_BASE_URL}/items`);
};

// POST: Create data
export const createData = async (data) => {
    return await axios.post(`${API_BASE_URL}/items`, data);
};

// PUT: Update data
export const updateData = async (id, data) => {
    return await axios.put(`${API_BASE_URL}/items/${id}`, data);
};

// DELETE: Delete data
export const deleteData = async (id) => {
    return await axios.delete(`${API_BASE_URL}/items/${id}`);
};