'use client';
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import Link from 'next/link';

export default function LoginPage() {
  const [role, setRole] = useState('CLINIC_ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ role, email, password });
  };

  return (
    <Container maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper sx={{ p: 4, width: '100%' }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" color="primary" gutterBottom>
          MediPulse Login
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
          Sign in to access your portal
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel>Select Role</InputLabel>
            <Select
              value={role}
              label="Select Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="SUPER_ADMIN">Super Admin</MenuItem>
              <MenuItem value="CLINIC_ADMIN">Clinic Admin</MenuItem>
              <MenuItem value="DOCTOR">Doctor</MenuItem>
              <MenuItem value="PATIENT">Patient</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Email Address"
            type="email"
            margin="normal"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          <Box display="flex" justifyContent="space-between">
            <Link href="/register" style={{ fontSize: '0.875rem', color: '#006D77' }}>
              Create Account
            </Link>
            <Link href="/forgot-password" style={{ fontSize: '0.875rem', color: '#8D99AE' }}>
              Forgot Password?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}