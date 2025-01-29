import { motion } from 'framer-motion';
import { Box, Typography, Paper, CircularProgress, Tooltip, IconButton } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShieldIcon from '@mui/icons-material/Shield';

export function SecurityScore() {
  const score = 92;
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'success.main';
    if (value >= 70) return 'warning.main';
    return 'error.main';
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={600}>
            Security Score
          </Typography>
          <Tooltip title="Your overall portfolio security score based on risk factors and market analysis">
            <IconButton size="small">
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={120}
                thickness={4}
                sx={{ color: 'grey.200' }}
              />
              <CircularProgress
                variant="determinate"
                value={score}
                size={120}
                thickness={4}
                sx={{
                  color: getScoreColor(score),
                  position: 'absolute',
                  left: 0,
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ShieldIcon 
                  sx={{ 
                    fontSize: 32, 
                    mb: 0.5,
                    color: getScoreColor(score)
                  }} 
                />
                <Typography
                  variant="h4"
                  component="div"
                  color="text.primary"
                  fontWeight="bold"
                >
                  {score}
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Your portfolio is well-protected
          </Typography>
        </Box>
      </Box>

      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${getScoreColor(score)}15 0%, transparent 70%)`,
          borderRadius: '50%',
          zIndex: 0
        }}
      />
    </Paper>
  );
}