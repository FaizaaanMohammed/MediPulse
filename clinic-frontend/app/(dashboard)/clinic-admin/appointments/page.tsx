'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { SearchOutlined, AddOutlined } from '@mui/icons-material';
import AppointmentTable, { AppointmentItem } from './components/AppointmentTable';
import RescheduleModal from './components/RescheduleModal';
import NewBookingModal from './components/NewBookingModal';

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openReschedule, setOpenReschedule] = useState(false);
  const [openNewBooking, setOpenNewBooking] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState<AppointmentItem | null>(null);

  const [appointments, setAppointments] = useState<AppointmentItem[]>([
    {
      id: 'APT-101',
      patientName: 'Rahul Sharma',
      doctorName: 'Dr. A. K. Roy',
      date: '11 Aug 2026',
      timeSlot: '10:30 AM',
      status: 'In Progress',
      type: 'General Checkup',
    },
    {
      id: 'APT-102',
      patientName: 'Priya Verma',
      doctorName: 'Dr. Sneha Das',
      date: '11 Aug 2026',
      timeSlot: '11:00 AM',
      status: 'Waiting',
      type: 'Skin Consultation',
    },
    {
      id: 'APT-103',
      patientName: 'Amitav Ghosh',
      doctorName: 'Dr. A. K. Roy',
      date: '11 Aug 2026',
      timeSlot: '11:30 AM',
      status: 'Completed',
      type: 'Follow Up',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: AppointmentItem['status']) => {
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const handleRescheduleConfirm = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, date: newDate, timeSlot: newTime, status: 'Waiting' }
          : item
      )
    );
    setOpenReschedule(false);
    setSelectedAppt(null);
  };

  const handleAddBooking = (newBooking: AppointmentItem) => {
    setAppointments((prev) => [newBooking, ...prev]);
  };

  const filteredAppointments = appointments.filter((item) => {
    const matchesSearch =
      item.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Appointments Queue
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
              Manage daily patient bookings, slot rescheduling, and visit statuses.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={() => setOpenNewBooking(true)}
            startIcon={<AddOutlined />}
            sx={{
              bgcolor: '#006D77',
              color: '#FFFFFF',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              px: 2.5,
              py: 1.1,
              '&:hover': { bgcolor: '#004D54' },
            }}
          >
            New Booking
          </Button>
        </Box>

        {/* Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: '#83C5BE' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              flexGrow: 1,
              minWidth: '250px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                bgcolor: '#1E293B',
                borderRadius: '12px',
                height: '46px',
                '& fieldset': { borderColor: '#334155' },
                '&:hover fieldset': { borderColor: '#83C5BE' },
              },
            }}
          />

          <TextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: '180px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                bgcolor: '#1E293B',
                borderRadius: '12px',
                height: '46px',
                '& fieldset': { borderColor: '#334155' },
              },
            }}
          >
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Waiting">Waiting</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </TextField>
        </Box>

        {/* Table */}
        <AppointmentTable
          appointments={filteredAppointments}
          onStatusChange={handleStatusChange}
          onRescheduleClick={(appt) => {
            setSelectedAppt(appt);
            setOpenReschedule(true);
          }}
        />

        {/* Modals */}
        <NewBookingModal
          open={openNewBooking}
          onClose={() => setOpenNewBooking(false)}
          onAddBooking={handleAddBooking}
        />

        <RescheduleModal
          open={openReschedule}
          appointment={selectedAppt}
          onClose={() => {
            setOpenReschedule(false);
            setSelectedAppt(null);
          }}
          onConfirm={handleRescheduleConfirm}
        />
      </Container>
    </Box>
  );
}