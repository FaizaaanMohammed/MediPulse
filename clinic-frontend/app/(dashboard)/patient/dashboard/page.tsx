'use client';
import React from 'react';
import { Container, Box, Typography, Paper, Stack, Chip, Button } from '@mui/material';
import { CalendarMonthOutlined, DownloadOutlined, CheckCircleOutlined } from '@mui/icons-material';

export default function PatientDashboardPage() {
  const bookings = [
    {
      id: 'APT-1082',
      doctorName: 'Dr. A. K. Roy',
      specialty: 'Cardiology',
      clinic: 'City Health Clinic',
      slotTime: 'Today, 11 Aug • 10:30 AM',
      fee: '₹500',
      status: 'Confirmed',
    },
    {
      id: 'APT-1045',
      doctorName: 'Dr. Sneha Das',
      specialty: 'Dermatology',
      clinic: 'Park Street Medicare',
      slotTime: '02 Aug 2026 • 11:00 AM',
      fee: '₹600',
      status: 'Completed',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
          My OPD Bookings & Health Records
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
          View upcoming consultation tickets and download past e-prescriptions.
        </Typography>
      </Box>

      <Stack spacing={3}>
        {bookings.map((item) => (
          <Paper key={item.id} sx={{ p: 3, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={item.id} size="small" sx={{ bgcolor: 'rgba(0, 109, 119, 0.25)', color: '#83C5BE', fontWeight: 800 }} />
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>{item.clinic}</Typography>
              </Box>
              <Chip
                icon={<CheckCircleOutlined sx={{ fontSize: '14px !important' }} />}
                label={item.status}
                size="small"
                sx={{
                  bgcolor: item.status === 'Confirmed' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(74, 222, 128, 0.15)',
                  color: item.status === 'Confirmed' ? '#FBBF24' : '#4ADE80',
                  fontWeight: 700,
                }}
              />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF' }}>{item.doctorName}</Typography>
            <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 600, display: 'block', mb: 2 }}>{item.specialty}</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid #334155' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthOutlined sx={{ color: '#83C5BE', fontSize: 20 }} />
                <Typography variant="body2" sx={{ color: '#FFF', fontWeight: 600 }}>{item.slotTime}</Typography>
              </Box>

              {item.status === 'Completed' ? (
                <Button size="small" startIcon={<DownloadOutlined />} sx={{ color: '#83C5BE', fontWeight: 700 }}>
                  Download E-Prescription
                </Button>
              ) : (
                <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#4ADE80' }}>Paid {item.fee}</Typography>
              )}
            </Box>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}