'use client';
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Avatar,
  Chip,
  Stack,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DashboardOutlined,
  CalendarMonthOutlined,
  StarOutlineOutlined,
  MenuOutlined,
  LogoutOutlined,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DRAWER_WIDTH = 260;
const HEADER_HEIGHT = 65;

const menuItems = [
  { text: 'My OPD Queue', icon: <DashboardOutlined />, href: '/doctor/dashboard' },
  { text: 'My Schedule', icon: <CalendarMonthOutlined />, href: '/doctor/schedule' },
  { text: 'Ratings & Reviews', icon: <StarOutlineOutlined />, href: '/doctor/feedback' },
];

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#1E293B', color: '#FFFFFF' }}>
      <Box
        sx={{
          height: HEADER_HEIGHT,
          px: 3,
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 900, letterSpacing: '-0.5px', color: '#FFFFFF' }}>
          Medi<span style={{ color: '#83C5BE' }}>Pulse</span>
        </Typography>
        <Chip label="Doctor" size="small" sx={{ bgcolor: 'rgba(0, 109, 119, 0.2)', color: '#83C5BE', fontWeight: 700, fontSize: '0.65rem' }} />
      </Box>

      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                sx={{
                  borderRadius: '12px',
                  bgcolor: isActive ? '#006D77' : 'transparent',
                  color: isActive ? '#FFFFFF' : '#94A3B8',
                  '&:hover': {
                    bgcolor: isActive ? '#004D54' : 'rgba(255,255,255,0.05)',
                    color: '#FFFFFF',
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? '#FFFFFF' : '#83C5BE', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: { fontWeight: isActive ? 700 : 500, fontSize: '0.9rem' },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid #334155' }}>
        <ListItemButton
          component={Link}
          href="/login"
          sx={{ borderRadius: '12px', color: '#F87171', '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' } }}
        >
          <ListItemIcon sx={{ color: '#F87171', minWidth: 40 }}>
            <LogoutOutlined />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            slotProps={{
              primary: {
                sx: { fontWeight: 600, fontSize: '0.9rem' },
              },
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#0F172A' }}>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid #334155',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', width: { md: `calc(100% - ${DRAWER_WIDTH}px)` } }}>
        <Box
          sx={{
            height: HEADER_HEIGHT,
            bgcolor: '#1E293B',
            borderBottom: '1px solid #334155',
            px: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxSizing: 'border-box',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#FFFFFF' }}>
                <MenuOutlined />
              </IconButton>
            )}
          </Box>

          <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
              Dr. A. K. Roy Workspace
            </Typography>

            <IconButton sx={{ color: '#CBD5E1', border: '1px solid #334155' }}>
              <NotificationsNoneOutlined fontSize="small" />
            </IconButton>

            <Avatar sx={{ bgcolor: '#006D77', width: 36, height: 36, fontSize: '0.85rem', fontWeight: 700 }}>
              DR
            </Avatar>
          </Stack>
        </Box>

        <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, md: 4 } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}