import React, { useState } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [shifts, setShifts] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [deleteIndex, setDeleteIndex] = useState(null); // To store the index of the shift to delete
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To manage dialog open state

    const handleAddShift = (newShift) => {
        const shiftWithId = {
            ...newShift,
            shiftId: uuidv4(),
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
    );
};

export default App;
