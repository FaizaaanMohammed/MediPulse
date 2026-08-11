'use client';
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

export default function ClinicProfileForm() {
  const [clinicName, setClinicName] = useState('City Health Clinic');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('contact@cityhealthclinic.com');
  const [address, setAddress] = useState('12/A Park Street, Kolkata, WB');
  const [openingTime, setOpeningTime] = useState('09:00 AM');
  const [closingTime, setClosingTime] = useState('08:00 PM');

  const inputStyle = {
    color: '#FFFFFF',
    bgcolor: '#0F172A',
    borderRadius: '12px',
    '& fieldset': { borderColor: '#334155' },
    '&:hover fieldset': { borderColor: '#83C5BE' },
  };

  const handleSave = () => {
    alert('Clinic details updated successfully!');
  };

  return (
    <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', p: { xs: 2.5, sm: 3.5 } }}>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
        Clinic Profile & Operating Details
      </Typography>
      <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3 }}>
        Update public clinic information visible to patients during slot booking.
      </Typography>

      <Divider sx={{ borderColor: '#334155', mb: 3 }} />

      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Clinic Name"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Support Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Opening Time"
              value={openingTime}
              onChange={(e) => setOpeningTime(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} size={{sm:6,xs:12}}>
            <TextField
              fullWidth
              label="Closing Time"
              value={closingTime}
              onChange={(e) => setClosingTime(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
          <Button
            variant="contained"
            disableElevation
            onClick={handleSave}
            startIcon={<SaveOutlined />}
            sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3, borderRadius: '10px' }}
          >
            Save Changes
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}