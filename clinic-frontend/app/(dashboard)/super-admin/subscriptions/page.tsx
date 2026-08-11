'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import SubscriptionCard from './components/SubscriptionCard';
import PlanModal, { PlanData } from './components/PlanModal';

export default function SubscriptionsPage() {
  const [plans, setPlans] = useState([
    {
      id: 'plan-1',
      name: 'Free Trial Starter',
      price: '₹0',
      period: '14 Days Trial',
      clinics: '12 Active Clinics',
      features: ['Up to 2 Doctors', '50 Monthly Appointments', 'Basic Patient Queue', 'Standard Email Support'],
      highlight: false,
    },
    {
      id: 'plan-2',
      name: 'Pro Monthly Tier',
      price: '₹4,999',
      period: 'per Month / Clinic',
      clinics: '22 Active Clinics',
      features: [
        'Up to 10 Doctors',
        'Unlimited Appointments',
        'Razorpay Payment Gateway',
        'Patient Feedback Analytics',
        'Priority Desk Support',
      ],
      highlight: true,
    },
    {
      id: 'plan-3',
      name: 'Enterprise Yearly Plan',
      price: '₹49,999',
      period: 'per Year / Clinic',
      clinics: '8 Active Clinics',
      features: [
        'Unlimited Doctors & Staff',
        'Custom Domain Branding',
        'WhatsApp Notification API',
        'Advanced Revenue Analytics',
        '24/7 Root Support',
      ],
      highlight: false,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanData | null>(null);

  const handleCreateOpen = () => {
    setSelectedPlan(null);
    setModalOpen(true);
  };

  const handleEditOpen = (plan: PlanData) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const handleSavePlan = (planData: PlanData) => {
    if (planData.id) {
      setPlans((prev) =>
        prev.map((p) => (p.id === planData.id ? { ...p, ...planData } : p))
      );
    } else {
      setPlans((prev) => [
        ...prev,
        { ...planData, id: `plan-${Date.now()}`, clinics: '0 Active Clinics' },
      ]);
    }
    setModalOpen(false);
  };

  return (
    <Box sx={{ color: '#FFFFFF' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
            SaaS Subscription Plans Management
          </Typography>
          <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5, fontWeight: 500 }}>
            Configure multi-tenant subscription tiers, trial periods, and billing capabilities.
          </Typography>
        </Box>

        <Button
          variant="contained"
          disableElevation
          onClick={handleCreateOpen}
          startIcon={<AddOutlined />}
          sx={{
            bgcolor: '#006D77',
            '&:hover': { bgcolor: '#004D54' },
            fontWeight: 800,
            borderRadius: '12px',
            px: 3,
            py: 1.1,
            textTransform: 'none',
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(0, 109, 119, 0.4)',
          }}
        >
          Create New Plan
        </Button>
      </Box>

      {/* Plans Grid */}
      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} size={{xs:12,md:4}} key={plan.id}>
            <SubscriptionCard plan={plan} onEdit={handleEditOpen} />
          </Grid>
        ))}
      </Grid>

      {/* Plan Form Modal Component */}
      <PlanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSavePlan}
        initialData={selectedPlan}
      />
    </Box>
  );
}