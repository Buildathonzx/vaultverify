'use client';

import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function RootLoading() {
  const theme = useTheme();

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.secondary.light}10)`,
      }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <CircularProgress 
          size={60}
          thickness={4}
          sx={{
            color: theme.palette.primary.main,
            mb: 2
          }}
        />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Typography 
          variant="h6" 
          color="primary"
          sx={{ 
            fontWeight: 600,
            textAlign: 'center',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Loading VaultVerify
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ 
            mt: 1,
            textAlign: 'center' 
          }}
        >
          Preparing your secure NFT environment...
        </Typography>
      </motion.div>
    </MotionBox>
  );
}