import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

// Fetch all shifts from Cosmos DB
export const getShifts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching shifts:", error);
        throw error;
    }
};

// Add a new shift to Cosmos DB
export const createShift = async (shiftData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/items`, shiftData);
        return response.data;
    } catch (error) {
        console.error("Error adding shift:", error);
        throw error;
    }
};

// Update an existing shift in Cosmos DB
export const updateShift = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/items/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating shift:", error);
        throw error;
    }
};

// Delete a shift from Cosmos DB
export const deleteShift = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/items/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting shift:", error);
        throw error;
    }
};