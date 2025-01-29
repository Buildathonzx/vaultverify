'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Box, Container, Typography, Button, Grid, Card, CardContent, IconButton, Stack } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import LockIcon from '@mui/icons-material/Lock';
import { TrendingNFTs } from '@/components/TrendingNFTs';
import { SecurityScore } from '@/components/SecurityScore';
import { FloatingNav } from '@/components/FloatingNav';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

export default function Home() {
  return (
    <>
      <FloatingNav />
      <Box className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)',
            pt: { xs: 12, md: 20 },
            pb: { xs: 8, md: 16 }
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography 
                    variant="h1" 
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 800,
                      lineHeight: 1.2,
                      background: 'linear-gradient(135deg, #1a237e 0%, #0277bd 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2
                    }}
                  >
                    Secure Your NFT Portfolio with Real-Time Protection
                  </Typography>
                  <Typography 
                    variant="h5" 
                    color="text.secondary" 
                    sx={{ mb: 4, maxWidth: 600 }}
                  >
                    Advanced analytics, fraud detection, and portfolio health monitoring to safeguard your digital assets.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                      component={Link}
                      href="/dashboard"
                      variant="contained"
                      size="large"
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                        },
                      }}
                    >
                      Get Started
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        py: 2,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        borderWidth: 2,
                      }}
                    >
                      Watch Demo
                    </Button>
                  </Stack>
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MotionBox
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: '-10%',
                      background: 'radial-gradient(circle, rgba(25,118,210,0.1) 0%, rgba(255,255,255,0) 70%)',
                      borderRadius: '50%',
                      zIndex: 0
                    }
                  }}
                >
                  <Image
                    src="/dashboard-preview.png"
                    alt="Dashboard Preview"
                    width={720}
                    height={480}
                    className="rounded-lg shadow-2xl"
                  />
                </MotionBox>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Live Market Data Section */}
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <TrendingNFTs />
            </Grid>
            <Grid item xs={12} md={4}>
              <SecurityScore />
            </Grid>
          </Grid>
        </Container>

        {/* Features Section */}
        <Container maxWidth="xl" sx={{ py: 12 }}>
          <Grid container spacing={4}>
            {[
              {
                icon: <ShieldIcon sx={{ fontSize: 40 }} />,
                title: 'Real-Time Protection',
                description: 'Continuous monitoring and instant alerts for suspicious activities.',
                color: '#2196f3'
              },
              {
                icon: <SearchIcon sx={{ fontSize: 40 }} />,
                title: 'Fraud Detection',
                description: 'Advanced algorithms to identify potential scams and duplicates.',
                color: '#f50057'
              },
              {
                icon: <AutoGraphIcon sx={{ fontSize: 40 }} />,
                title: 'Portfolio Analytics',
                description: 'Comprehensive insights into your NFT collection\'s performance.',
                color: '#00bfa5'
              },
              {
                icon: <LockIcon sx={{ fontSize: 40 }} />,
                title: 'Secure Verification',
                description: 'Validate authenticity of NFTs before making purchases.',
                color: '#ff9100'
              }
            ].map((feature, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <MotionCard
                  variant="outlined"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                      borderColor: feature.color
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <IconButton
                      sx={{
                        mb: 2,
                        color: 'white',
                        bgcolor: feature.color,
                        '&:hover': { bgcolor: feature.color },
                        p: 2
                      }}
                    >
                      {feature.icon}
                    </IconButton>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Stats Section */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
          <Container maxWidth="xl">
            <Grid container spacing={4} justifyContent="center">
              {[
                { value: '100K+', label: 'NFTs Protected' },
                { value: '$50M+', label: 'Portfolio Value Secured' },
                { value: '99.9%', label: 'Fraud Detection Rate' },
                { value: '24/7', label: 'Real-time Monitoring' }
              ].map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    textAlign="center"
                  >
                    <Typography variant="h3" fontWeight={700} mb={1}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* CTA Section */}
        <Box 
          sx={{ 
            py: 12,
            background: 'linear-gradient(135deg, #f6f9fc 0%, #ffffff 100%)'
          }}
        >
          <Container maxWidth="md">
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              textAlign="center"
            >
              <Typography
                variant="h2"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #1a237e 0%, #0277bd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Ready to Secure Your NFTs?
              </Typography>
              <Typography variant="h5" color="text.secondary" paragraph>
                Join thousands of collectors who trust VaultVerify to protect their digital assets.
              </Typography>
              <Button
                component={Link}
                href="/dashboard"
                variant="contained"
                size="large"
                sx={{
                  mt: 4,
                  py: 2,
                  px: 6,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                  },
                }}
              >
                Start Protecting Your NFTs
              </Button>
            </MotionBox>
          </Container>
        </Box>
      </Box>
    </>
  );
}