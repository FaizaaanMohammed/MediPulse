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
  Box,
  Divider,
} from '@mui/material';
import { Close, DescriptionOutlined } from '@mui/icons-material';

interface PrescriptionModalProps {
  open: boolean;
  patient: any;
  onClose: () => void;
  onCompleteConsultation: (id: string) => void;
}

export default function PrescriptionModal({
  open,
  patient,
  onClose,
  onCompleteConsultation,
}: PrescriptionModalProps) {
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState('');
  const [advice, setAdvice] = useState('');

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
    if (patient) {
      onCompleteConsultation(patient.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" PaperProps={{ sx: dialogSx }}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, pt: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DescriptionOutlined sx={{ color: '#83C5BE' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
            Write E-Prescription
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: '#94A3B8' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderColor: '#334155', px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          <Box sx={{ p: 2, bgcolor: '#0F172A', borderRadius: '12px', border: '1px solid #334155' }}>
            <Typography variant="subtitle2" sx={{ color: '#83C5BE', fontWeight: 700 }}>
              Patient: {patient?.patientName} ({patient?.id})
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8' }}>
              Visit Type: {patient?.type} • Slot: {patient?.timeSlot}
            </Typography>
          </Box>

          <TextField
            fullWidth
            label="Diagnosis / Primary Symptoms"
            placeholder="e.g. Acute Rhinitis, Seasonal Allergies"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Prescribed Medicines & Dosage"
            placeholder="1. Tab Paracetamol 650mg - 1-0-1 (After Food)&#10;2. Syrup Allegra - 5ml at bedtime"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={2}
            label="Doctor Advice & Lab Tests Required"
            placeholder="Drink warm water, complete 3-day course. Blood test if fever persists."
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: inputStyle },
            }}
          />
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
          Save & Complete Consultation
        </Button>
      </DialogActions>
    </Dialog>
  );
}