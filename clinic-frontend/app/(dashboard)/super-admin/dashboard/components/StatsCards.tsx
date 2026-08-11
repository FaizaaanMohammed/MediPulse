'use client';
import React from 'react';
import { Grid, Paper, Box, Typography, Chip } from '@mui/material';
import {
  LocalHospitalOutlined,
  AttachMoneyOutlined,
  PeopleAltOutlined,
  TrendingUpOutlined,
} from '@mui/icons-material';

export default function StatsCards() {
  const stats = [
    {
      title: 'Total Onboarded Clinics',
      value: '42 Clinics',
      growth: '+12% this month',
      icon: <LocalHospitalOutlined />,
      color: '#83C5BE',
      bg: 'rgba(131, 197, 190, 0.12)',
      border: 'rgba(131, 197, 190, 0.3)',
    },
    {
      title: 'Platform Monthly Revenue',
      value: '₹4,85,000',
      growth: '+18.4% MRR',
      icon: <AttachMoneyOutlined />,
      color: '#34D399',
      bg: 'rgba(52, 211, 153, 0.12)',
      border: 'rgba(52, 211, 153, 0.3)',
    },
    {
      title: 'Active Doctors Across Clinics',
      value: '184 Doctors',
      growth: 'Active Panel',
      icon: <PeopleAltOutlined />,
      color: '#60A5FA',
      bg: 'rgba(96, 165, 250, 0.12)',
      border: 'rgba(96, 165, 250, 0.3)',
    },
    {
      title: 'Total Patient Visits Logged',
      value: '12,450',
      growth: '+24% OPD traffic',
      icon: <TrendingUpOutlined />,
      color: '#FBBF24',
      bg: 'rgba(251, 191, 36, 0.12)',
      border: 'rgba(251, 191, 36, 0.3)',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((item) => (
        <Grid item xs={12} sm={6} md={3} size={{ xs: 12, sm: 6, md: 3 }} key={item.title}>
          <Paper
            elevation={0}
            sx={{
              p: 2.8,
              bgcolor: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(16px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              transition: '0.3s',
              '&:hover': {
                borderColor: item.color,
                bgcolor: 'rgba(255, 255, 255, 0.07)',
                transform: 'translateY(-3px)',
              },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  p: 1.2,
                  bgcolor: item.bg,
                  color: item.color,
                  borderRadius: '14px',
                  display: 'flex',
                  border: `1px solid ${item.border}`,
                }}
              >
                {item.icon}
              </Box>
              <Chip
                label={item.growth}
                size="small"
                sx={{ bgcolor: item.bg, color: item.color, fontWeight: 800, fontSize: '0.7rem' }}
              />
            </Box>

            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block' }}>
              {item.title}
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#FFFFFF', mt: 0.5 }}>
              {item.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}