'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

export default function DoctorSchedulePage() {
  const [days, setDays] = useState([
    { day: 'Monday', active: true, slot: '10:00 AM - 02:00 PM' },
    { day: 'Tuesday', active: true, slot: '10:00 AM - 02:00 PM' },
    { day: 'Wednesday', active: true, slot: '10:00 AM - 02:00 PM' },
    { day: 'Thursday', active: true, slot: '10:00 AM - 02:00 PM' },
    { day: 'Friday', active: true, slot: '10:00 AM - 02:00 PM' },
    { day: 'Saturday', active: false, slot: 'Off' },
    { day: 'Sunday', active: false, slot: 'Off' },
  ]);

  const toggleDay = (index: number) => {
    setDays((prev) =>
      prev.map((d, i) =>
        i === index
          ? { ...d, active: !d.active, slot: !d.active ? '10:00 AM - 02:00 PM' : 'Off' }
          : d
      )
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            My Consultation Availability
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
            Configure weekly working days and OPD timing slots.
          </Typography>
        </Box>

        <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', p: { xs: 2.5, sm: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 2 }}>
            Weekly OPD Schedule
          </Typography>
          <Divider sx={{ borderColor: '#334155', mb: 3 }} />

          <Stack spacing={2}>
            {days.map((item, idx) => (
              <Box
                key={item.day}
                sx={{
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  bgcolor: '#0F172A',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={item.active}
                      onChange={() => toggleDay(idx)}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': { color: '#83C5BE' },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#006D77' },
                      }}
                    />
                  }
                  label={
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                      {item.day}
                    </Typography>
                  }
                />
                <Typography variant="body2" sx={{ fontWeight: 600, color: item.active ? '#83C5BE' : '#64748B' }}>
                  {item.slot}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              disableElevation
              onClick={() => alert('Schedule saved!')}
              startIcon={<SaveOutlined />}
              sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3, borderRadius: '10px' }}
            >
              Save Schedule
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}