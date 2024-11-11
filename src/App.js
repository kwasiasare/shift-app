import React, { useState } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
    const [shifts, setShifts] = useState([]);
    const [currentShift, setCurrentShift] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    // Handle adding a new shift
    const handleAddShift = (newShift) => {
        const shiftWithId = {
            ...newShift,
            shiftId: uuidv4(),
            dateReceived: new Date().toLocaleDateString(),
            timeReceived: new Date().toLocaleTimeString()
        };

        setShifts([...shifts, shiftWithId]);
    };

    // Enter edit mode with the selected shift
    const handleEditShift = (index) => {
        setCurrentShift(shifts[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    // Handle updating an existing shift
    const handleUpdateShift = (updatedShift) => {
        const updatedShifts = shifts.map((shift, index) =>
            index === editIndex ? { ...updatedShift, shiftId: shifts[editIndex].shiftId } : shift
        );
        setShifts(updatedShifts);
        resetForm(); // Reset form after updating
    };
 
    const handleDeleteShift = (index) => {
        const updatedShifts = shifts.filter((_, i) => i !== index);
        setShifts(updatedShifts);
    };
 
    // Reset form state to add mode
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
        </Container>
    );
};

export default App;
