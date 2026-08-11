'use client';
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
  Avatar,
  Chip,
  Button,
} from '@mui/material';

export default function RecentClinicsTable() {
  const recentClinics = [
    { name: 'City Health Medicare', location: 'Park Street, Kolkata', plan: 'Enterprise SaaS', status: 'Active', onboarded: '10 Aug, 2026', doctors: 14 },
    { name: 'Apollo Care OPD Hub', location: 'Salt Lake, Kolkata', plan: 'Pro Monthly', status: 'Active', onboarded: '08 Aug, 2026', doctors: 22 },
    { name: 'Apex Ortho Specialty', location: 'New Town, Kolkata', plan: 'Basic Starter', status: 'Trial', onboarded: '04 Aug, 2026', doctors: 6 },
    { name: 'Woodlands Multi-Care', location: 'Alipore, Kolkata', plan: 'Enterprise SaaS', status: 'Active', onboarded: '28 Jul, 2026', doctors: 30 },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF' }}>
          Recently Onboarded Clinics & Tenants
        </Typography>
        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>
          Active clinic subscriptions and assigned doctor capacities
        </Typography>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ '& th': { borderBottom: '1px solid rgba(255, 255, 255, 0.15)', fontWeight: 800, color: '#94A3B8' } }}>
              <TableCell sx={{ color: '#94A3B8' }}>Clinic Name</TableCell>
              <TableCell sx={{ color: '#94A3B8' }}>Location</TableCell>
              <TableCell sx={{ color: '#94A3B8' }}>SaaS Plan</TableCell>
              <TableCell sx={{ color: '#94A3B8' }}>Doctors Panel</TableCell>
              <TableCell sx={{ color: '#94A3B8' }}>Onboarded Date</TableCell>
              <TableCell sx={{ color: '#94A3B8' }}>Status</TableCell>
              <TableCell align="right" sx={{ color: '#94A3B8' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentClinics.map((row) => (
              <TableRow key={row.name} hover sx={{ '& td': { borderBottom: '1px solid rgba(255, 255, 255, 0.08)' } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: '#006D77', color: '#83C5BE', fontWeight: 900, width: 38, height: 38, fontSize: '0.9rem' }}>
                      {row.name.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                      {row.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#CBD5E1' }}>{row.location}</TableCell>
                <TableCell>
                  <Chip label={row.plan} size="small" sx={{ bgcolor: 'rgba(131, 197, 190, 0.15)', color: '#83C5BE', fontWeight: 800, fontSize: '0.72rem' }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>{row.doctors} Doctors</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#CBD5E1' }}>{row.onboarded}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.status === 'Active' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                      color: row.status === 'Active' ? '#34D399' : '#FBBF24',
                      fontWeight: 800,
                      fontSize: '0.72rem',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Button size="small" sx={{ color: '#83C5BE', fontWeight: 800, textTransform: 'none' }}>
                    Manage
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}