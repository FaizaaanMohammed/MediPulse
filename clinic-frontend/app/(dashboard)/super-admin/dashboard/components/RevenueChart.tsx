'use client';
import React from 'react';
import { Paper, Box, Typography, Chip } from '@mui/material';
import { ArrowUpwardOutlined } from '@mui/icons-material';

export default function RevenueChart() {
  const revenueChartData = [
    { month: 'Mar', val: 40 },
    { month: 'Apr', val: 55 },
    { month: 'May', val: 65 },
    { month: 'Jun', val: 78 },
    { month: 'Jul', val: 88 },
    { month: 'Aug', val: 100 },
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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF' }}>
            Platform Financial MRR Growth
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>
            Monthly SaaS subscription collections (INR)
          </Typography>
        </Box>

        <Chip
          icon={<ArrowUpwardOutlined sx={{ fontSize: '14px !important', color: '#34D399 !important' }} />}
          label="+18.4% MRR"
          size="small"
          sx={{ bgcolor: 'rgba(52, 211, 153, 0.15)', color: '#34D399', fontWeight: 800, px: 1 }}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', pt: 2, px: 2 }}>
        {revenueChartData.map((d) => (
          <Box key={d.month} sx={{ textAlign: 'center', flex: 1, mx: 1 }}>
            <Box
              sx={{
                height: `${d.val * 1.5}px`,
                bgcolor: d.month === 'Aug' ? '#83C5BE' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px 12px 4px 4px',
                transition: '0.3s',
                '&:hover': { bgcolor: '#006D77' },
              }}
            />
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#94A3B8', mt: 1, display: 'block' }}>
              {d.month}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}