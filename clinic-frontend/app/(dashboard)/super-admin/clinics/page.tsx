'use client';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Avatar,
  Stack,
  TextField,
  InputAdornment,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Grid,
} from '@mui/material';
import {
  SearchOutlined,
  CheckCircleOutlined,
  BlockOutlined,
  VisibilityOutlined,
  CloseOutlined,
  LocalHospitalOutlined,
} from '@mui/icons-material';

interface Clinic {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  plan: string;
  status: 'Pending' | 'Approved' | 'Suspended';
  registeredDate: string;
  doctorsCount: number;
  ownerName: string;
}

export default function ClinicsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const [clinics, setClinics] = useState<Clinic[]>([
    {
      id: 'CLN-101',
      name: 'City Health Medicare',
      email: 'contact@cityhealth.com',
      phone: '+91 98310 11223',
      city: 'Park Street, Kolkata',
      plan: 'Enterprise SaaS',
      status: 'Approved',
      registeredDate: '10 Aug, 2026',
      doctorsCount: 14,
      ownerName: 'Dr. Ramesh Verma',
    },
    {
      id: 'CLN-102',
      name: 'Apex Ortho Specialty',
      email: 'admin@apexortho.in',
      phone: '+91 98300 44556',
      city: 'Salt Lake, Kolkata',
      plan: 'Pro Monthly',
      status: 'Pending',
      registeredDate: '11 Aug, 2026',
      doctorsCount: 6,
      ownerName: 'Dr. Priya Sen',
    },
    {
      id: 'CLN-103',
      name: 'Woodlands Multi-Care',
      email: 'info@woodlands.org',
      phone: '+91 98311 99887',
      city: 'Alipore, Kolkata',
      plan: 'Enterprise SaaS',
      status: 'Approved',
      registeredDate: '01 Aug, 2026',
      doctorsCount: 30,
      ownerName: 'Sanjay Mukherjee',
    },
    {
      id: 'CLN-104',
      name: 'CareFirst Diagnostics',
      email: 'carefirst@gmail.com',
      phone: '+91 98322 33445',
      city: 'Howrah, Kolkata',
      plan: 'Starter Trial',
      status: 'Suspended',
      registeredDate: '20 Jul, 2026',
      doctorsCount: 2,
      ownerName: 'Amitabh Roy',
    },
  ]);

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Suspended') => {
    setClinics((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedClinic && selectedClinic.id === id) {
      setSelectedClinic((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const filteredClinics = clinics.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ color: '#FFFFFF' }}>
      {/* Title */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
          Clinic Approvals & Governance
        </Typography>
        <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5, fontWeight: 500 }}>
          Approve pending clinic onboarding requests, suspend non-compliant tenants, or inspect clinic data.
        </Typography>
      </Box>

      {/* Dark Filter Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          mb: 3,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            placeholder="Search clinic name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlined sx={{ color: '#83C5BE' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                borderRadius: '12px',
                height: '44px',
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
                '&:hover fieldset': { borderColor: '#83C5BE' },
              },
            }}
          />

          <TextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                borderRadius: '12px',
                height: '44px',
                fontWeight: 700,
                bgcolor: 'rgba(255, 255, 255, 0.04)',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.15)' },
              },
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
            <MenuItem value="All">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending Approval</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Suspended">Suspended</MenuItem>
          </TextField>
        </Stack>
      </Paper>

      {/* Dark Table */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ '& th': { fontWeight: 800, color: '#94A3B8', borderBottom: '1px solid rgba(255, 255, 255, 0.15)' } }}>
                <TableCell sx={{ color: '#94A3B8' }}>Clinic</TableCell>
                <TableCell sx={{ color: '#94A3B8' }}>Contact Email</TableCell>
                <TableCell sx={{ color: '#94A3B8' }}>Location</TableCell>
                <TableCell sx={{ color: '#94A3B8' }}>Subscription</TableCell>
                <TableCell sx={{ color: '#94A3B8' }}>Registered On</TableCell>
                <TableCell sx={{ color: '#94A3B8' }}>Status</TableCell>
                <TableCell align="right" sx={{ color: '#94A3B8' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClinics.map((row) => (
                <TableRow key={row.id} hover sx={{ '& td': { borderBottom: '1px solid rgba(255, 255, 255, 0.08)' } }}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ bgcolor: '#006D77', color: '#83C5BE', fontWeight: 900, width: 38, height: 38 }}>
                        {row.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF' }}>
                          {row.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#94A3B8' }}>{row.id}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#CBD5E1' }}>{row.email}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: '#FFFFFF' }}>{row.city}</TableCell>
                  <TableCell>
                    <Chip label={row.plan} size="small" sx={{ bgcolor: 'rgba(131, 197, 190, 0.15)', color: '#83C5BE', fontWeight: 800 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500, color: '#CBD5E1' }}>{row.registeredDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      sx={{
                        bgcolor: row.status === 'Approved' ? 'rgba(52, 211, 153, 0.15)' : row.status === 'Pending' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                        color: row.status === 'Approved' ? '#34D399' : row.status === 'Pending' ? '#FBBF24' : '#F87171',
                        fontWeight: 800,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      {row.status === 'Pending' && (
                        <Button
                          size="small"
                          variant="contained"
                          disableElevation
                          onClick={() => handleStatusChange(row.id, 'Approved')}
                          startIcon={<CheckCircleOutlined />}
                          sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, fontWeight: 800, textTransform: 'none', borderRadius: '8px' }}
                        >
                          Approve
                        </Button>
                      )}

                      {row.status === 'Approved' && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          onClick={() => handleStatusChange(row.id, 'Suspended')}
                          startIcon={<BlockOutlined />}
                          sx={{ fontWeight: 800, textTransform: 'none', borderRadius: '8px' }}
                        >
                          Suspend
                        </Button>
                      )}

                      <Button
                        size="small"
                        onClick={() => setSelectedClinic(row)}
                        sx={{ color: '#83C5BE', fontWeight: 800, textTransform: 'none' }}
                        startIcon={<VisibilityOutlined />}
                      >
                        Inspect
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Inspect Clinic Details Modal */}
      <Dialog
        open={Boolean(selectedClinic)}
        onClose={() => setSelectedClinic(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#1E293B',
            color: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            p: 1,
          },
        }}
      >
        {selectedClinic && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ p: 1, bgcolor: 'rgba(131, 197, 190, 0.15)', color: '#83C5BE', borderRadius: '12px', display: 'flex' }}>
                  <LocalHospitalOutlined />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 900, color: '#FFF' }}>
                    {selectedClinic.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#83C5BE', fontWeight: 700 }}>
                    Tenant ID: {selectedClinic.id}
                  </Typography>
                </Box>
              </Stack>

              <Button onClick={() => setSelectedClinic(null)} sx={{ color: '#94A3B8', minWidth: 'auto', p: 1 }}>
                <CloseOutlined />
              </Button>
            </DialogTitle>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <DialogContent sx={{ py: 3 }}>
              <Grid container spacing={2.5}>
                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Owner / Admin</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#FFF' }}>{selectedClinic.ownerName}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Contact Phone</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#FFF' }}>{selectedClinic.phone}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Assigned SaaS Plan</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip label={selectedClinic.plan} size="small" sx={{ bgcolor: 'rgba(131, 197, 190, 0.2)', color: '#83C5BE', fontWeight: 800 }} />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Current Tenant Status</Typography>
                  <Box sx={{ mt: 0.5 }}>
                    <Chip
                      label={selectedClinic.status}
                      size="small"
                      sx={{
                        bgcolor: selectedClinic.status === 'Approved' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                        color: selectedClinic.status === 'Approved' ? '#34D399' : '#F87171',
                        fontWeight: 800,
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Doctors Onboarded</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#FFF' }}>{selectedClinic.doctorsCount} Active Doctors</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Onboarded Date</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#FFF' }}>{selectedClinic.registeredDate}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600 }}>Location Address</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#CBD5E1', mt: 0.5 }}>{selectedClinic.city}</Typography>
                </Grid>
              </Grid>
            </DialogContent>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />

            <DialogActions sx={{ p: 2 }}>
              {selectedClinic.status === 'Pending' && (
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => handleStatusChange(selectedClinic.id, 'Approved')}
                  sx={{ bgcolor: '#059669', '&:hover': { bgcolor: '#047857' }, fontWeight: 800, borderRadius: '10px' }}
                >
                  Approve Registration
                </Button>
              )}

              {selectedClinic.status === 'Approved' && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleStatusChange(selectedClinic.id, 'Suspended')}
                  sx={{ fontWeight: 800, borderRadius: '10px' }}
                >
                  Suspend Tenant
                </Button>
              )}

              <Button onClick={() => setSelectedClinic(null)} sx={{ color: '#94A3B8', fontWeight: 700 }}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}