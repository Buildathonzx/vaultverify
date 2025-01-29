import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  { text: 'Portfolio', icon: <AccountBalanceWalletIcon />, href: '/portfolio' },
  { text: 'Alerts', icon: <NotificationsIcon />, href: '/alerts' },
  { text: 'Verify NFT', icon: <VerifiedIcon />, href: '/verify' },
];

const DRAWER_WIDTH = 280;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedItem, setSelectedItem] = useState(menuItems[0].text);

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              href={item.href}
              selected={selectedItem === item.text}
              sx={{
                borderRadius: '12px',
                mx: 1,
                transition: 'all 0.2s ease-in-out',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                  transform: 'translateY(-2px)',
                },
              }}
              onClick={() => setSelectedItem(item.text)}
            >
              <ListItemIcon sx={{ 
                minWidth: 40,
                color: selectedItem === item.text ? 'white' : 'inherit'
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                primaryTypographyProps={{
                  fontWeight: selectedItem === item.text ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      {isDesktop && (
        <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              border: 'none',
              backgroundColor: 'background.paper',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}

      <MotionBox
        component="main"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          flexGrow: 1,
          pt: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
          ml: isDesktop ? `${DRAWER_WIDTH}px` : 0,
          transition: theme.transitions.create(['margin', 'padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </MotionBox>

      <Footer />
    </Box>
  );
}