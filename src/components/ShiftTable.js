import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShiftTable = ({ shifts, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Shift ID</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Map Staff</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Original Message</TableCell>
                        <TableCell>Date Received</TableCell>
                        <TableCell>Time Received</TableCell>
                        <TableCell>Coordinator</TableCell>
                        <TableCell>Assigned To</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shifts.map((shift, index) => (
                        <TableRow key={shift.shiftId}>
                            <TableCell>{shift.shiftId}</TableCell>
                            <TableCell>{shift.location}</TableCell>
                            <TableCell>{shift.date}</TableCell>
                            <TableCell>{shift.startTime}</TableCell>
                            <TableCell>{shift.endTime}</TableCell>
                            <TableCell>{shift.mapStaff}</TableCell>
                            <TableCell>{shift.gender}</TableCell>
                            <TableCell>{shift.originalMessage}</TableCell>
                            <TableCell>{shift.dateReceived}</TableCell>
                            <TableCell>{shift.timeReceived}</TableCell>
                            <TableCell>{shift.coordinator}</TableCell>
                            <TableCell>{shift.assignedTo}</TableCell>
                            <TableCell>{shift.status}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(index)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(index)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ShiftTable;
