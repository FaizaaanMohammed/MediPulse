'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Stack,
  List,
  ListItem,
  ListItemText,
  Box,
  Rating,
  Typography,
} from '@mui/material';
import { Close, Star } from '@mui/icons-material';

interface ModalsProps {
  openDoctor: boolean;
  setOpenDoctor: (val: boolean) => void;
  openAppt: boolean;
  setOpenAppt: (val: boolean) => void;
  openSchedule: boolean;
  setOpenSchedule: (val: boolean) => void;
  openBilling: boolean;
  setOpenBilling: (val: boolean) => void;
  openFeedback: boolean;
  setOpenFeedback: (val: boolean) => void;
}

export default function Modals({
  openDoctor, setOpenDoctor,
  openAppt, setOpenAppt,
  openSchedule, setOpenSchedule,
  openBilling, setOpenBilling,
  openFeedback, setOpenFeedback,
}: ModalsProps) {
  const dialogSx = { bgcolor: '#1E293B', color: '#FFFFFF', borderRadius: '16px', border: '1px solid #334155', minWidth: { xs: '90%', sm: '650px' } };
  const inputStyle = { color: '#FFFFFF', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: '10px' };

  return (
    <>
      {/* Add Doctor Modal */}
      <Dialog open={openDoctor} onClose={() => setOpenDoctor(false)} PaperProps={{ sx: dialogSx }} sx={{minwidth:"400px"}}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add New Doctor <IconButton onClick={() => setOpenDoctor(false)} sx={{ color: '#94A3B8' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#334155' }}>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Doctor Name" placeholder="Dr. John Doe" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
            <TextField fullWidth label="Specialization" placeholder="Cardiologist" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
            <TextField fullWidth label="Consultation Fee (₹)" placeholder="500" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDoctor(false)} sx={{ color: '#94A3B8' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenDoctor(false)} sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' } }}>Save Doctor</Button>
        </DialogActions>
      </Dialog>

      {/* Book Appointment Modal */}
      <Dialog open={openAppt} onClose={() => setOpenAppt(false)} PaperProps={{ sx: dialogSx }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Book New Appointment <IconButton onClick={() => setOpenAppt(false)} sx={{ color: '#94A3B8' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#334155' }}>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Patient Name" placeholder="Rahul Sharma" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
            <TextField fullWidth select label="Assign Doctor" defaultValue="1" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }}>
              <MenuItem value="1">Dr. A. K. Roy (General Physician)</MenuItem>
              <MenuItem value="2">Dr. Sneha Das (Dermatologist)</MenuItem>
            </TextField>
            <TextField fullWidth type="time" label="Time Slot" defaultValue="10:30" InputLabelProps={{ shrink: true, sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenAppt(false)} sx={{ color: '#94A3B8' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenAppt(false)} sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' } }}>Confirm Booking</Button>
        </DialogActions>
      </Dialog>

      {/* Doctor Schedule Modal */}
      <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)} PaperProps={{ sx: dialogSx }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Manage Doctor Schedule <IconButton onClick={() => setOpenSchedule(false)} sx={{ color: '#94A3B8' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#334155' }}>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth select label="Select Doctor" defaultValue="1" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }}>
              <MenuItem value="1">Dr. A. K. Roy</MenuItem>
              <MenuItem value="2">Dr. Sneha Das</MenuItem>
            </TextField>
            <TextField fullWidth label="Available Timings" defaultValue="Mon - Fri (10:00 AM - 04:00 PM)" InputLabelProps={{ sx: { color: '#94A3B8' } }} InputProps={{ sx: inputStyle }} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenSchedule(false)} sx={{ color: '#94A3B8' }}>Cancel</Button>
          <Button variant="contained" onClick={() => setOpenSchedule(false)} sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' } }}>Update Schedule</Button>
        </DialogActions>
      </Dialog>

      {/* Billing Modal */}
      <Dialog open={openBilling} onClose={() => setOpenBilling(false)} PaperProps={{ sx: { ...dialogSx, minWidth: { xs: '90%', sm: '500px' } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Clinic Invoices Summary <IconButton onClick={() => setOpenBilling(false)} sx={{ color: '#94A3B8' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#334155' }}>
          <List>
            <ListItem sx={{ borderBottom: '1px solid #334155' }}>
              <ListItemText primary="Rahul Sharma - Consultation" secondary="₹500 | Paid (Online)" primaryTypographyProps={{ color: '#FFF' }} secondaryTypographyProps={{ color: '#4ADE80' }} />
            </ListItem>
            <ListItem sx={{ borderBottom: '1px solid #334155' }}>
              <ListItemText primary="Priya Verma - OPD + Lab" secondary="₹1,200 | Pending (Cash)" primaryTypographyProps={{ color: '#FFF' }} secondaryTypographyProps={{ color: '#FBBF24' }} />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" onClick={() => setOpenBilling(false)} sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' } }}>Close Summary</Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={openFeedback} onClose={() => setOpenFeedback(false)} PaperProps={{ sx: { ...dialogSx, minWidth: { xs: '90%', sm: '500px' } } }}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Recent Patient Feedback <IconButton onClick={() => setOpenFeedback(false)} sx={{ color: '#94A3B8' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#334155' }}>
          <Stack spacing={2} mt={1}>
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={700}>Amitav Ghosh</Typography>
                <Rating value={5} readOnly size="small" emptyIcon={<Star style={{ color: '#334155' }} />} />
              </Box>
              <Typography variant="body2" color="#CBD5E1" mt={1}>"Excellent service, Dr. Roy was very detailed and friendly!"</Typography>
            </Box>
            <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.04)', borderRadius: '10px' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={700}>Priya Verma</Typography>
                <Rating value={4} readOnly size="small" emptyIcon={<Star style={{ color: '#334155' }} />} />
              </Box>
              <Typography variant="body2" color="#CBD5E1" mt={1}>"Waiting time was slightly long, but consultation was great."</Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="contained" onClick={() => setOpenFeedback(false)} sx={{ bgcolor: '#006D77', '&:hover': { bgcolor: '#004D54' } }}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}