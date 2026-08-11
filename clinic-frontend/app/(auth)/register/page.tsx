'use client';
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlined,
  PhoneOutlined,
  Visibility,
  VisibilityOff,
  ArrowForward,
} from '@mui/icons-material';
import Link from 'next/link';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering user:', { role, ...formData });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `linear-gradient(180deg, rgba(15, 23, 42, 0.92) 0%, rgba(0, 77, 84, 0.88) 100%), url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="xs" disableGutters>
        <Card
          elevation={0}
          sx={{
            borderRadius: '24px',
            bgcolor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
          }}
        >
          {/* Top Accent Bar */}
          <Box sx={{ height: 4, background: 'linear-gradient(90deg, #83C5BE 0%, #006D77 100%)' }} />

          <CardContent sx={{ p: { xs: 3.5, sm: 4 } }}>
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <Typography
                component={Link}
                href="/"
                variant="h5"
                sx={{
                  fontWeight: 900,
                  fontSize: '1.65rem',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  letterSpacing: '-0.5px',
                  display: 'inline-block',
                  mb: 0.5,
                }}
              >
                Medi<span style={{ color: '#83C5BE' }}>Pulse</span>
              </Typography>
              <Typography variant="body2" sx={{ color: '#CBD5E1', fontSize: '0.875rem',mb:"20px" }}>
                Create your account to get started
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {/* 4 Portals Dropdown */}
                <Box display="flex" flexDirection="column" gap={0.8}>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.825rem' }}>
                    Select Access Role
                  </Typography>
                  <Box
                    component="select"
                    value={role}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRole(e.target.value)}
                    sx={{
                      width: '100%',
                      height: '46px',
                      borderRadius: '12px',
                      bgcolor: 'rgba(255, 255, 255, 0.06)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      px: 2,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      '& option': {
                        bgcolor: '#0F172A',
                        color: '#FFFFFF',
                        py: 1,
                      },
                      '&:focus': {
                        borderColor: '#83C5BE',
                      },
                    }}
                  >
                    <option value="super_admin">Super Admin Account</option>
                    <option value="clinic_admin">Clinic Admin Account</option>
                    <option value="doctor">Doctor Account</option>
                    <option value="patient">Patient Account</option>
                  </Box>
                </Box>

                {/* Full Name */}
                <Box display="flex" flexDirection="column" gap={0.8}>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.825rem' }}>
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlined sx={{ color: '#83C5BE', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                        height: '46px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#83C5BE' },
                        '&.Mui-focused fieldset': { borderColor: '#83C5BE' },
                      },
                    }}
                  />
                </Box>

                {/* Email Address */}
                <Box display="flex" flexDirection="column" gap={0.8}>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.825rem' }}>
                    Email Address
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ color: '#83C5BE', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                        height: '46px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#83C5BE' },
                        '&.Mui-focused fieldset': { borderColor: '#83C5BE' },
                      },
                    }}
                  />
                </Box>

                {/* Phone Number */}
                <Box display="flex" flexDirection="column" gap={0.8}>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.825rem' }}>
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneOutlined sx={{ color: '#83C5BE', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                        height: '46px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#83C5BE' },
                        '&.Mui-focused fieldset': { borderColor: '#83C5BE' },
                      },
                    }}
                  />
                </Box>

                {/* Password */}
                <Box display="flex" flexDirection="column" gap={0.8}>
                  <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, fontSize: '0.825rem' }}>
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlined sx={{ color: '#83C5BE', fontSize: 20 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: '#CBD5E1' }}>
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: '#FFFFFF',
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 255, 255, 0.06)',
                        height: '46px',
                        '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '&:hover fieldset': { borderColor: '#83C5BE' },
                        '&.Mui-focused fieldset': { borderColor: '#83C5BE' },
                      },
                    }}
                  />
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disableElevation
                  endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                  sx={{
                    bgcolor: '#006D77',
                    color: '#FFFFFF',
                    borderRadius: '12px',
                    py: 1.3,
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 20px rgba(0, 109, 119, 0.4)',
                    '&:hover': { bgcolor: '#004D54' },
                  }}
                >
                  Create Account
                </Button>
              </Stack>
            </Box>

            {/* Bottom Link */}
            <Box textAlign="center" sx={{ textAlign: 'center', mt: '25px', pt: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
              <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
                Already have an account?{' '}
                <Typography
                  component={Link}
                  href="/login"
                  variant="body2"
                  sx={{ color: '#83C5BE', textDecoration: 'none', fontWeight: 700, '&:hover': { textDecoration: 'underline' } }}
                >
                  Sign In
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}