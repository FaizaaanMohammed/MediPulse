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
  Grid,
} from '@mui/material';
import { SearchOutlined, PersonAddOutlined } from '@mui/icons-material';
import DoctorCard from './components/DoctorCard';
import DoctorFormModal from './components/DoctorFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';

export default function DoctorsManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  
  // Modal States
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);

  const [doctorsList, setDoctorsList] = useState([
    {
      id: 1,
      name: 'Dr. A. K. Roy',
      specialty: 'General Physician',
      email: 'akroy@medipulse.com',
      phone: '+91 98765 12345',
      fee: '₹500',
      status: 'Active' as const,
      experience: '12 Yrs',
    },
    {
      id: 2,
      name: 'Dr. Sneha Das',
      specialty: 'Dermatologist',
      email: 'sneha.das@medipulse.com',
      phone: '+91 98765 67890',
      fee: '₹800',
      status: 'Active' as const,
      experience: '8 Yrs',
    },
    {
      id: 3,
      name: 'Dr. R. N. Mukherjee',
      specialty: 'Cardiologist',
      email: 'rnmukherjee@medipulse.com',
      phone: '+91 98765 11223',
      fee: '₹1,200',
      status: 'On Leave' as const,
      experience: '18 Yrs',
    },
    {
      id: 4,
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrician',
      email: 'priya.s@medipulse.com',
      phone: '+91 98765 44332',
      fee: '₹600',
      status: 'Active' as const,
      experience: '6 Yrs',
    },
  ]);

  // Handler Actions
  const handleToggleStatus = (id: number) => {
    setDoctorsList((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, status: doc.status === 'Active' ? 'On Leave' : 'Active' }
          : doc
      )
    );
  };

  const handleDeleteConfirm = () => {
    if (selectedDoctor) {
      setDoctorsList((prev) => prev.filter((doc) => doc.id !== selectedDoctor.id));
      setOpenDeleteModal(false);
      setSelectedDoctor(null);
    }
  };

  // Search and Filter Logic
  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === 'All' || doc.specialty === specialtyFilter;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 4, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px' }}>
        {/* Header Title & Add Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Doctors Directory
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
              Manage clinic doctors, consultation fees, and working schedules.
            </Typography>
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={() => setOpenAddModal(true)}
            startIcon={<PersonAddOutlined />}
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
            Add Doctor
          </Button>
        </Box>

        {/* Filter Controls Bar */}
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search doctor name or email..."
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
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            sx={{
              minWidth: '200px',
              '& .MuiOutlinedInput-root': {
                color: '#FFFFFF',
                bgcolor: '#1E293B',
                borderRadius: '12px',
                height: '46px',
                '& fieldset': { borderColor: '#334155' },
              },
            }}
          >
            <MenuItem value="All">All Specializations</MenuItem>
            <MenuItem value="General Physician">General Physician</MenuItem>
            <MenuItem value="Dermatologist">Dermatologist</MenuItem>
            <MenuItem value="Cardiologist">Cardiologist</MenuItem>
            <MenuItem value="Pediatrician">Pediatrician</MenuItem>
          </TextField>
        </Box>

        {/* Standard MUI Grid */}
        <Grid container spacing={3}>
          {filteredDoctors.map((doc) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={doc.id} size={{sm:6,md:4,lg:3}}>
              <DoctorCard
                {...doc}
                onEdit={() => { setSelectedDoctor(doc); setOpenAddModal(true); }}
                onToggleStatus={() => handleToggleStatus(doc.id)}
                onDelete={() => { setSelectedDoctor(doc); setOpenDeleteModal(true); }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Modals */}
        <DoctorFormModal open={openAddModal} onClose={() => { setOpenAddModal(false); setSelectedDoctor(null); }} />
        <DeleteConfirmModal
          open={openDeleteModal}
          doctorName={selectedDoctor?.name || ''}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      </Container>
    </Box>
  );
}