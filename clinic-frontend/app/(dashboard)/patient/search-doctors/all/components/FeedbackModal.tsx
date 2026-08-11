'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Rating,
  TextField,
  Button,
} from '@mui/material';
import { StarBorderOutlined } from '@mui/icons-material';
import { Doctor } from './DoctorCard';

interface FeedbackModalProps {
  open: boolean;
  doctor: Doctor | null;
  onClose: () => void;
  onSubmit: (rating: number | null, comment: string) => void;
  userRating: number | null;
  setUserRating: (val: number | null) => void;
  userComment: string;
  setUserComment: (val: string) => void;
}

export default function FeedbackModal({
  open,
  doctor,
  onClose,
  onSubmit,
  userRating,
  setUserRating,
  userComment,
  setUserComment,
}: FeedbackModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: '28px', p: 1 } }}
    >
      <DialogTitle sx={{ fontWeight: 900, color: '#1E1B4B', pb: 1 }}>
        Rate & Review {doctor?.name}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
          Share your OPD consultation experience to help other patients.
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Rating
            size="large"
            value={userRating}
            onChange={(_, newValue) => setUserRating(newValue)}
            emptyIcon={<StarBorderOutlined fontSize="inherit" />}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="Write your review regarding diagnosis, behavior, or wait time..."
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '16px', bgcolor: '#F8FAFC' } }}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2.5, pt: 0 }}>
        <Button onClick={onClose} sx={{ color: '#64748B', fontWeight: 700, textTransform: 'none' }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={() => onSubmit(userRating, userComment)}
          sx={{
            bgcolor: '#4F46E5',
            '&:hover': { bgcolor: '#4338CA' },
            fontWeight: 800,
            borderRadius: '50px',
            px: 3,
            textTransform: 'none',
          }}
        >
          Submit Rating
        </Button>
      </DialogActions>
    </Dialog>
  );
}