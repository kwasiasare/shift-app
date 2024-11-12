import React, { useState, useEffect } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'; // Import global styles
import { createShift, readShifts, updateShift, deleteShift } from './api';

// Custom sea-blue theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#00796b', // Sea-blue for primary buttons
        },
        secondary: {
            main: '#004d40', // Darker sea-blue for secondary actions
        },
        background: {
            default: '#e0f7fa', // Light sea-blue background color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

const App = () => {
    const [shifts, setShifts] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null); // To store the index of the shift to delete
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sequence, setSequence] = useState(1);

    // Function to generate the custom ID in "yyyymmdd-xxx" format
    const generateCustomId = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedSequence = String(sequence).padStart(3, '0');
        
        setSequence(sequence + 1);
        
        return `${year}${month}${day}-${formattedSequence}`;
    };

     // Fetch shifts from the database on component mount
    useEffect(() => {
        const fetchShifts = async () => {
            try {
                const data = await readShifts();
                setShifts(data);
            } catch (error) {
                console.error("Failed to fetch shifts:", error);
            }
        };
        fetchShifts();
    }, []);

    // Example usage (if needed for a specific feature)
    const fetchShiftById = async (id) => {
        try {
            const shift = await getShiftById(id);
            setCurrentShift(shift);
        } catch (error) {
            console.error("Failed to fetch shift by ID:", error);
        }
    };


    // Handler to add a new shift
    const handleAddShift = async (newShift) => {
        try {
            const shiftWithId = {
                ...newShift,
                shiftId: generateCustomId(),
                dateReceived: new Date().toLocaleDateString(),
                timeReceived: new Date().toLocaleTimeString()
            };

            const addedShift = await createShift(shiftWithId);
            setShifts([...shifts, addedShift]);
            resetForm(); // Reset form after adding a shift
        } catch (error) {
            console.error("Failed to add shift:", error);
        }
    };

    // Handler to set current shift for editing
    const handleEditShift = (index) => {
        setCurrentShift(shifts[index]);
        setIsEditing(true);
    };

    // Handler to update an existing shift
    const handleUpdateShift = async (shiftId, updatedShiftData) => {
        try {
            const updatedShift = await updateShift(shiftId, updatedShiftData);
            setShifts(shifts.map(shift => (shift.shiftId === shiftId ? updatedShift : shift)));
            resetForm(); // Reset form after updating a shift
        } catch (error) {
            console.error("Failed to update shift:", error);
        }
    };

    // Handler to prompt delete confirmation
    const handleDeleteShift = (shiftId) => {
        setDeleteIndex(shiftId); // Store shiftId to confirm deletion
        setIsDialogOpen(true); // Open confirmation dialog
    };

    const confirmDelete = async () => {
        try {
            await deleteShift(deleteIndex); // Perform delete
            setShifts(shifts.filter(shift => shift.shiftId !== deleteIndex));
        } catch (error) {
            console.error("Failed to delete shift:", error);
        }
        setIsDialogOpen(false); // Close the dialog
        setDeleteIndex(null); // Reset deleteIndex
    };

    const cancelDelete = () => {
        setIsDialogOpen(false); // Close the dialog without deleting
        setDeleteIndex(null); // Reset deleteIndex
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentShift(null);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h4" align="center" gutterBottom>
                    Shift Management
                </Typography>
                <ShiftForm
                    onAddShift={handleAddShift}
                    currentShift={currentShift}
                    isEditing={isEditing}
                    onUpdateShift={handleUpdateShift}
                />
                <ShiftTable
                    shifts={shifts}
                    onEdit={handleEditShift}
                    onDelete={handleDeleteShift}
                />

                {/* Confirmation Dialog */}
                <Dialog open={isDialogOpen} onClose={cancelDelete}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this shift?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={confirmDelete} color="secondary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </ThemeProvider>
    );
};

export default App;
