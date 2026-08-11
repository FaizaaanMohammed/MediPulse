'use client';
import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Rating,
  Avatar,
  Divider,
  Grid,
} from '@mui/material';
import { StarOutlined, ThumbUpOutlined, ChatBubbleOutlineOutlined } from '@mui/icons-material';

export default function DoctorFeedbackPage() {
  const reviews = [
    {
      id: 1,
      patientName: 'Amitav Ghosh',
      date: '10 Aug 2026',
      rating: 5,
      comment: 'Dr. Roy diagnosed my fever accurately and explained the dosage clearly. Very polite and patient!',
    },
    {
      id: 2,
      patientName: 'Priya Verma',
      date: '08 Aug 2026',
      rating: 4,
      comment: 'Quick OPD queue management and instant e-prescription via portal.',
    },
    {
      id: 3,
      patientName: 'Rahul Sharma',
      date: '05 Aug 2026',
      rating: 5,
      comment: 'Extremely professional experience. Provided clear health guidance and routine test recommendations.',
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            Ratings & Patient Feedback
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
            Detailed reviews and satisfaction feedback submitted by OPD patients.
          </Typography>
        </Box>

        {/* Overview Banner */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4} size={{xs:12,sm:4}}>
            <Paper sx={{ p: 3, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', textAlign: 'center' }}>
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase' }}>OVERALL RATING</Typography>
              <Typography variant="h3" sx={{ fontWeight: 900, color: '#FBBF24', my: 1 }}>4.8</Typography>
              <Rating value={4.8} precision={0.1} readOnly size="medium" />
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 1 }}>Based on 124 verified visits</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} size={{xs:12,sm:4}}>
            <Paper sx={{ p: 3, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', textAlign: 'center' }}>
              <ThumbUpOutlined sx={{ fontSize: 32, color: '#4ADE80', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFF' }}>96%</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 0.5 }}>Positive Recommendation Score</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4} size={{xs:12,sm:4}}>
            <Paper sx={{ p: 3, bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '16px', textAlign: 'center' }}>
              <ChatBubbleOutlineOutlined sx={{ fontSize: 32, color: '#83C5BE', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFF' }}>124</Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mt: 0.5 }}>Total Patient Comments</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Reviews List */}
        <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', p: { xs: 2.5, sm: 3.5 } }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 2 }}>
            All Patient Reviews
          </Typography>
          <Divider sx={{ borderColor: '#334155', mb: 3 }} />

          <Stack spacing={2.5}>
            {reviews.map((rev) => (
              <Paper key={rev.id} sx={{ p: 2.5, bgcolor: '#0F172A', border: '1px solid #334155', borderRadius: '14px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#006D77', fontWeight: 800 }}>{rev.patientName.charAt(0)}</Avatar>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#FFF', lineHeight: 1.2 }}>{rev.patientName}</Typography>
                      <Typography variant="caption" sx={{ color: '#94A3B8' }}>{rev.date}</Typography>
                    </Box>
                  </Box>
                  <Rating value={rev.rating} readOnly size="small" />
                </Box>
                <Typography variant="body2" sx={{ color: '#CBD5E1', lineHeight: 1.5 }}>
                  "{rev.comment}"
                </Typography>
              </Paper>
            ))}
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}