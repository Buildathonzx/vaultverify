'use client';

import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

interface ErrorComponentProps {
  error: Error;
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorComponentProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.error.light}10)`,
      }}
    >
      <MotionContainer
        maxWidth="sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionPaper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
          }}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: (theme) => `linear-gradient(45deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Oops!
            </Typography>
          </motion.div>

          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ mb: 4 }}
          >
            {error.message || 'Something went wrong'}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={reset}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Try Again
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              href="/"
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Go Home
            </Button>
          </Box>
        </MotionPaper>
      </MotionContainer>
    </Box>
  );
}