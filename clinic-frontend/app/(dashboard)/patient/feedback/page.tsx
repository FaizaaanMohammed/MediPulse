'use client';
import React, { useState } from 'react';
import { Container, Box, Typography, Paper, TextField, Button, Rating, Stack } from '@mui/material';
import { RateReviewOutlined, SendOutlined } from '@mui/icons-material';

export default function PatientFeedbackPage() {
  const [rating, setRating] = useState<number | null>(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    alert('Thank you! Your feedback has been submitted successfully.');
    setFeedback('');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
          Rate Your OPD Experience
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
          Your feedback helps doctors and clinics improve patient care quality.
        </Typography>
      </Box>

      <Paper sx={{ p: 4, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px' }}>
        <Stack spacing={3}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFF', mb: 1 }}>
              How satisfied were you with Dr. A. K. Roy?
            </Typography>
            <Rating
              value={rating}
              onChange={(_, newValue) => setRating(newValue)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Write your detailed experience"
            placeholder="Mention diagnosis accuracy, waiting time, and clinic hygiene..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            slotProps={{
              inputLabel: { sx: { color: '#94A3B8' } },
              input: { sx: { color: '#FFF', bgcolor: '#0F172A', borderRadius: '12px' } },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<SendOutlined />}
              sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' }, fontWeight: 700, px: 4, py: 1.2, borderRadius: '12px' }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}