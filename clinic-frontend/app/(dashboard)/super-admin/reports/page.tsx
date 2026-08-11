'use client';
import React from 'react';
import { Box, Typography, Grid, Paper, Button, Stack, Chip } from '@mui/material';
import { DownloadOutlined } from '@mui/icons-material';

export default function RevenueReportsPage() {
  const reports = [
    {
      title: 'Monthly SaaS Revenue Statement',
      desc: 'Detailed breakdown of subscription fee collection across all clinic tiers.',
      date: 'August 2026',
    },
    {
      title: 'Clinic Onboarding & Conversion Log',
      desc: 'New clinic registrations, trial-to-paid plan conversion statistics.',
      date: 'August 2026',
    },
    {
      title: 'Platform Patient OPD Traffic Report',
      desc: 'Aggregated OPD consultation volume and clinic-wise appointment counts.',
      date: 'August 2026',
    },
  ];

  return (
    <Box sx={{ color: '#FFFFFF' }}>
      {/* Page Title & Main Export CTA */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Platform Revenue & System Reports
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5, fontWeight: 500 }}>
            Export platform analytics, financial audit logs, and multi-tenant performance reports.
          </Typography>
        </Box>

        <Button
          variant="contained"
          disableElevation
          startIcon={<DownloadOutlined />}
          onClick={() => alert('Exporting full platform audit CSV...')}
          sx={{
            bgcolor: '#006D77',
            '&:hover': { bgcolor: '#004D54' },
            fontWeight: 800,
            borderRadius: '12px',
            px: 3,
            py: 1.1,
            textTransform: 'none',
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 109, 119, 0.4)',
          }}
        >
          Export Full Platform CSV
        </Button>
      </Box>

      {/* Dark Revenue Summary Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          mb: 4,
          backgroundImage: 'linear-gradient(135deg, rgba(0, 109, 119, 0.25) 0%, rgba(15, 23, 42, 0.8) 100%)',
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={4} size={{xs:12,md:4}}>
            <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Gross Platform MRR
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#FFFFFF', mt: 0.5 }}>
              ₹4,85,000
            </Typography>
            <Typography variant="body2" sx={{ color: '#34D399', mt: 1, fontWeight: 700 }}>
              +18.4% growth compared to last month
            </Typography>
          </Grid>

          <Grid item xs={12} md={8}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="flex-end">
              <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', p: 2.5, borderRadius: '16px', minWidth: '180px' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>Pro Tier Earnings</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFF', mt: 0.5 }}>₹2,20,000</Typography>
              </Box>
              <Box sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', p: 2.5, borderRadius: '16px', minWidth: '180px' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>Enterprise Earnings</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFF', mt: 0.5 }}>₹2,65,000</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Dark Report Cards Grid */}
      <Grid container spacing={3}>
        {reports.map((rep) => (
          <Grid item xs={12} md={4} size={{xs:12,md:4}} key={rep.title}>
            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <Box>
                <Chip label={rep.date} size="small" sx={{ bgcolor: 'rgba(131, 197, 190, 0.15)', color: '#83C5BE', fontWeight: 800, mb: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 1 }}>
                  {rep.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, lineHeight: 1.6 }}>
                  {rep.desc}
                </Typography>
              </Box>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => alert(`Downloading ${rep.title}...`)}
                startIcon={<DownloadOutlined />}
                sx={{
                  borderColor: '#83C5BE',
                  color: '#83C5BE',
                  fontWeight: 800,
                  borderRadius: '12px',
                  textTransform: 'none',
                  py: 1,
                  '&:hover': {
                    bgcolor: 'rgba(131, 197, 190, 0.15)',
                    borderColor: '#83C5BE',
                  },
                }}
              >
                Download PDF Audit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}