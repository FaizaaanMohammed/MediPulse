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
} from '@mui/material';
import { Close, CheckCircleOutlined, PaymentOutlined } from '@mui/icons-material';

interface BookingModalProps {
  open: boolean;
  doctor: any;
  onClose: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

export default function BookingModal({ open, doctor, onClose, onConfirmBooking }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState('10:30 AM');
  const [selectedDate, setSelectedDate] = useState('Today, 11 Aug');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!doctor) return null;

  const slots = ['10:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:30 PM'];

  const handlePayAndBook = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      onConfirmBooking({
        id: `APT-${Math.floor(100 + Math.random() * 900)}`,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        clinic: doctor.clinic,
        slotTime: `${selectedDate} • ${selectedSlot}`,
        fee: doctor.fee,
        status: 'Confirmed',
      });
      setPaymentSuccess(false);
      onClose();
    }, 1200);
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
                {doctor.specialty} • {doctor.clinic}
              </Typography>
            </Paper>

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
              <Typography variant="body2" sx={{ color: '#94A3B8' }}>Consultation Fee Payable</Typography>
              <Typography variant="h5" sx={{ fontWeight: 900, color: '#4ADE80' }}>{doctor.fee}</Typography>
            </Box>
          </Stack>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <CheckCircleOutlined sx={{ fontSize: 60, color: '#4ADE80', mb: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF' }}>Payment Verified & Booking Confirmed!</Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', mt: 0.5, display: 'block' }}>Generating appointment ticket...</Typography>
          </Box>
        )}
      </DialogContent>

      {!paymentSuccess && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} sx={{ color: '#94A3B8' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handlePayAndBook}
            startIcon={<PaymentOutlined />}
            sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3, borderRadius: '10px' }}
          >
            Pay {doctor.fee} & Book
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}