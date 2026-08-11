'use client';
import React, { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Stack, Switch, FormControlLabel, Divider } from '@mui/material';
import { SaveOutlined, CampaignOutlined } from '@mui/icons-material';

export default function SystemSettingsPage() {
  const [announcement, setAnnouncement] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handlePublishAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`System Announcement Published to All Clinics: "${announcement}"`);
    setAnnouncement('');
  };

  return (
    <Box maxWidth="900px">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0F172A' }}>
          Global System Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', mt: 0.5 }}>
          Broadcast global announcements, configure payment gateways, or toggle system maintenance mode.
        </Typography>
      </Box>

      <Stack spacing={4}>
        {/* Broadcast System Announcement */}
        <Paper elevation={0} sx={{ p: 3.5, bgcolor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #E2E8F0' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Box sx={{ p: 1, bgcolor: '#E6F0F1', color: '#006D77', borderRadius: '10px', display: 'flex' }}>
              <CampaignOutlined />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Broadcast Platform Announcement
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#64748B', mb: 2.5 }}>
            This banner message will be displayed at the top of all Clinic Admin and Doctor dashboards.
          </Typography>

          <Box component="form" onSubmit={handlePublishAnnouncement}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="e.g. Scheduled platform maintenance on Sunday at 02:00 AM IST. All OPD slots will remain accessible."
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              sx={{ mb: 2.5, '& .MuiOutlinedInput-root': { borderRadius: '14px', bgcolor: '#F8FAFC' } }}
            />
            <Button
              type="submit"
              variant="contained"
              disableElevation
              disabled={!announcement.trim()}
              startIcon={<SaveOutlined />}
              sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 800, borderRadius: '10px', textTransform: 'none', px: 3 }}
            >
              Broadcast Announcement
            </Button>
          </Box>
        </Paper>

        {/* Governance & Maintenance Toggle */}
        <Paper elevation={0} sx={{ p: 3.5, bgcolor: '#FFFFFF', borderRadius: '24px', border: '1.5px solid #E2E8F0' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
            Maintenance & Access Control
          </Typography>
          <Divider sx={{ my: 2 }} />

          <FormControlLabel
            control={
              <Switch
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Enable System Maintenance Mode
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  Temporarily pause new clinic onboardings and appointment bookings for maintenance.
                </Typography>
              </Box>
            }
          />
        </Paper>
      </Stack>
    </Box>
  );
}