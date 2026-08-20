'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Divider,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';
import { CloseOutlined, LocalHospitalOutlined } from '@mui/icons-material';
import api from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';

export default function OnboardClinicModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    subscriptionPlan: '',
  });

  // Modal open hone par subscription plans fetch karein
  useEffect(() => {
    const fetchPlans = async () => {
      setPlansLoading(true);
      try {
        const res = await api.get(API_ENDPOINTS.SUBSCRIPTIONS.GET_ALL);
        const fetchedData = res.data?.data || res.data || [];
        setPlans(fetchedData);
        if (fetchedData.length > 0) {
          setFormData((prev) => ({ ...prev, subscriptionPlan: fetchedData[0]._id }));
        }
      } catch (err) {
        console.error('Failed to fetch plans:', err);
      } finally {
        setPlansLoading(false);
      }
    };

    if (open) {
      fetchPlans();
    } else {
      setFormData({
        name: '',
        ownerName: '',
        email: '',
        phone: '',
        city: '',
        address: '',
        subscriptionPlan: '',
      });
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Direct LocalStorage se logged-in super admin ki user id get karein
      const savedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
      const superAdminOwnerId = savedUser.id || savedUser._id;

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        ownerId: superAdminOwnerId, // Localstorage wali valid MongoDB ObjectId
        subscriptionPlan: formData.subscriptionPlan, // Select plan ki valid _id
      };

      await api.post(API_ENDPOINTS.SUPER_ADMIN.ONBOARD_CLINIC, payload);

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error('Failed to onboard clinic:', err);
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: '#FFF',
      borderRadius: '12px',
      bgcolor: 'rgba(255, 255, 255, 0.06)',
      '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
      '&:hover fieldset': { borderColor: '#83C5BE' },
    },
  };

  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#1E293B',
          color: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)',
          p: 1,
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box sx={{ p: 1, bgcolor: 'rgba(131, 197, 190, 0.15)', color: '#83C5BE', borderRadius: '12px', display: 'flex' }}>
              <LocalHospitalOutlined />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFFFFF' }}>
              Onboard New Clinic Tenant
            </Typography>
          </Box>
          <IconButton onClick={onClose} disabled={loading} sx={{ color: '#94A3B8' }}>
            <CloseOutlined fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        <DialogContent sx={{ py: 3, bgcolor: '#1E293B' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Clinic Name
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="e.g. Apollo Care Specialty"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Clinic Admin / Owner Name
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Dr. Rajesh Sharma"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Contact Email
              </Typography>
              <TextField
                fullWidth
                required
                type="email"
                placeholder="admin@apollocare.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                City
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Kolkata"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Full Address
              </Typography>
              <TextField
                fullWidth
                required
                placeholder="Salt Lake Sector V, Kolkata"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                sx={inputStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" sx={{ color: '#CBD5E1', fontWeight: 600, display: 'block', mb: 0.8 }}>
                Assigned SaaS Tier
              </Typography>
              <TextField
                select
                fullWidth
                required
                disabled={plansLoading}
                value={formData.subscriptionPlan}
                onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
                sx={{
                  ...inputStyles,
                  '& .MuiSvgIcon-root': { color: '#83C5BE' },
                }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: { bgcolor: '#1E293B', color: '#FFF', border: '1px solid rgba(255, 255, 255, 0.15)' },
                    },
                  },
                }}
              >
                {plans.length === 0 ? (
                  <MenuItem value="" disabled>
                    {plansLoading ? 'Loading plans...' : 'No plans available'}
                  </MenuItem>
                ) : (
                  plans.map((plan) => (
                    <MenuItem key={plan._id} value={plan._id}>
                      {plan.name} {plan.price > 0 ? `(₹${plan.price})` : '(Free Trial)'}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        <DialogActions sx={{ p: 2, bgcolor: '#1E293B' }}>
          <Button onClick={onClose} disabled={loading} sx={{ color: '#94A3B8', fontWeight: 700 }}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || plansLoading}
            variant="contained"
            disableElevation
            sx={{
              bgcolor: '#006D77',
              '&:hover': { bgcolor: '#004D54' },
              color: '#FFF',
              fontWeight: 800,
              borderRadius: '10px',
              px: 3,
            }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: '#FFF' }} /> : 'Confirm & Onboard'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}