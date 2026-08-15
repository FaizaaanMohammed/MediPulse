'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Stack,
  Typography,
  Box,
  Chip,
  Divider,
  Paper,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Close, CheckCircleOutlined, PaymentOutlined } from '@mui/icons-material';
import api from '@/lib/api/axios';

interface BookingModalProps {
  open: boolean;
  doctor: any;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export default function BookingModal({ open, doctor, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [createdAppointment, setCreatedAppointment] = useState<any>(null);

  if (!doctor) return null;

  const slots = ['10:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM'];

  // Handle Real API Booking Call
  const handlePayAndBook = async () => {
    try {
      setSubmitting(true);

      // LocalStorage se patient ki ID retrieve karein
      let storedPatientId = null;
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const parsed = JSON.parse(storedUser);
            storedPatientId = parsed._id || parsed.id;
          } catch (e) {
            console.error('Failed to parse user', e);
          }
        }
      }

      const payload = {
        doctorId: doctor._id || doctor.id,
        clinicId: doctor.clinicId,
        patientId: storedPatientId, // 👈 Safe fallback
        appointmentDate: selectedDate,
        timeSlot: selectedSlot,      // 👈 Matches schema field
        slotTime: selectedSlot,
        type: 'General Checkup',
        paymentStatus: 'PENDING',
      };

      const res = await api.post('/patient/appointments', payload);

      if (res.data?.success && res.data?.data) {
        const appointmentData = res.data.data;
        setCreatedAppointment(appointmentData);
        setPaymentSuccess(true);

        setTimeout(() => {
          onConfirmBooking({
            id: appointmentData._id,
            passNo: appointmentData.appointmentId || `APT-${appointmentData._id.slice(-4)}`,
            doctorName: doctor.name,
            specialty: doctor.specialty || doctor.specialization,
            clinic: doctor.clinic || doctor.clinicName,
            slotTime: `${selectedDate} • ${selectedSlot}`,
            fee: doctor.fee,
            status: 'Confirmed',
          });
          setPaymentSuccess(false);
          onClose();
        }, 1200);
      }
    } catch (error: any) {
      console.error('Booking Error:', error);
      alert(error?.response?.data?.message || 'Failed to book slot. Please make sure you are logged in.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { bgcolor: '#1E293B', color: '#FFFFFF', borderRadius: '20px', border: '1px solid #334155' },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>
          Book Appointment Slot
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        {!paymentSuccess ? (
          <Stack spacing={3}>
            {/* Doctor Summary Card */}
            <Paper sx={{ p: 2, bgcolor: '#0F172A', border: '1px solid #334155', borderRadius: '14px' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#FFF' }}>
                {doctor.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 600, display: 'block' }}>
                {doctor.specialty || doctor.specialization} • {doctor.clinic || doctor.clinicName}
              </Typography>
            </Paper>

            {/* Select Date */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#94A3B8', mb: 1 }}>
                Select Appointment Date
              </Typography>
              <TextField
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                sx={{
                  bgcolor: '#0F172A',
                  borderRadius: '12px',
                  input: { color: '#FFF' },
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#334155' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#83C5BE' },
                }}
              />
            </Box>

            {/* Select Slot */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#94A3B8', mb: 1.5 }}>
                Available OPD Time Slots
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {slots.map((slot) => (
                  <Chip
                    key={slot}
                    label={slot}
                    onClick={() => setSelectedSlot(slot)}
                    sx={{
                      bgcolor: selectedSlot === slot ? '#006D77' : '#0F172A',
                      color: selectedSlot === slot ? '#FFFFFF' : '#94A3B8',
                      border: '1px solid #334155',
                      fontWeight: 700,
                      px: 1,
                      py: 2,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#004D54', color: '#FFF' },
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: '#334155' }} />

            {/* Fee Breakdown */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>
                Consultation Fee Payable
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#4ADE80' }}>
                {doctor.fee}
              </Typography>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <CheckCircleOutlined sx={{ fontSize: 60, color: '#4ADE80', mb: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF' }}>
              Payment Verified & Booking Confirmed!
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', mt: 0.5, display: 'block' }}>
              Token: {createdAppointment?.appointmentId || 'APT-OPD'} • Generating appointment ticket...
            </Typography>
          </Box>
        )}
      </DialogContent>

      {!paymentSuccess && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={submitting} sx={{ color: '#94A3B8' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={submitting}
            onClick={handlePayAndBook}
            startIcon={submitting ? <CircularProgress size={18} color="inherit" /> : <PaymentOutlined />}
            sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3, borderRadius: '10px' }}
          >
            {submitting ? 'Booking...' : `Pay ${doctor.fee} & Book`}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}