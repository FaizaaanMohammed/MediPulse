'use client';
import React from 'react';
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
} from '@mui/material';
import { ReceiptOutlined, CheckCircleOutlined } from '@mui/icons-material';

export interface InvoiceItem {
  id: string;
  patientName: string;
  doctorName: string;
  amount: string;
  date: string;
  paymentMode: string;
  status: 'Paid' | 'Pending';
}

interface BillingTableProps {
  invoices: InvoiceItem[];
  onToggleStatus: (id: string) => void;
}

export default function BillingTable({ invoices, onToggleStatus }: BillingTableProps) {
  return (
    <Paper sx={{ bgcolor: '#1E293B', border: '1px solid #334155', borderRadius: '20px', p: { xs: 2, sm: 3 }, overflow: 'hidden' }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ '& th': { borderColor: '#334155', color: '#94A3B8', fontWeight: 700, fontSize: '0.8rem' } }}>
              <TableCell>INVOICE ID</TableCell>
              <TableCell>PATIENT</TableCell>
              <TableCell>DOCTOR</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>MODE</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell align="right">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row) => (
              <TableRow key={row.id} sx={{ '& td': { borderColor: '#334155', color: '#FFFFFF', py: 2 } }}>
                <TableCell sx={{ fontWeight: 700, color: '#83C5BE' }}>{row.id}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{row.patientName}</TableCell>
                <TableCell sx={{ color: '#CBD5E1' }}>{row.doctorName}</TableCell>
                <TableCell sx={{ color: '#CBD5E1' }}>{row.date}</TableCell>
                <TableCell sx={{ color: '#CBD5E1' }}>{row.paymentMode}</TableCell>
                <TableCell sx={{ fontWeight: 800 }}>{row.amount}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    sx={{
                      bgcolor: row.status === 'Paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                      color: row.status === 'Paid' ? '#4ADE80' : '#FBBF24',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  {row.status === 'Pending' && (
                    <IconButton size="small" onClick={() => onToggleStatus(row.id)} sx={{ color: '#4ADE80', border: '1px solid #334155' }}>
                      <CheckCircleOutlined fontSize="small" />
                    </IconButton>
                  )}
                  {row.status === 'Paid' && (
                    <IconButton size="small" sx={{ color: '#83C5BE', border: '1px solid #334155' }}>
                      <ReceiptOutlined fontSize="small" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}