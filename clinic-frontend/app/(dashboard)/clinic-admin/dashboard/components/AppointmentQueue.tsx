'use client';
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from '@mui/material';
import { EventAvailableOutlined, MoreVertOutlined } from '@mui/icons-material';
import Link from 'next/link';

export default function AppointmentQueue() {
  return (
    <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', p: { xs: 2, sm: 3 }, overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <EventAvailableOutlined sx={{ color: '#83C5BE' }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#FFFFFF' }}>Today's Appointment Queue</Typography>
        </Box>
        <Button size="small" component={Link} href="#" sx={{ color: '#83C5BE', textTransform: 'none', fontWeight: 600 }}>View All</Button>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow sx={{ '& th': { borderColor: '#334155', color: '#94A3B8', fontWeight: 700, fontSize: '0.8rem' } }}>
              <TableCell>PATIENT</TableCell>
              <TableCell>DOCTOR</TableCell>
              <TableCell>SLOT TIME</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '& td': { borderColor: '#334155', color: '#FFFFFF', py: 1.8 } }}>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                Rahul Sharma
                <Typography variant="caption" display="block" sx={{ color: '#94A3B8' }}>APT-101</Typography>
              </TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>Dr. A. K. Roy</TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>10:30 AM</TableCell>
              <TableCell>
                <Chip label="In Progress" size="small" color="warning" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" sx={{ color: '#94A3B8' }}><MoreVertOutlined fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>

            <TableRow sx={{ '& td': { borderColor: '#334155', color: '#FFFFFF', py: 1.8 } }}>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                Priya Verma
                <Typography variant="caption" display="block" sx={{ color: '#94A3B8' }}>APT-102</Typography>
              </TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>Dr. Sneha Das</TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>11:00 AM</TableCell>
              <TableCell>
                <Chip label="Waiting" size="small" color="info" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" sx={{ color: '#94A3B8' }}><MoreVertOutlined fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>

            <TableRow sx={{ '& td': { borderColor: '#334155', color: '#FFFFFF', py: 1.8 } }}>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                Amitav Ghosh
                <Typography variant="caption" display="block" sx={{ color: '#94A3B8' }}>APT-103</Typography>
              </TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>Dr. A. K. Roy</TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>11:30 AM</TableCell>
              <TableCell>
                <Chip label="Completed" size="small" color="success" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" sx={{ color: '#94A3B8' }}><MoreVertOutlined fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>

            <TableRow sx={{ '& td': { borderColor: '#334155', color: '#FFFFFF', py: 1.8 } }}>
              <TableCell sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                Sunita Mehra
                <Typography variant="caption" display="block" sx={{ color: '#94A3B8' }}>APT-104</Typography>
              </TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>Dr. R. N. Mukherjee</TableCell>
              <TableCell sx={{ color: '#CBD5E1' }}>12:15 PM</TableCell>
              <TableCell>
                <Chip label="Waiting" size="small" color="info" variant="outlined" sx={{ fontWeight: 700, fontSize: '0.7rem' }} />
              </TableCell>
              <TableCell align="right">
                <IconButton size="small" sx={{ color: '#94A3B8' }}><MoreVertOutlined fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}