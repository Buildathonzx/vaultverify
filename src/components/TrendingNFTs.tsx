import { motion } from 'framer-motion';
import { Box, Typography, Stack, Paper } from '@mui/material';

interface TrendingItemProps {
  name: string;
  price: string;
  change: number;
}

export function TrendingNFTs() {
  const trendingItems: TrendingItemProps[] = [
    { name: "Bored Ape #1234", price: "86.5 ETH", change: 12.5 },
    { name: "CryptoPunk #9876", price: "74.2 ETH", change: -3.2 },
    { name: "Doodle #4321", price: "15.8 ETH", change: 5.7 },
    { name: "Azuki #6789", price: "32.1 ETH", change: 8.9 }
  ];

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3,
        borderRadius: 4,
        border: '1px solid',
        borderColor: 'divider',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Trending NFTs
      </Typography>
      <Stack spacing={2}>
        {trendingItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 1.5,
                borderRadius: 2,
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              <Typography variant="body1" fontWeight={500}>
                {item.name}
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body1" fontWeight={600}>
                  {item.price}
                </Typography>
                <Typography
                  variant="body2"
                  color={item.change >= 0 ? 'success.main' : 'error.main'}
                  sx={{ fontWeight: 600 }}
                >
                  {item.change >= 0 ? '+' : ''}{item.change}%
                </Typography>
              </Stack>
            </Box>
          </motion.div>
        ))}
      </Stack>
    </Paper>
  );
}