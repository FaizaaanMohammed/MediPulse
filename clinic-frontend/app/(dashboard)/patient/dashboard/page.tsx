'use client';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Avatar,
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import {
  CalendarMonthOutlined,
  AccessTimeOutlined,
  LocationOnOutlined,
  DownloadOutlined,
  CancelOutlined,
  CheckCircleOutlined,
  QrCode2Outlined,
  ReceiptLongOutlined,
  EventAvailableOutlined,
  TaskAltOutlined,
  PersonOutlined,
  SupportAgentOutlined,
  AddOutlined,
} from '@mui/icons-material';
import Link from 'next/link';

interface Booking {
  id: string;
  passNo: string;
  doctorName: string;
  specialty: string;
  clinic: string;
  doctorImg: string;
  date: string;
  timeSlot: string;
  fee: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
}

export default function MyBookingsPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedPass, setSelectedPass] = useState<Booking | null>(null);
  const [openPassModal, setOpenPassModal] = useState(false);

  const initialBookings: Booking[] = [
    {
      id: 'BK-1001',
      passNo: 'OPD-PASS-8841',
      doctorName: 'Dr. A. K. Roy',
      specialty: 'Cardiology',
      clinic: 'City Health Clinic, Park Street',
      doctorImg: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
      date: '14 Aug, 2026',
      timeSlot: '10:30 AM',
      fee: '₹500',
      status: 'Confirmed',
    },
    {
      id: 'BK-1002',
      passNo: 'OPD-PASS-7729',
      doctorName: 'Dr. Sneha Das',
      specialty: 'Dermatology',
      clinic: 'Park Street Medicare',
      doctorImg: 'https://images.unsplash.com/photo-1594824813566-88855376378e?auto=format&fit=crop&w=400&q=80',
      date: '02 Aug, 2026',
      timeSlot: '11:00 AM',
      fee: '₹600',
      status: 'Completed',
    },
    {
      id: 'BK-1003',
      passNo: 'OPD-PASS-5510',
      doctorName: 'Dr. R. N. Mukherjee',
      specialty: 'Orthopedics',
      clinic: 'Apex Care Clinic',
      doctorImg: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      date: '25 Jul, 2026',
      timeSlot: '02:00 PM',
      fee: '₹700',
      status: 'Cancelled',
    },
  ];

  const [bookings, setBookings] = useState<Booking[]>(initialBookings);

  const handleCancelBooking = (id: string) => {
    if (confirm('Are you sure you want to cancel this OPD appointment?')) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: 'Cancelled' } : b))
      );
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (tabIndex === 1) return b.status === 'Confirmed';
    if (tabIndex === 2) return b.status === 'Completed';
    if (tabIndex === 3) return b.status === 'Cancelled';
    return true;
  });

  const totalCount = bookings.length;
  const upcomingCount = bookings.filter((b) => b.status === 'Confirmed').length;
  const completedCount = bookings.filter((b) => b.status === 'Completed').length;

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 12 }}>
      {/* Top Gradient Banner Header */}
      <Box
        sx={{
          width: '100%',
          backgroundImage: `url('https://html.vikinglab.agency/medicax/assets/img/all-images/bg/bg3.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          pt: { xs: 14, md: 18 },
          pb: { xs: 6, md: 8 },
          mb: 4,
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: '1350px', px: { xs: 2, md: 4 } }}>
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Chip
              label="Patient Portal | Live OPD Passes →"
              size="small"
              sx={{
                bgcolor: '#FFFFFF',
                color: '#4F46E5',
                fontWeight: 800,
                fontSize: '0.85rem',
                px: 2,
                py: 2,
                mb: 2,
                borderRadius: '50px',
                boxShadow: '0 4px 20px rgba(79, 70, 229, 0.08)',
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontWeight: 900,
                color: '#1E1B4B',
                letterSpacing: '-2px',
                fontSize: { xs: '2.4rem', md: '3.4rem' },
                lineHeight: 1.15,
                mb: 1,
              }}
            >
              My Appointments & OPD Passes
            </Typography>
            <Typography variant="body1" sx={{ color: '#475569', fontSize: '1.1rem', fontWeight: 500 }}>
              Manage your booked doctor consultations, view live pass receipts, or download OPD tickets.
            </Typography>
          </Box>

          {/* Elevated Stat Widgets */}
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid #CBD5E1',
                  borderLeft: '6px solid #4F46E5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 10px 25px rgba(30, 27, 75, 0.04)',
                }}
              >
                <Box sx={{ p: 1.5, bgcolor: '#EEF2FF', borderRadius: '16px', color: '#4F46E5', display: 'flex' }}>
                  <ReceiptLongOutlined fontSize="medium" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                    Total Appointments
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#1E1B4B', lineHeight: 1.1 }}>
                    {totalCount}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid #CBD5E1',
                  borderLeft: '6px solid #059669',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 10px 25px rgba(30, 27, 75, 0.04)',
                }}
              >
                <Box sx={{ p: 1.5, bgcolor: '#ECFDF5', borderRadius: '16px', color: '#059669', display: 'flex' }}>
                  <EventAvailableOutlined fontSize="medium" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                    Upcoming OPD Slots
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#059669', lineHeight: 1.1 }}>
                    {upcomingCount}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  bgcolor: '#FFFFFF',
                  borderRadius: '24px',
                  border: '1.5px solid #CBD5E1',
                  borderLeft: '6px solid #818CF8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  boxShadow: '0 10px 25px rgba(30, 27, 75, 0.04)',
                }}
              >
                <Box sx={{ p: 1.5, bgcolor: '#EEF2FF', borderRadius: '16px', color: '#4F46E5', display: 'flex' }}>
                  <TaskAltOutlined fontSize="medium" />
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                    Completed Visits
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 900, color: '#1E1B4B', lineHeight: 1.1 }}>
                    {completedCount}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Grid: Bookings List + Side Panel */}
      <Container maxWidth={false} sx={{ maxWidth: '1350px', px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Left Column (70%): Filter Tabs & Pass Cards */}
          <Grid item xs={12} lg={8} size={{xs:12,lg:8}}>
            {/* Filter Tabs */}
            <Paper
              elevation={0}
              sx={{
                p: 0.8,
                bgcolor: '#FFFFFF',
                borderRadius: '50px',
                border: '1.5px solid #CBD5E1',
                mb: 4,
                display: 'inline-block',
                boxShadow: '0 10px 25px rgba(30, 27, 75, 0.04)',
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={(_, val) => setTabIndex(val)}
                sx={{
                  minHeight: '44px',
                  '& .MuiTabs-indicator': { display: 'none' },
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    borderRadius: '50px',
                    minHeight: '40px',
                    px: 2.8,
                    color: '#64748B',
                    '&.Mui-selected': {
                      bgcolor: '#4F46E5',
                      color: '#FFFFFF',
                    },
                  },
                }}
              >
                <Tab label={`All Passes (${totalCount})`} />
                <Tab label="Upcoming" />
                <Tab label="Completed" />
                <Tab label="Cancelled" />
              </Tabs>
            </Paper>

            {/* Passes List */}
            <Stack spacing={3}>
              {filteredBookings.length === 0 ? (
                <Paper elevation={0} sx={{ p: 6, textAlign: 'center', bgcolor: '#FFFFFF', borderRadius: '32px', border: '1.5px solid #CBD5E1' }}>
                  <ReceiptLongOutlined sx={{ fontSize: 52, color: '#94A3B8', mb: 1 }} />
                  <Typography variant="h6" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
                    No appointments found
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B' }}>
                    There are no OPD bookings available under this category.
                  </Typography>
                </Paper>
              ) : (
                filteredBookings.map((item) => {
                  const isConfirmed = item.status === 'Confirmed';
                  const isCompleted = item.status === 'Completed';

                  return (
                    <Paper
                      key={item.id}
                      elevation={0}
                      sx={{
                        p: 3,
                        bgcolor: '#FFFFFF',
                        borderRadius: '28px',
                        border: '1.5px solid #CBD5E1',
                        boxShadow: '0 12px 30px rgba(30, 27, 75, 0.05)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          borderColor: '#4F46E5',
                          boxShadow: '0 20px 40px rgba(79, 70, 229, 0.12)',
                          transform: 'translateY(-3px)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2.5 }}>
                        {/* Doctor Profile */}
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={item.doctorImg}
                            alt={item.doctorName}
                            sx={{
                              width: 72,
                              height: 72,
                              border: '3px solid #4F46E5',
                              boxShadow: '0 6px 16px rgba(79, 70, 229, 0.15)',
                            }}
                          />
                          <Box>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 900, color: '#1E1B4B', fontSize: '1.15rem' }}>
                                {item.doctorName}
                              </Typography>
                              <Chip
                                label={item.specialty}
                                size="small"
                                sx={{ bgcolor: '#4F46E5', color: '#FFFFFF', fontWeight: 800, fontSize: '0.7rem', height: '22px' }}
                              />
                            </Stack>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#64748B', mb: 0.8 }}>
                              <LocationOnOutlined sx={{ fontSize: 16, color: '#4F46E5' }} />
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#334155', fontSize: '0.85rem' }}>
                                {item.clinic}
                              </Typography>
                            </Box>

                            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                              Pass ID: <span style={{ color: '#1E1B4B', fontWeight: 900 }}>{item.passNo}</span>
                            </Typography>
                          </Box>
                        </Stack>

                        {/* Status Chip */}
                        <Chip
                          icon={
                            isConfirmed ? (
                              <CheckCircleOutlined sx={{ fontSize: '15px !important' }} />
                            ) : isCompleted ? (
                              <CheckCircleOutlined sx={{ fontSize: '15px !important' }} />
                            ) : (
                              <CancelOutlined sx={{ fontSize: '15px !important' }} />
                            )
                          }
                          label={item.status}
                          sx={{
                            bgcolor: isConfirmed ? '#ECFDF5' : isCompleted ? '#EEF2FF' : '#FEF2F2',
                            color: isConfirmed ? '#059669' : isCompleted ? '#4F46E5' : '#DC2626',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            px: 1,
                            py: 1.6,
                            borderRadius: '50px',
                            border: '1px solid',
                            borderColor: isConfirmed ? '#A7F3D0' : isCompleted ? '#C7D2FE' : '#FECACA',
                          }}
                        />
                      </Box>

                      {/* Middle Schedule Bar & Action */}
                      <Box
                        sx={{
                          mt: 2.5,
                          pt: 2,
                          borderTop: '1.5px solid #F1F5F9',
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: { xs: 'flex-start', sm: 'center' },
                          justify: 'space-between',
                          gap: 2,
                        }}
                      >
                        <Stack direction="row" spacing={3} alignItems="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                            <CalendarMonthOutlined sx={{ fontSize: 18, color: '#4F46E5' }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
                              {item.date}
                            </Typography>
                          </Box>

                          <Box sx={{ borderLeft: '1.5px solid #CBD5E1', pl: 3, display: 'flex', alignItems: 'center', gap: 0.8 }}>
                            <AccessTimeOutlined sx={{ fontSize: 18, color: '#059669' }} />
                            <Typography variant="body2" sx={{ fontWeight: 800, color: '#1E1B4B' }}>
                              {item.timeSlot}
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack direction="row" spacing={1.5}>
                          <Button
                            variant="contained"
                            disableElevation
                            size="small"
                            onClick={() => {
                              setSelectedPass(item);
                              setOpenPassModal(true);
                            }}
                            startIcon={<QrCode2Outlined />}
                            sx={{
                              bgcolor: '#4F46E5',
                              '&:hover': { bgcolor: '#4338CA' },
                              fontWeight: 800,
                              borderRadius: '50px',
                              textTransform: 'none',
                              px: 2.5,
                              py: 0.8,
                              fontSize: '0.82rem',
                              boxShadow: '0 6px 16px rgba(79, 70, 229, 0.2)',
                            }}
                          >
                            View OPD Pass
                          </Button>

                          {isConfirmed && (
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={() => handleCancelBooking(item.id)}
                              sx={{
                                borderColor: '#FCA5A5',
                                color: '#DC2626',
                                fontWeight: 800,
                                borderRadius: '50px',
                                textTransform: 'none',
                                px: 2,
                                '&:hover': { bgcolor: '#FEF2F2', borderColor: '#DC2626' },
                              }}
                            >
                              Cancel Slot
                            </Button>
                          )}
                        </Stack>
                      </Box>
                    </Paper>
                  );
                })
              )}
            </Stack>
          </Grid>

          {/* Right Column (30%): Patient Info & Quick Actions Widget */}
          <Grid item xs={12} lg={4} size={{xs:12,lg:4}}>
            <Stack spacing={3}>
              {/* Patient Profile Box */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  bgcolor: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1.5px solid #CBD5E1',
                  boxShadow: '0 10px 25px rgba(30, 27, 75, 0.04)',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#64748B', mb: 2, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  Registered Patient Profile
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2.5 }}>
                  <Avatar sx={{ bgcolor: '#4F46E5', width: 56, height: 56, fontSize: '1.4rem', fontWeight: 900 }}>
                    R
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900, color: '#1E1B4B', lineHeight: 1.2 }}>
                      Rahul Sharma
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      Patient ID: PAT-1082
                    </Typography>
                  </Box>
                </Box>

                <Stack spacing={1.2} sx={{ pt: 2, borderTop: '1.5px solid #F1F5F9', fontSize: '0.88rem' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Phone:</Typography>
                    <Typography variant="caption" sx={{ color: '#1E1B4B', fontWeight: 800 }}>+91 98765 43210</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>Blood Group:</Typography>
                    <Typography variant="caption" sx={{ color: '#1E1B4B', fontWeight: 800 }}>O +ve</Typography>
                  </Box>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  component={Link}
                  href="/patient/search-doctors/all"
                  startIcon={<AddOutlined />}
                  sx={{
                    mt: 3,
                    bgcolor: '#4F46E5',
                    '&:hover': { bgcolor: '#4338CA' },
                    fontWeight: 800,
                    borderRadius: '50px',
                    py: 1.2,
                    textTransform: 'none',
                    fontSize: '0.88rem',
                  }}
                >
                  Book New OPD Slot
                </Button>
              </Paper>

              {/* Need Assistance Desk */}
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
                  borderRadius: '28px',
                  border: '1.5px solid #C7D2FE',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ p: 1, bgcolor: '#4F46E5', borderRadius: '12px', color: '#FFF', display: 'flex' }}>
                    <SupportAgentOutlined />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 900, color: '#1E1B4B' }}>
                    Need Desk Support?
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#475569', mb: 2, lineHeight: 1.6, fontSize: '0.85rem' }}>
                  Facing issues with slot rescheduling or hospital OPD counter verification?
                </Typography>
                <Button
                  component={Link}
                  href="/patient/search-doctors#contact-desk"
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: '#4F46E5',
                    color: '#4F46E5',
                    fontWeight: 800,
                    borderRadius: '50px',
                    textTransform: 'none',
                    bgcolor: '#FFF',
                  }}
                >
                  Contact Health Desk
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* Digital OPD Pass Dialog */}
        <Dialog
          open={openPassModal}
          onClose={() => setOpenPassModal(false)}
          maxWidth="xs"
          fullWidth
          PaperProps={{ sx: { borderRadius: '32px', p: 1 } }}
        >
          <DialogTitle sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#1E1B4B' }}>
              MediPulse OPD Pass
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Show this QR code at hospital reception counter
            </Typography>
          </DialogTitle>

          <DialogContent>
            {selectedPass && (
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: '#F8FAFC',
                    borderRadius: '24px',
                    border: '2px dashed #C7D2FE',
                    mb: 3,
                    display: 'inline-block',
                  }}
                >
                  <QrCode2Outlined sx={{ fontSize: 130, color: '#1E1B4B' }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 900, color: '#4F46E5', mt: 1 }}>
                    {selectedPass.passNo}
                  </Typography>
                </Box>

                <Stack spacing={1.2} textAlign="left" sx={{ bgcolor: '#EEF2FF', p: 2.5, borderRadius: '20px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      Doctor:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#1E1B4B', fontWeight: 900 }}>
                      {selectedPass.doctorName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      Specialty:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#1E1B4B', fontWeight: 900 }}>
                      {selectedPass.specialty}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      Date & Slot:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#059669', fontWeight: 900 }}>
                      {selectedPass.date} ({selectedPass.timeSlot})
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 700 }}>
                      Consultation Fee:
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#1E1B4B', fontWeight: 900 }}>
                      {selectedPass.fee} (Paid)
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            )}
          </DialogContent>

          <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center' }}>
            <Button
              variant="contained"
              disableElevation
              fullWidth
              onClick={() => alert('OPD Pass receipt downloaded!')}
              startIcon={<DownloadOutlined />}
              sx={{
                bgcolor: '#4F46E5',
                '&:hover': { bgcolor: '#4338CA' },
                fontWeight: 800,
                borderRadius: '50px',
                py: 1.4,
                textTransform: 'none',
              }}
            >
              Download PDF Pass
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}