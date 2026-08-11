'use client';
import React from 'react';
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

interface DoctorFormModalProps {
  open: boolean;
  onClose: () => void;
}

export default function DoctorFormModal({ open, onClose }: DoctorFormModalProps) {
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

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="xs" 
      PaperProps={{ sx: dialogSx }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          Add New Doctor
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Doctor Name"
            placeholder="Dr. John Doe"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />
          <TextField
            fullWidth
            select
            label="Specialization"
            defaultValue="General Physician"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          >
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Pediatrician">Pediatrician</MenuItem>
          </TextField>
          <TextField
            fullWidth
            label="Email Address"
            placeholder="doctor@medipulse.com"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            placeholder="+91 98765 00000"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />
          <TextField
            fullWidth
            label="Experience (e.g. 10 Yrs)"
            placeholder="5 Yrs"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />
          <TextField
            fullWidth
            label="Consultation Fee (₹)"
            placeholder="500"
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: '#94A3B8' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3 }}
        >
          Save Doctor
        </Button>
      </DialogActions>
    </Dialog>
  );
}