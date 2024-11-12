import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

export const createShift = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/items`);
        return response.data;
    } catch (error) {
        console.error("Error fetching shifts:", error);
        throw error;
    }
};

export const readShifts = async (shiftData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/items`, shiftData);
        return response.data;
    } catch (error) {
        console.error("Error adding shift:", error);
        throw error;
    }
};

export const updateShift = async (shiftId, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/items/${shiftId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating shift:", error);
        throw error;
    }
};

export const deleteShift = async (shiftId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/items/${shiftId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting shift:", error);
        throw error;
    }
};