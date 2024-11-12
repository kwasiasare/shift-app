import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

export const createShift = async (shiftData) => {
    try {
        const response = await axios.post('/createShift', shiftData);
        return response.data;
    } catch (error) {
        console.error("Error creating shift:", error);
        throw error;
    }
};

export const readShifts = async () => {
    try {
        const response = await axios.get('/readShifts');
        return response.data;
    } catch (error) {
        console.error("Error reading shifts:", error);
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