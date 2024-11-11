import React, { useState } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID function

const App = () => {
    const [shifts, setShifts] = useState([]);

    const handleAddShift = (newShift) => {
        // Generate a UUID for the new shift
        const shiftWithId = {
            ...newShift,
            shiftId: uuidv4() // Add a unique ID
        };

        setShifts([...shifts, shiftWithId]);
    };

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Shift Management
            </Typography>
            <ShiftForm onAddShift={handleAddShift} />
            <ShiftTable shifts={shifts} />
        </Container>
    );
};

export default App;

