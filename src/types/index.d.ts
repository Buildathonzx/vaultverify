// NFT Types
export interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  tokenId: string;
  contractAddress: string;
  owner: string;
  healthScore: number;
  riskFactors: RiskFactor[];
  value: {
    current: number;
    historical: PriceHistory[];
  };
}

export interface RiskFactor {
  type: 'DUPLICATE' | 'COPYRIGHT' | 'WASH_TRADING' | 'SUSPICIOUS_ACTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
  detectedAt: Date;
}

export interface PriceHistory {
  date: Date;
  price: number;
}

// Wallet Types
export interface WalletInfo {
  address: string;
  network: string;
  balance: number;
  nfts: NFT[];
  portfolioHealth: PortfolioHealth;
}

export interface PortfolioHealth {
  overallScore: number;
  totalValue: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  topPerformers: NFT[];
}

// Alert Types
export interface Alert {
  id: string;
  type: 'PRICE_DROP' | 'FRAUD_DETECTED' | 'SUSPICIOUS_ACTIVITY';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  nftId: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}