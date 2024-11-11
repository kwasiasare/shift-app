import React, { useState, useEffect } from 'react';
import { Grid, TextField, MenuItem, Button, Typography, Container, Paper } from '@mui/material';


const ShiftForm = ({ onAddShift, currentShift, isEditing, onUpdateShift }) => {
    const [shift, setShift] = useState({
        location: '',
        date: '',
        startTime: '',
        endTime: '',
        mapStaff: 'No',
        gender: 'N/a',
        originalMessage: '',
        coordinator: '',
        assignedTo: '',
        status: ''
    });

    // Populate form with current shift data if editing
    useEffect(() => {
        if (isEditing && currentShift) {
            setShift(currentShift);
        }
    }, [isEditing, currentShift]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setShift({ ...shift, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            onUpdateShift(shift);
        } else {
            onAddShift(shift)
        }
        
        // Reset form fields after submission
        setShift({
            location: '',
            date: '',
            startTime: '',
            endTime: '',
            mapStaff: '',
            gender: '',
            originalMessage: '',
            coordinator: '',
            assignedTo: '',
            status: ''
        });
    };

    return (
        <Container component={Paper} elevation={3} style={{ padding: '16px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>{isEditing ? "Edit Shift" : "Add Shift"}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Shift ID"           // Display as Shift ID to users
                            name="id"
                            value={shift.id || ''}      // Store as 'id' in data
                            onChange={handleChange}
                            required                    // Add 'required' if Shift ID is mandatory
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Location"
                            name="location"
                            value={shift.location}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={shift.date}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            name="startTime"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={shift.startTime}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="End Time"
                            name="endTime"
                            type="time"
                            InputLabelProps={{ shrink: true }}
                            value={shift.endTime}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Map Staff"
                            name="mapStaff"
                            value={shift.mapStaff}
                            onChange={handleChange}
                        >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            select
                            label="Gender"
                            name="gender"
                            value={shift.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                            <MenuItem value="N/a">N/a</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Original Message"
                            name="originalMessage"
                            value={shift.originalMessage}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Coordinator"
                            name="coordinator"
                            value={shift.coordinator}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Assigned To"
                            name="assignedTo"
                            value={shift.assignedTo}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            select
                            label="Status"
                            name="status"
                            value={shift.status}
                            onChange={handleChange}
                            required
                        >
                            <MenuItem value="Assigned To Coordinator">Assigned To Coordinator</MenuItem>
                            <MenuItem value="Added to Connecteam">Added to Connecteam</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Shift Completed">Shift Completed</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            {isEditing ? "Update Shift" : "Add Shift"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ShiftForm;
