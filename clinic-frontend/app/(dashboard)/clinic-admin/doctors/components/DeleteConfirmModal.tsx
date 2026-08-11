'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { WarningAmberOutlined } from '@mui/icons-material';

interface DeleteConfirmModalProps {
  open: boolean;
  doctorName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  open,
  doctorName,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          bgcolor: '#1E293B',
          color: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #334155',
          p: 1,
        },
      }}
    >
      <DialogContent>
        <Box sx={{ textAlign: 'center', py: 1 }}>
          <WarningAmberOutlined sx={{ fontSize: 48, color: '#F87171', mb: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Remove Doctor?
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8' }}>
            Are you sure you want to remove <strong style={{ color: '#FFF' }}>{doctorName}</strong> from the clinic directory? This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2, px: 2 }}>
        <Button onClick={onClose} sx={{ color: '#94A3B8', fontWeight: 600 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          sx={{ bgcolor: '#EF4444', '&:hover': { bgcolor: '#DC2626' }, fontWeight: 700, px: 3 }}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
}