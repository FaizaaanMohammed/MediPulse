'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
  Typography,
  MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
  onAddInvoice: (invoiceData: any) => void;
}

export default function CreateInvoiceModal({ open, onClose, onAddInvoice }: CreateInvoiceModalProps) {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('Dr. A. K. Roy');
  const [amount, setAmount] = useState('500');
  const [paymentMode, setPaymentMode] = useState('UPI / Online');
  const [status, setStatus] = useState<'Paid' | 'Pending'>('Paid');

  const dialogSx = {
    bgcolor: '#1E293B',
    color: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid #334155',
  };

  const inputStyle = {
    color: '#FFFFFF',
    bgcolor: 'rgba(255,255,255,0.05)',
    borderRadius: '10px',
  };

  const handleSubmit = () => {
    if (!patientName.trim()) return;

    onAddInvoice({
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      doctorName,
      amount: `₹${amount}`,
      date: '11 Aug 2026',
      paymentMode,
      status,
    });

    setPatientName('');
    setAmount('500');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: dialogSx }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
          Generate New Invoice
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            label="Patient Name"
            placeholder="e.g. Rahul Sharma"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          />

          <TextField
            fullWidth
            select
            label="Consulting Doctor"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          >
            <MenuItem value="Dr. A. K. Roy">Dr. A. K. Roy</MenuItem>
            <MenuItem value="Dr. Sneha Das">Dr. Sneha Das</MenuItem>
            <MenuItem value="Dr. R. N. Mukherjee">Dr. R. N. Mukherjee</MenuItem>
            <MenuItem value="Dr. Priya Sharma">Dr. Priya Sharma</MenuItem>
          </TextField>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            />
            <TextField
              fullWidth
              select
              label="Payment Mode"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              slotProps={{
                inputLabel: { sx: { color: '#94A3B8' } },
                input: { sx: inputStyle },
              }}
            >
              <MenuItem value="UPI / Online">UPI / Online</MenuItem>
              <MenuItem value="Cash">Cash</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
            </TextField>
          </Stack>

          <TextField
            fullWidth
            select
            label="Payment Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as 'Paid' | 'Pending')}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} sx={{ color: '#94A3B8' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 3 }}
        >
          Create Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
}