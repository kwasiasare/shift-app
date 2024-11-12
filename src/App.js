import React, { useState } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css'; // Import global styles

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
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null); // To store the index of the shift to delete
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To manage dialog open state
    const [sequence, setSequence] = useState(1); // To track the sequence number

    // Function to generate the custom ID in "yyyymmdd-xxx" format
    const generateCustomId = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so we add 1
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        // Format the sequential number to always be 3 digits (e.g., 001, 002)
        const formattedSequence = String(sequence).padStart(3, '0');
        
        // Combine date and sequence to form the ID
        const customId = `${year}${month}${day}-${formattedSequence}`;
        
        // Update sequence for the next ID
        setSequence(sequence + 1);
        
        return customId;
    };
       
    const handleAddShift = (newShift) => {
        const shiftWithId = {
            ...newShift,
            shiftId: generateCustomId(),
            dateReceived: new Date().toLocaleDateString(),
            timeReceived: new Date().toLocaleTimeString()
        };

        setShifts([...shifts, shiftWithId]);
    };

    const handleEditShift = (index) => {
        setCurrentShift(shifts[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleUpdateShift = (updatedShift) => {
        const updatedShifts = shifts.map((shift, index) =>
            index === editIndex ? { ...updatedShift, shiftId: shifts[editIndex].shiftId } : shift
        );
        setShifts(updatedShifts);
        resetForm();
    };

    const handleDeleteShift = (index) => {
        setDeleteIndex(index);
        setIsDialogOpen(true);
    };

    // Function to confirm and delete the shift
    const confirmDelete = () => {
        const updatedShifts = shifts.filter((_, i) => i !== deleteIndex);
        setShifts(updatedShifts);
        setIsDialogOpen(false); // Close the dialog
        setDeleteIndex(null); // Reset deleteIndex
    };

    // Function to cancel delete action
    const cancelDelete = () => {
        setIsDialogOpen(false); // Close the dialog without deleting
        setDeleteIndex(null); // Reset deleteIndex
    };

    const resetForm = () => {
        setIsEditing(false);
        setCurrentShift(null);
        setEditIndex(null);
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