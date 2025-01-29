import { useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Container,
  Button,
  Stack,
  useScrollTrigger,
  Slide,
  IconButton,
} from '@mui/material';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MotionAppBar = motion(AppBar);

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  useEffect(() => {
    setIsVisible(trigger);
  }, [trigger]);

  return (
    <Slide appear={false} direction="down" in={isVisible}>
      <MotionAppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          top: 2,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto',
          maxWidth: '90%',
          borderRadius: 3,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: '56px' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                startIcon={<AccountBalanceWalletIcon />}
                sx={{
                  borderRadius: 2,
                  px: 3,
                  py: 1,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                Launch App
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </MotionAppBar>
    </Slide>
  );
}