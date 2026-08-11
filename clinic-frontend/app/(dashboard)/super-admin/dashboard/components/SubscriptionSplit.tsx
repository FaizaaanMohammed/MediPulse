'use client';
import React from 'react';
import { Paper, Box, Typography, CircularProgress, Stack } from '@mui/material';

export default function SubscriptionSplit() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF', textAlign: 'left', mb: 0.5 }}>
        Subscription Tier Split
      </Typography>
      <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500, display: 'block', textAlign: 'left', mb: 3 }}>
        Active clinic plan breakdown
      </Typography>

      <Box sx={{ position: 'relative', display: 'inline-flex', my: 1 }}>
        <CircularProgress
          variant="determinate"
          value={100}
          size={140}
          thickness={5}
          sx={{ color: 'rgba(255, 255, 255, 0.1)' }}
        />
        <CircularProgress
          variant="determinate"
          value={65}
          size={140}
          thickness={5}
          sx={{ color: '#83C5BE', position: 'absolute', left: 0 }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>
            65%
          </Typography>
          <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 700, fontSize: '0.65rem' }}>
            Pro SaaS
          </Typography>
        </Box>
      </Box>

      <Stack spacing={1.2} sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Pro Monthly (65%):</Typography>
          <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 900 }}>22 Clinics</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Enterprise (25%):</Typography>
          <Typography variant="caption" sx={{ color: '#34D399', fontWeight: 900 }}>12 Clinics</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Free Trial (10%):</Typography>
          <Typography variant="caption" sx={{ color: '#FBBF24', fontWeight: 900 }}>8 Clinics</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}