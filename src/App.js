import React, { useState } from 'react';
import ShiftForm from './components/ShiftForm';
import ShiftTable from './components/ShiftTable';
import { Container, Typography } from '@mui/material';

const App = () => {
    const [shifts, setShifts] = useState([]);

    const handleAddShift = (newShift) => {
        setShifts([...shifts, newShift]);
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
