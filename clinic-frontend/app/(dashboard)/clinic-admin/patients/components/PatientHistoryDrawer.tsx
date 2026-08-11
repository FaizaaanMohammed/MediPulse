'use client';
import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Divider,
  Stack,
  Paper,
  Grid
} from '@mui/material';
import { Close, PhoneOutlined, LocalHospitalOutlined, CalendarMonthOutlined } from '@mui/icons-material';

interface PatientHistoryDrawerProps {
  open: boolean;
  patient: any;
  onClose: () => void;
}

export default function PatientHistoryDrawer({ open, patient, onClose }: PatientHistoryDrawerProps) {
  if (!patient) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 440 },
          bgcolor: '#0F172A',
          color: '#FFFFFF',
          borderLeft: '1px solid #334155',
          p: 3,
        },
      }}
    >
      {/* Header Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.3px' }}>
          Medical Record
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8', '&:hover': { color: '#FFF', bgcolor: 'rgba(255,255,255,0.08)' } }}>
          <Close />
        </IconButton>
      </Box>

      {/* Patient Profile Box */}
      <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ width: 52, height: 52, bgcolor: '#006D77', fontWeight: 800, fontSize: '1.2rem' }}>
            {patient.name.charAt(0)}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFF', lineHeight: 1.2 }}>
              {patient.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 600, display: 'block', mt: 0.3 }}>
              {patient.id} • {patient.age} • {patient.gender}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 0.8 }}>
              <PhoneOutlined sx={{ fontSize: 13, color: '#94A3B8' }} />
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>{patient.phone}</Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Vitals Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Paper sx={{ flex: 1, p: 2, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '14px', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5 }}>Blood Group</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#F87171' }}>{patient.bloodGroup || 'O+'}</Typography>
          </Paper>
          <Paper sx={{ flex: 1, p: 2, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '14px', textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 0.5 }}>Total Visits</Typography>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#4ADE80' }}>{patient.totalVisits}</Typography>
          </Paper>
        </Stack>
      </Grid>

      <Divider sx={{ borderColor: '#334155', mb: 3 }} />

      {/* History Timeline Title */}
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#83C5BE', mb: 2, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.75rem' }}>
        Visit History Timeline
      </Typography>

      {/* History Cards with Spacing */}
      <Stack spacing={2.5}>
        <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Chip
              icon={<LocalHospitalOutlined sx={{ fontSize: '15px !important', color: '#83C5BE !important' }} />}
              label="Dr. A. K. Roy"
              size="small"
              sx={{ bgcolor: 'rgba(0, 109, 119, 0.25)', color: '#83C5BE', fontSize: '0.75rem', fontWeight: 700, px: 0.5 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarMonthOutlined sx={{ fontSize: 13, color: '#94A3B8' }} />
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 500 }}>{patient.lastVisit}</Typography>
            </Box>
          </Box>

          <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 1 }}>
            Diagnosis: <span style={{ color: '#CBD5E1', fontWeight: 500 }}>Seasonal Fever & Mild Cough</span>
          </Typography>

          <Box sx={{ p: 1.5, bgcolor: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px dashed #334155' }}>
            <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 700, display: 'block', mb: 0.5 }}>
              PRESCRIPTION & NOTES
            </Typography>
            <Typography variant="caption" sx={{ color: '#CBD5E1', lineHeight: 1.4, display: 'block' }}>
              • Paracetamol 650mg (1-0-1) <br />
              • Vitamin C Supplements <br />
              • Advised warm fluids and 3 days rest.
            </Typography>
          </Box>
        </Paper>
      </Stack>
    </Drawer>
  );
}