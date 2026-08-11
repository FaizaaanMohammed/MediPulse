'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Typography,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface NewBookingModalProps {
  open: boolean;
  onClose: () => void;
  onAddBooking: (bookingData: any) => void;
}

export default function NewBookingModal({ open, onClose, onAddBooking }: NewBookingModalProps) {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('Dr. A. K. Roy');
  const [date, setDate] = useState('2026-08-11');
  const [timeSlot, setTimeSlot] = useState('10:30 AM');
  const [type, setType] = useState('General Checkup');

  const dialogSx = {
    bgcolor: '#1E293B',
    color: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #334155',
  };

  const inputStyle = {
    color: '#FFFFFF',
    bgcolor: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
  };

  const handleSubmit = () => {
    if (!patientName.trim()) return;

    onAddBooking({
      id: `APT-${Math.floor(100 + Math.random() * 900)}`,
      patientName,
      doctorName,
      date,
      timeSlot,
      status: 'Waiting',
      type,
    });

    setPatientName('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogSx }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          New Appointment Booking
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Patient Name"
            placeholder="e.g. Ramesh Kumar"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />

          <TextField
            fullWidth
            select
            label="Select Doctor"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          >
            <MenuItem value="Dr. A. K. Roy">Dr. A. K. Roy (General Physician)</MenuItem>
            <MenuItem value="Dr. Sneha Das">Dr. Sneha Das (Dermatologist)</MenuItem>
            <MenuItem value="Dr. R. N. Mukherjee">Dr. R. N. Mukherjee (Cardiologist)</MenuItem>
            <MenuItem value="Dr. Priya Sharma">Dr. Priya Sharma (Pediatrician)</MenuItem>
          </TextField>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              type="date"
              label="Booking Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true, sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            />
            <TextField
              fullWidth
              select
              label="Time Slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              InputLabelProps={{ sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            >
              <MenuItem value="10:00 AM">10:00 AM</MenuItem>
              <MenuItem value="10:30 AM">10:30 AM</MenuItem>
              <MenuItem value="11:30 AM">11:30 AM</MenuItem>
              <MenuItem value="02:00 PM">02:00 PM</MenuItem>
              <MenuItem value="04:30 PM">04:30 PM</MenuItem>
            </TextField>
          </Stack>

          <TextField
            fullWidth
            select
            label="Visit Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          >
            <MenuItem value="General Checkup">General Checkup</MenuItem>
            <MenuItem value="Follow Up">Follow Up</MenuItem>
            <MenuItem value="Emergency / OPD">Emergency / OPD</MenuItem>
            <MenuItem value="Consultation">Consultation</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: '#94A3B8' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3 }}
        >
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
}