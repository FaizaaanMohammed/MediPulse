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

interface AddPatientModalProps {
  open: boolean;
  onClose: () => void;
  onAddPatient: (patientData: any) => void;
}

export default function AddPatientModal({ open, onClose, onAddPatient }: AddPatientModalProps) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');

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
    if (!name.trim()) return;

    onAddPatient({
      id: `PAT-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      age: `${age} Yrs`,
      gender,
      phone,
      bloodGroup,
      totalVisits: 1,
      lastVisit: '11 Aug 2026',
    });

    setName('');
    setAge('');
    setPhone('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogSx }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          Register New Patient
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Full Name"
            placeholder="e.g. Ankit Roy"
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputLabelProps={{ sx: { color: '#94A3B8' } }}
            InputProps={{ sx: inputStyle }}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Age"
              placeholder="e.g. 28"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              InputLabelProps={{ sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            />
            <TextField
              fullWidth
              select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              InputLabelProps={{ sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Phone Number"
              placeholder="+91 98765 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            />
            <TextField
              fullWidth
              select
              label="Blood Group"
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              InputLabelProps={{ sx: { color: '#94A3B8' } }}
              InputProps={{ sx: inputStyle }}
            >
              <MenuItem value="A+">A+</MenuItem>
              <MenuItem value="A-">A-</MenuItem>
              <MenuItem value="B+">B+</MenuItem>
              <MenuItem value="B-">B-</MenuItem>
              <MenuItem value="O+">O+</MenuItem>
              <MenuItem value="O-">O-</MenuItem>
              <MenuItem value="AB+">AB+</MenuItem>
            </TextField>
          </Stack>
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
          Save Patient
        </Button>
      </DialogActions>
    </Dialog>
  );
}