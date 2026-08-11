'use client';
import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import {
  PeopleAltOutlined,
  CalendarTodayOutlined,
  MedicalServicesOutlined,
  AccountBalanceWalletOutlined,
  TrendingUp,
} from '@mui/icons-material';

export default function KpiCards() {
  return (
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {/* Total Patients */}
      <Grid item xs={6} md={3} size={{xs:6,md:3}}>
        <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '18px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PeopleAltOutlined sx={{ color: '#83C5BE' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(34, 197, 94, 0.15)', px: 1, py: 0.3, borderRadius: '6px' }}>
                <TrendingUp sx={{ fontSize: 14, color: '#4ADE80' }} />
                <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700 }}>+12%</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.85rem' }}>Total Patients</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FFFFFF', letterSpacing: '-0.5px' }}>1,248</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Today's Appointments */}
      <Grid item xs={6} md={3} size={{xs:6,md:3}}>
        <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '18px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CalendarTodayOutlined sx={{ color: '#2DD4BF' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(34, 197, 94, 0.15)', px: 1, py: 0.3, borderRadius: '6px' }}>
                <TrendingUp sx={{ fontSize: 14, color: '#4ADE80' }} />
                <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight :700 }}>+8%</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.85rem' }}>Today's Appointments</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FFFFFF', letterSpacing: '-0.5px' }}>42</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Active Doctors */}
      <Grid item xs={6} md={3} size={{xs:6,md:3}}>
        <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '18px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MedicalServicesOutlined sx={{ color: '#FBBF24' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(34, 197, 94, 0.15)', px: 1, py: 0.3, borderRadius: '6px' }}>
                <TrendingUp sx={{ fontSize: 14, color: '#4ADE80' }} />
                <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700 }}>0%</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.85rem' }}>Active Doctors</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FFFFFF', letterSpacing: '-0.5px' }}>14</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Monthly Revenue */}
      <Grid item xs={6} md={3} size={{xs:6,md:3}}>
        <Card sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '18px' }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AccountBalanceWalletOutlined sx={{ color: '#60A5FA' }} />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: 'rgba(34, 197, 94, 0.15)', px: 1, py: 0.3, borderRadius: '6px' }}>
                <TrendingUp sx={{ fontSize: 14, color: '#4ADE80' }} />
                <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 700 }}>+18%</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: '#94A3B8', fontWeight: 600, fontSize: '0.85rem' }}>Monthly Revenue</Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 0.5, color: '#FFFFFF', letterSpacing: '-0.5px' }}>₹3,45,000</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}