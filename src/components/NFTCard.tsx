import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box, Stack, IconButton, Collapse, Tooltip, Badge } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import { NFT, RiskFactor } from '../types';
import { formatEth } from '@/utils/formatters';

interface NFTCardProps {
  nft: NFT;
  onClick?: (nft: NFT) => void;
}

const MotionCard = motion(Card);

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getHealthColor = (score: number): 'success' | 'warning' | 'error' => {
    if (score >= 80) return 'success';
    if (score >= 50) return 'warning';
    return 'error';
  };

  const getRiskSeverityColor = (severity: RiskFactor['severity']): 'success' | 'warning' | 'error' => {
    switch (severity) {
      case 'HIGH': return 'error';
      case 'MEDIUM': return 'warning';
      case 'LOW': return 'success';
    }
  };

  return (
    <MotionCard
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(nft)}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={{ 
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'visible'
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
            objectFit: 'cover',
            transition: 'transform 0.3s ease-in-out',
            ...(isHovered && {
              transform: 'scale(1.05)'
            })
          }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: '16px'
              }}
            >
              <Typography variant="body1" color="white" fontWeight="bold">
                View Details
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            display: 'flex',
            gap: 1
          }}
        >
          <Tooltip title="Health Score">
            <Chip
              icon={<SecurityIcon />}
              size="small"
              label={`${nft.healthScore}`}
              color={getHealthColor(nft.healthScore)}
              sx={{
                fontWeight: 'bold',
                backdropFilter: 'blur(4px)',
                backgroundColor: (theme) => `${theme.palette[getHealthColor(nft.healthScore)].main}CC`
              }}
            />
          </Tooltip>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Stack spacing={1}>
          <Typography variant="h6" noWrap title={nft.name}>
            {nft.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {nft.collection}
          </Typography>
          
          <Box sx={{ mt: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              Current Value
            </Typography>
            <Typography variant="h6" color="primary">
              {formatEth(nft.value.current)}
            </Typography>
          </Box>

          {nft.riskFactors.length > 0 && (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Badge badgeContent={nft.riskFactors.length} color="error">
                  <Typography variant="subtitle2" color="text.secondary">
                    Risk Factors
                  </Typography>
                </Badge>
                <IconButton 
                  size="small" 
                  onClick={(e) => {
                    e.stopPropagation();
                    setExpanded(!expanded);
                  }}
                  sx={{ 
                    ml: 'auto',
                    transform: expanded ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  <InfoOutlinedIcon />
                </IconButton>
              </Box>
              
              <Collapse in={expanded}>
                <Stack spacing={1} sx={{ mt: 1 }}>
                  {nft.riskFactors.map((risk, index) => (
                    <Tooltip key={index} title={risk.description}>
                      <Chip
                        size="small"
                        label={risk.type.replace('_', ' ')}
                        color={getRiskSeverityColor(risk.severity)}
                        variant="outlined"
                        sx={{ 
                          maxWidth: '100%',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                          }
                        }}
                      />
                    </Tooltip>
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