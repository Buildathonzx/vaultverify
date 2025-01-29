import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Stack, IconButton, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { NFT, RiskFactor } from '../types';

interface NFTCardProps {
  nft: NFT;
  onClick?: (nft: NFT) => void;
}

const MotionCard = motion(Card);

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getRiskSeverityColor = (severity: RiskFactor['severity']) => {
    switch (severity) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
    }
  };

  return (
    <MotionCard
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(nft)}
      sx={{ 
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%' }}>
        <CardMedia
          component="img"
          image={nft.image}
          alt={nft.name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            borderRadius: '16px',
            px: 1,
            py: 0.5,
            boxShadow: 1
          }}
        >
          <Chip
            size="small"
            label={`${nft.healthScore}/100`}
            color={getHealthColor(nft.healthScore)}
          />
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography variant="h6" noWrap>{nft.name}</Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {nft.collection}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="subtitle2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="h6">
              {nft.value.current} ETH
            </Typography>
          </Box>

          {nft.riskFactors.length > 0 && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Risk Factors
                </Typography>
                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  sx={{ ml: 'auto' }}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Box>
              
              <Collapse in={expanded}>
                <Stack spacing={0.5}>
                  {nft.riskFactors.map((risk, index) => (
                    <Chip
                      key={index}
                      size="small"
                      label={risk.type.replace('_', ' ')}
                      color={getRiskSeverityColor(risk.severity)}
                      variant="outlined"
                      sx={{ maxWidth: '100%' }}
                    />
                  ))}
                </Stack>
              </Collapse>
            </>
          )}
        </Stack>
      </CardContent>
    </MotionCard>
  );
}