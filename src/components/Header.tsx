import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
  Stack,
  Chip,
  useMediaQuery,
  Slide,
  Badge,
  LinearProgress
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useWallet } from '../hooks/useWallet';
import { formatAddress, formatEth } from '@/utils/formatters';
import { motion, AnimatePresence } from 'framer-motion';

const MotionChip = motion(Chip);

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { walletInfo, isConnecting, connect, disconnect } = useWallet();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const navigationItems = ['Dashboard', 'Portfolio', 'Analytics', 'Alerts'];

  return (
    <>
      <AppBar 
        position="fixed" 
        color="default" 
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.98)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: isScrolled ? '0 4px 6px -1px rgba(0,0,0,0.05)' : 'none',
          borderBottom: `1px solid ${theme.palette.divider}`
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: 70 }}>
            {/* Logo - Desktop */}
            <Typography
              variant="h5"
              component="a"
              href="/"
              sx={{
                mr: 4,
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                background: 'linear-gradient(45deg, #3B82F6 30%, #14B8A6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
                textDecoration: 'none',
              }}
            >
              VaultVerify
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{ p: 1 }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    borderRadius: 2,
                    mt: 1.5,
                  }
                }}
              >
                {navigationItems.map((item) => (
                  <MenuItem key={item} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo - Mobile */}
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontWeight: 700,
                background: 'linear-gradient(45deg, #3B82F6 30%, #14B8A6 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
              }}
            >
              VV
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item}
                  onClick={handleCloseNavMenu}
                  sx={{ 
                    color: 'text.primary',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '2px',
                      bottom: 0,
                      left: 0,
                      backgroundColor: 'primary.main',
                      transform: 'scaleX(0)',
                      transition: 'transform 0.3s ease'
                    },
                    '&:hover::after': {
                      transform: 'scaleX(1)'
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>

            {/* Right Section */}
            <Stack direction="row" spacing={2} alignItems="center">
              {!isMobile && (
                <Badge badgeContent={3} color="error">
                  <IconButton color="inherit" size="small">
                    <NotificationsIcon />
                  </IconButton>
                </Badge>
              )}

              {walletInfo ? (
                <>
                  <AnimatePresence>
                    {!isMobile && (
                      <MotionChip
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        label={`${formatEth(walletInfo.balance)}`}
                        color="primary"
                        variant="outlined"
                        sx={{ fontWeight: 600 }}
                      />
                    )}
                  </AnimatePresence>
                  <Tooltip title="Account settings">
                    <IconButton 
                      onClick={handleOpenUserMenu} 
                      sx={{ 
                        p: 0.5,
                        border: '2px solid',
                        borderColor: 'primary.main',
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          bgcolor: 'primary.main',
                          width: 32,
                          height: 32,
                          fontSize: '0.875rem',
                          fontWeight: 600
                        }}
                      >
                        {formatAddress(walletInfo.address).slice(0, 2)}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        borderRadius: 2,
                        mt: 1.5,
                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
                        border: '1px solid',
                        borderColor: 'divider',
                      }
                    }}
                  >
                    <MenuItem onClick={disconnect}>
                      <Typography>Disconnect</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<AccountBalanceWalletIcon />}
                  onClick={connect}
                  disabled={isConnecting}
                  sx={{
                    minWidth: 140,
                    height: 40,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {isConnecting ? (
                    <>
                      Connecting
                      <LinearProgress 
                        sx={{ 
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 2
                        }} 
                      />
                    </>
                  ) : (
                    'Connect Wallet'
                  )}
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar /> {/* Spacer */}
    </>
  );
}