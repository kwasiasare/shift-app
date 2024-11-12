import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

// POST: Create a new shift
export const createShift = async (shiftData) => {
    try {
        return await axios.post(`${API_BASE_URL}/items`, shiftData);
    } catch (error) {
        console.error("Error creating shift:", error);
        throw error;
    }
};

// GET: Fetch all shifts (Read operation)
export const readShifts = async () => {
    try {
        return await axios.get(`${API_BASE_URL}/items`);
    } catch (error) {
        console.error("Error reading shifts:", error);
        throw error;
    }
};

// PUT: Update an existing shift
export const updateShift = async (id, shiftData) => {
    try {
        return await axios.put(`${API_BASE_URL}/items/${id}`, shiftData);
    } catch (error) {
        console.error("Error updating shift:", error);
        throw error;
    }
};

// DELETE: Delete a shift
export const deleteShift = async (id) => {
    try {
        return await axios.delete(`${API_BASE_URL}/items/${id}`);
    } catch (error) {
        console.error("Error deleting shift:", error);
        throw error;
    }
};
