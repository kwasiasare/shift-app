import axios from 'axios';

// Base URL for the Cosmos DB connection in Azure Static Web Apps
const API_BASE_URL = 'https://calm-beach-09b2e6d0f.5.azurestaticapps.net/api/cosmos';

export const createShift = async () => {
    return await axios.get(`${API_BASE_URL}/items`);
};

    catch (error) {
        console.error("Error creating shift:", error);
        throw error;
    }
export const readShifts = async (shiftData) => {
    return await axios.post(`${API_BASE_URL}/items`, shiftData);
};

    catch (error) {
        console.error("Error reading shift:", error);
        throw error;
    }
export const updateShift = async (shift) => {
    return await axios.put(`${API_BASE_URL}/items/${id}`, shiftData);
};

     catch (error) {
        console.error("Error updating shift:", error);
        throw error;
    }


export const deleteShift = async (shiftId) => {
    return await axios.delete(`${API_BASE_URL}/items/${id}`);
};
     catch (error) {
        console.error("Error reading shift:", error);
        throw error;
    }
