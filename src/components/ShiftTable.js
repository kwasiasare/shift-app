import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ShiftTable = ({ shifts, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
                <TableHead>
                    <TableRow style={{ backgroundColor: '#004d40' }}> {/* Dark sea-blue header */}
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Shift ID</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Location</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Date</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Start Time</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>End Time</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Map Staff</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Gender</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Original Message</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Date Received</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Time Received</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Coordinator</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Assigned To</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Status</TableCell>
                        <TableCell style={{ fontWeight: 'bold', color: '#ffffff' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {shifts.map((shift, index) => (
                        <TableRow key={shift.shiftId}>
                            {/* Assuming 'shift' is an object representing a shift entry */}
                            <TableCell>{shift.id}</TableCell> {/* Use the id property in data, but label it as Shift ID */}
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
