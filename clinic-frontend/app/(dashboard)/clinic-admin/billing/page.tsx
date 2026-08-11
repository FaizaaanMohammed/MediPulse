'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
  MenuItem,
} from '@mui/material';
import { SearchOutlined, AddCardOutlined } from '@mui/icons-material';
import BillingTable, { InvoiceItem } from './components/BillingTable';
import CreateInvoiceModal from './components/CreateInvoiceModal';

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [openModal, setOpenModal] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: 'INV-4091',
      patientName: 'Rahul Sharma',
      doctorName: 'Dr. A. K. Roy',
      amount: '₹500',
      date: '11 Aug 2026',
      paymentMode: 'UPI / Online',
      status: 'Paid',
    },
    {
      id: 'INV-4092',
      patientName: 'Priya Verma',
      doctorName: 'Dr. Sneha Das',
      amount: '₹800',
      date: '11 Aug 2026',
      paymentMode: 'Cash',
      status: 'Pending',
    },
    {
      id: 'INV-4093',
      patientName: 'Amitav Ghosh',
      doctorName: 'Dr. R. N. Mukherjee',
      amount: '₹1,200',
      date: '10 Aug 2026',
      paymentMode: 'Card',
      status: 'Paid',
    },
  ]);

  const handleAddInvoice = (newInvoice: InvoiceItem) => {
    setInvoices((prev) => [newInvoice, ...prev]);
  };

  const handleToggleStatus = (id: string) => {
    setInvoices((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Paid' } : item))
    );
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Billing & Invoices
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
              Manage consultation fee invoices and track payment collections.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={() => setOpenModal(true)}
            startIcon={<AddCardOutlined />}
            sx={{
              bgcolor: '#006D77',
              color: '#FFFFFF',
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              px: 2.5,
              py: 1.1,
              '&:hover': { bgcolor: '#004D54' },
            }}
          >
            Create Invoice
          </Button>
        </Box>

        {/* Filter Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search invoice ID or patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined sx={{ color: '#83C5BE' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              flexGrow: 1,
              minWidth: '250px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                bgcolor: '#1E293B',
                borderRadius: '12px',
                height: '46px',
                '& fieldset': { borderColor: '#334155' },
                '&:hover fieldset': { borderColor: '#83C5BE' },
              },
            }}
          />

          <TextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: '180px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                bgcolor: '#1E293B',
                borderRadius: '12px',
                height: '46px',
                '& fieldset': { borderColor: '#334155' },
              },
            }}
          >
            <MenuItem value="All">All Invoices</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Box>

        {/* Invoice Table */}
        <BillingTable invoices={filteredInvoices} onToggleStatus={handleToggleStatus} />

        {/* Modal */}
        <CreateInvoiceModal open={openModal} onClose={() => setOpenModal(false)} onAddInvoice={handleAddInvoice} />
      </Container>
    </Box>
  );
}