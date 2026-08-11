'use client';
import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Stack, Rating, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { StarOutlined } from '@mui/icons-material';
import QueueTable, { QueueItem } from './components/QueueTable';
import PrescriptionModal from './components/PrescriptionModal';

export default function DoctorDashboard() {
  const [openModal, setOpenModal] = useState(false);
  const [activePatient, setActivePatient] = useState<QueueItem | null>(null);

  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'APT-101', patientName: 'Rahul Sharma', timeSlot: '10:30 AM', type: 'General Checkup', status: 'In Progress' },
    { id: 'APT-102', patientName: 'Priya Verma', timeSlot: '11:00 AM', type: 'Skin Allergy', status: 'Waiting' },
    { id: 'APT-103', patientName: 'Amitav Ghosh', timeSlot: '11:30 AM', type: 'Follow Up', status: 'Waiting' },
  ]);

  const handleStartVisit = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'In Progress' } : item))
    );
  };

  const handleCompleteConsultation = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Completed' } : item))
    );
  };

  const totalToday = queue.length;
  const completedCount = queue.filter((i) => i.status === 'Completed').length;
  const waitingCount = queue.filter((i) => i.status === 'Waiting').length;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Doctor OPD Live Queue
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
            Manage ongoing patient consultations, write digital prescriptions, and track daily visit stats.
          </Typography>
        </Box>

        {/* Stats Row including Ratings */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={3} size={{xs:12,sm:3}}>
            <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>TOTAL BOOKINGS TODAY</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFF', mt: 1 }}>{totalToday}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} size={{xs:12,sm:3}}>
            <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px' }}>
              <Typography variant="caption" sx={{ color: '#FBBF24', fontWeight: 600 }}>WAITING IN OPD</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FBBF24', mt: 1 }}>{waitingCount}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} size={{xs:12,sm:3}}>
            <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px' }}>
              <Typography variant="caption" sx={{ color: '#4ADE80', fontWeight: 600 }}>COMPLETED VISITS</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#4ADE80', mt: 1 }}>{completedCount}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} size={{xs:12,sm:3}}>
            <Paper sx={{ p: 2.5, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px' }}>
              <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 600 }}>AVG PATIENT RATING</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#FBBF24' }}>4.8</Typography>
                <Rating value={4.8} precision={0.1} readOnly size="small" />
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Live Queue & Patient Feedback Row */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8} size={{xs:12,sm:8}}>
            <QueueTable
              queue={queue}
              onStartVisit={handleStartVisit}
              onOpenPrescription={(item) => {
                setActivePatient(item);
                setOpenModal(true);
              }}
            />
          </Grid>

          <Grid item xs={12} lg={4} size={{xs:12,sm:4}}>
            <Paper sx={{ p: 3, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
                Recent Patient Feedback
              </Typography>
              <Typography variant="body2" sx={{ color: '#94A3B8', mb: 2.5 }}>
                Reviews submitted after OPD visits.
              </Typography>

              <Stack spacing={2}>
                <Paper sx={{ p: 2, bgcolor: '#0F172A', border: '1px solid #334155', borderRadius: '12px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#006D77', fontSize: '0.75rem' }}>A</Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>Amitav Ghosh</Typography>
                    </Box>
                    <Rating value={5} readOnly size="small" />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', display: 'block' }}>
                    "Dr. Roy diagnosed my fever accurately and explained the dosage clearly. Very polite!"
                  </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#0F172A', border: '1px solid #334155', borderRadius: '12px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#83C5BE', color: '#0F172A', fontSize: '0.75rem', fontWeight: 800 }}>P</Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFF' }}>Priya Verma</Typography>
                    </Box>
                    <Rating value={4} readOnly size="small" />
                  </Box>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', display: 'block' }}>
                    "Quick OPD queue management and instant e-prescription."
                  </Typography>
                </Paper>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        {/* Prescription Modal */}
        <PrescriptionModal
          open={openModal}
          patient={activePatient}
          onClose={() => {
            setOpenModal(false);
            setActivePatient(null);
          }}
          onCompleteConsultation={handleCompleteConsultation}
        />
      </Container>
    </Box>
  );
}