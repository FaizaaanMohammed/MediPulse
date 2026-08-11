'use client';
import React from 'react';
import { Box, Container, Typography, Button, Stack, Avatar, Chip, Paper } from '@mui/material';
import { ArrowForwardOutlined, FavoriteOutlined } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  // Updated 4 Clean Navigation Items
  const navs = [
    { text: 'Home', href: '/patient/search-doctors' },
    { text: 'Our Doctors', href: '/patient/search-doctors/all' },
    { text: 'My Bookings', href: '/patient/dashboard' },
    { text: 'Contact', href: '#contact-desk' },
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '24px',
        left: 0,
        right: 0,
        zIndex: 100,
        width: '100%',
      }}
    >
      <Container maxWidth={false} sx={{ maxWidth: '1350px', px: { xs: 2, md: 4 } }}>
        <Paper
          elevation={0}
          sx={{
            p: "20px",
            px: 3,
            bgcolor: '#FFFFFF',
            borderRadius: '50px',
            border: '1px solid rgba(224, 231, 255, 0.8)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 10px 30px rgba(79, 70, 229, 0.08)',
          }}
        >
          {/* Brand Logo */}
          <Box
            component={Link}
            href="/patient/search-doctors"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
          >
            <Box sx={{ p: 0.8, bgcolor: '#4F46E5', borderRadius: '12px', color: '#FFF', display: 'flex' }}>
              <FavoriteOutlined fontSize="small" />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#1E1B4B', letterSpacing: '-0.5px' }}>
              Medi<span style={{ color: '#4F46E5' }}>Pulse</span>
            </Typography>
            <Chip
              label="Patient Care"
              size="small"
              sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 800, fontSize: '0.65rem' }}
            />
          </Box>

          {/* 4 Core Navigation Links */}
          <Stack direction="row" spacing={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navs.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Typography
                  key={item.text}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: isActive ? '#4F46E5' : '#475569',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: '0.92rem',
                    textDecoration: 'none',
                    transition: '0.2s',
                    '&:hover': { color: '#4F46E5' },
                  }}
                >
                  {item.text}
                </Typography>
              );
            })}
          </Stack>

          {/* User Profile & CTA */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar sx={{ bgcolor: '#4F46E5', width: 36, height: 36, fontSize: '0.85rem', fontWeight: 800 }}>
                P
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E1B4B', lineHeight: 1 }}>
                  Rahul Sharma
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B' }}>
                  PAT-1082
                </Typography>
              </Box>
            </Box>

            <Button
              variant="contained"
              disableElevation
              component={Link}
              href="/patient/search-doctors/all"
              endIcon={
                <Box sx={{ p: 0.5, bgcolor: '#FFF', borderRadius: '50%', color: '#4F46E5', display: 'flex' }}>
                  <ArrowForwardOutlined sx={{ fontSize: 14 }} />
                </Box>
              }
              sx={{
                bgcolor: '#4F46E5',
                '&:hover': { bgcolor: '#4338CA' },
                borderRadius: '50px',
                px: 2.8,
                py: 0.9,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.85rem',
              }}
            >
              Book OPD Slot
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}