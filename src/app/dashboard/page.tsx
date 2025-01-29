'use client';

import { useWallet } from '@/hooks/useWallet';
import { NFTCard } from '@/components/NFTCard';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress,
  Box,
  Button,
  Stack,
  Fade,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SecurityIcon from '@mui/icons-material/Security';

const MotionPaper = motion(Paper);

export default function Dashboard() {
  const { walletInfo } = useWallet();

  if (!walletInfo) {
    return (
      <Container>
        <Box 
          sx={{ 
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Fade in>
            <MotionPaper
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              elevation={2}
              sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}
            >
              <AccountBalanceWalletIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Connect Your Wallet
              </Typography>
              <Typography color="text.secondary" paragraph>
                Connect your wallet to view your NFT portfolio health and analytics
              </Typography>
              <Button variant="contained" size="large">
                Connect Wallet
              </Button>
            </MotionPaper>
          </Fade>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Portfolio Overview */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Portfolio Overview
          </Typography>
        </Grid>

        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            elevation={1}
          >
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <SecurityIcon color="primary" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="overline">Portfolio Health</Typography>
                    <Typography variant="h4">
                      {walletInfo.portfolioHealth.overallScore}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={walletInfo.portfolioHealth.overallScore}
                      sx={{ mt: 1, mb: 0.5, height: 8, borderRadius: 4 }}
                    />
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            elevation={1}
          >
            <Card>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <TrendingUpIcon color="primary" />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="overline">Total Value</Typography>
                    <Typography variant="h4">
                      {walletInfo.portfolioHealth.totalValue.toFixed(2)} ETH
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Across {walletInfo.nfts.length} NFTs
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </MotionPaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <MotionPaper
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            elevation={1}
          >
            <Card>
              <CardContent>
                <Typography variant="overline">Risk Distribution</Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" gutterBottom>
                    Low Risk
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={walletInfo.portfolioHealth.riskDistribution.low}
                    color="success"
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" gutterBottom>
                    Medium Risk
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={walletInfo.portfolioHealth.riskDistribution.medium}
                    color="warning"
                    sx={{ height: 8, borderRadius: 4, mb: 1 }}
                  />
                  <Typography variant="body2" gutterBottom>
                    High Risk
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={walletInfo.portfolioHealth.riskDistribution.high}
                    color="error"
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </MotionPaper>
        </Grid>

        {/* Top Performers */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5">Top Performers</Typography>
            <Button variant="outlined" color="primary">
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {walletInfo.portfolioHealth.topPerformers.map((nft, index) => (
              <Grid item xs={12} sm={6} md={4} key={nft.id}>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <NFTCard nft={nft} />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}