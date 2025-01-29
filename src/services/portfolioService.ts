import { NFT, PortfolioHealth, RiskFactor } from '../types';
import { NFTApi } from '../lib/nftApi';

export class PortfolioService {
  private nftApi: NFTApi;

  constructor() {
    this.nftApi = new NFTApi();
  }

  async analyzePortfolio(address: string): Promise<PortfolioHealth> {
    const nfts = await this.nftApi.getNFTsByWallet(address);
    const totalValue = this.calculateTotalValue(nfts);
    const riskDistribution = this.calculateRiskDistribution(nfts);
    const topPerformers = this.getTopPerformers(nfts);
    const overallScore = this.calculateOverallScore(nfts, riskDistribution);

    return {
      overallScore,
      totalValue,
      riskDistribution,
      topPerformers
    };
  }

  private calculateTotalValue(nfts: NFT[]): number {
    return nfts.reduce((total, nft) => total + nft.value.current, 0);
  }

  private calculateRiskDistribution(nfts: NFT[]) {
    const distribution = { low: 0, medium: 0, high: 0 };
    const total = nfts.length;

    nfts.forEach(nft => {
      const highestRisk = this.getHighestRiskSeverity(nft.riskFactors);
      distribution[highestRisk.toLowerCase() as keyof typeof distribution]++;
    });

    // Convert to percentages
    return {
      low: (distribution.low / total) * 100,
      medium: (distribution.medium / total) * 100,
      high: (distribution.high / total) * 100
    };
  }

  private getHighestRiskSeverity(risks: RiskFactor[]): RiskFactor['severity'] {
    if (risks.some(r => r.severity === 'HIGH')) return 'HIGH';
    if (risks.some(r => r.severity === 'MEDIUM')) return 'MEDIUM';
    return 'LOW';
  }

  private getTopPerformers(nfts: NFT[]): NFT[] {
    return nfts
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, 5);
  }

  private calculateOverallScore(nfts: NFT[], riskDistribution: PortfolioHealth['riskDistribution']): number {
    if (nfts.length === 0) return 0;

    // Weight factors for scoring
    const weights = {
      avgHealthScore: 0.4,
      riskDistribution: 0.3,
      diversification: 0.3
    };

    // Calculate average health score
    const avgHealthScore = nfts.reduce((sum, nft) => sum + nft.healthScore, 0) / nfts.length;

    // Calculate risk score (inverse of high risk percentage)
    const riskScore = 100 - riskDistribution.high;

    // Calculate diversification score based on unique collections
    const uniqueCollections = new Set(nfts.map(nft => nft.collection)).size;
    const diversificationScore = Math.min((uniqueCollections / nfts.length) * 100, 100);

    // Calculate weighted score
    const weightedScore = 
      (avgHealthScore * weights.avgHealthScore) +
      (riskScore * weights.riskDistribution) +
      (diversificationScore * weights.diversification);

    return Math.round(weightedScore);
  }
}