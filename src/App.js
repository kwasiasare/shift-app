import React, { useState, useEffect } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';
import { createShift, readShifts, updateShift, deleteShift } from './api';

const theme = createTheme({
    palette: {
        primary: { main: '#00796b' },
        secondary: { main: '#004d40' },
        background: { default: '#e0f7fa' },
    },
    typography: { fontFamily: 'Roboto, sans-serif' },
});

const App = () => {
    const [shifts, setShifts] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [sequence, setSequence] = useState(1);

    const generateCustomId = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedSequence = String(sequence).padStart(3, '0');
        
        setSequence(sequence + 1);
        
        return `${year}${month}${day}-${formattedSequence}`;
    };

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
            resetForm();  // Reset form after adding a new shift
        } catch (error) {
            console.error("Failed to add shift:", error);
        }
    };

    const handleEditShift = (index) => {
        setCurrentShift(shifts[index]);
        setIsEditing(true);
    };

    const handleUpdateShift = async (shiftId, updatedShiftData) => {
        try {
            const updatedShift = await updateShift(shiftId, updatedShiftData);
            setShifts(shifts.map(shift => (shift.shiftId === shiftId ? updatedShift : shift)));
            resetForm();  // Reset form after updating a shift
        } catch (error) {
            console.error("Failed to update shift:", error);
        }
    };

    const handleDeleteShift = async (shiftId) => {
        try {
            await deleteShift(shiftId);
            setShifts(shifts.filter(shift => shift.shiftId !== shiftId));
        } catch (error) {
            console.error("Failed to delete shift:", error);
        }
    };

    const confirmDelete = () => {
        const updatedShifts = shifts.filter((_, i) => i !== deleteIndex);
        setShifts(updatedShifts);
        setIsDialogOpen(false);
        setDeleteIndex(null);
    };

    const cancelDelete = () => {
        setIsDialogOpen(false);
        setDeleteIndex(null);
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
