'use client';
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';

// Local Components Import
import DoctorsHero from './components/DoctorsHero';
import SearchFilterBar from './components/SearchFilterBar';
import DoctorCard, { Doctor } from './components/DoctorCard';
import FeedbackModal from './components/FeedbackModal';
import BlogSection from './components/BlogSection';

// Shared Modal Import
import BookingModal from '../components/BookingModal';

export default function AllDoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [openBookingModal, setOpenBookingModal] = useState(false);

  // Feedback State
  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);
  const [feedbackDoctor, setFeedbackDoctor] = useState<Doctor | null>(null);
  const [userRating, setUserRating] = useState<number | null>(5);
  const [userComment, setUserComment] = useState('');

  const doctors: Doctor[] = [
    {
      id: 'DOC-1',
      name: 'Dr. A. K. Roy',
      specialty: 'Cardiology',
      clinic: 'City Health Clinic',
      experience: '12 Yrs',
      fee: '₹500',
      rating: 4.8,
      availableSlot: '10:30 AM',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'DOC-2',
      name: 'Dr. Sneha Das',
      specialty: 'Dermatology',
      clinic: 'Park Street Medicare',
      experience: '8 Yrs',
      fee: '₹600',
      rating: 4.9,
      availableSlot: '11:00 AM',
      img: 'https://images.unsplash.com/photo-1594824813566-88855376378e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'DOC-3',
      name: 'Dr. R. N. Mukherjee',
      specialty: 'Orthopedics',
      clinic: 'Apex Care Clinic',
      experience: '15 Yrs',
      fee: '₹700',
      rating: 4.7,
      availableSlot: '02:00 PM',
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'DOC-4',
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrics',
      clinic: 'Apollo Children Hub',
      experience: '10 Yrs',
      fee: '₹550',
      rating: 4.9,
      availableSlot: '04:30 PM',
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'DOC-5',
      name: 'Dr. Vikram Malhotra',
      specialty: 'Neurology',
      clinic: 'Fortis Healthcare',
      experience: '18 Yrs',
      fee: '₹900',
      rating: 4.9,
      availableSlot: '06:00 PM',
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'DOC-6',
      name: 'Dr. Ananya Sen',
      specialty: 'Gynaecology',
      clinic: 'Woodlands Medical',
      experience: '11 Yrs',
      fee: '₹650',
      rating: 4.8,
      availableSlot: '11:30 AM',
      img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const specialtiesList = ['All', 'Cardiology', 'Dermatology', 'Orthopedics', 'Pediatrics', 'Neurology', 'Gynaecology'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.clinic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleOpenFeedback = (doc: Doctor) => {
    setFeedbackDoctor(doc);
    setOpenFeedbackModal(true);
  };

  const handleSubmitFeedback = (rating: number | null, comment: string) => {
    alert(`Thank you! Your ${rating}-star review for ${feedbackDoctor?.name} has been submitted.`);
    setOpenFeedbackModal(false);
    setUserComment('');
    setUserRating(5);
  };

  return (
    <Box sx={{ bgcolor: '#F8FAFC', minHeight: '100vh', pb: 0, width: '100%' }}>
      {/* 1. Doctors Page Hero Banner */}
      <DoctorsHero />

      {/* 2. Main Container with EXACT 1350px Max Width */}
      <Container maxWidth={false} sx={{ maxWidth: '1350px', px: { xs: 2, md: 4 }, mb: 8 }}>
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
          specialtiesList={specialtiesList}
        />

        {/* CSS Flexbox Grid with 100% Exact Width Matching Search Bar */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2.5,
            width: '100%',
          }}
        >
          {filteredDoctors.map((doc) => (
            <Box
              key={doc.id}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 20px)',
                  md: '1 1 calc(33.333% - 20px)',
                  lg: '1 1 calc(25% - 20px)',
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 20px)',
                  md: 'calc(33.333% - 20px)',
                  lg: 'calc(25% - 20px)',
                },
                boxSizing: 'border-box',
              }}
            >
              <DoctorCard
                doctor={doc}
                onBookSlot={(d) => {
                  setSelectedDoctor(d);
                  setOpenBookingModal(true);
                }}
                onGiveFeedback={(d) => handleOpenFeedback(d)}
              />
            </Box>
          ))}
        </Box>
      </Container>

      {/* 3. Health Insights & Blog Section */}
      <BlogSection />

      {/* Modals */}
      <BookingModal
        open={openBookingModal}
        doctor={selectedDoctor}
        onClose={() => setOpenBookingModal(false)}
        onConfirmBooking={() => {}}
      />

      <FeedbackModal
        open={openFeedbackModal}
        doctor={feedbackDoctor}
        onClose={() => setOpenFeedbackModal(false)}
        onSubmit={handleSubmitFeedback}
        userRating={userRating}
        setUserRating={setUserRating}
        userComment={userComment}
        setUserComment={setUserComment}
      />
    </Box>
  );
}