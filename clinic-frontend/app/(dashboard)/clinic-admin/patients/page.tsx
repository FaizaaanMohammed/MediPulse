'use client';
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material';
import { SearchOutlined, PersonAddOutlined } from '@mui/icons-material';
import PatientTable, { PatientItem } from './components/PatientTable';
import PatientHistoryDrawer from './components/PatientHistoryDrawer';
import AddPatientModal from './components/AddPatientModal';

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientItem | null>(null);

  const [patients, setPatients] = useState<PatientItem[]>([
    {
      id: 'PAT-1082',
      name: 'Rahul Sharma',
      age: '32 Yrs',
      gender: 'Male',
      phone: '+91 98765 12345',
      bloodGroup: 'B+',
      totalVisits: 4,
      lastVisit: '11 Aug 2026',
    },
    {
      id: 'PAT-1083',
      name: 'Priya Verma',
      age: '26 Yrs',
      gender: 'Female',
      phone: '+91 98765 67890',
      bloodGroup: 'O+',
      totalVisits: 2,
      lastVisit: '10 Aug 2026',
    },
    {
      id: 'PAT-1084',
      name: 'Amitav Ghosh',
      age: '45 Yrs',
      gender: 'Male',
      phone: '+91 98765 11223',
      bloodGroup: 'A+',
      totalVisits: 8,
      lastVisit: '05 Aug 2026',
    },
  ]);

  const handleAddPatient = (newPatient: PatientItem) => {
    setPatients((prev) => [newPatient, ...prev]);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0F172A', color: '#FFFFFF', py: 2, fontFamily: 'Inter, sans-serif' }}>
      <Container maxWidth={false} sx={{ maxWidth: '1350px', p: 0 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Patient Records
            </Typography>
            <Typography variant="body2" sx={{ color: '#94A3B8', mt: 0.5 }}>
              Directory of registered clinic patients and medical histories.
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
            Register Patient
          </Button>
        </Box>

        {/* Search */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search patient name, ID, or phone number..."
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
        </Box>

        {/* Table */}
        <PatientTable
          patients={filteredPatients}
          onViewHistory={(patient) => {
            setSelectedPatient(patient);
            setOpenDrawer(true);
          }}
        />

        {/* Modals & Drawers */}
        <AddPatientModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onAddPatient={handleAddPatient}
        />

        <PatientHistoryDrawer
          open={openDrawer}
          patient={selectedPatient}
          onClose={() => {
            setOpenDrawer(false);
            setSelectedPatient(null);
          }}
        />
      </Container>
    </Box>
  );
}