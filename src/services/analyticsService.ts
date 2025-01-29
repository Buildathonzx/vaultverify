import { NFT, RiskFactor, PortfolioHealth } from '@/types';

export class AnalyticsService {
  calculateNFTHealthScore(nft: NFT): number {
    const weights = {
      riskFactors: 0.4,
      priceStability: 0.3,
      liquidityScore: 0.3
    };

    const riskScore = this.calculateRiskScore(nft.riskFactors);
    const priceStabilityScore = this.calculatePriceStability(nft.value.historical);
    const liquidityScore = this.calculateLiquidityScore(nft);

    return Math.round(
      (riskScore * weights.riskFactors) +
      (priceStabilityScore * weights.priceStability) +
      (liquidityScore * weights.liquidityScore)
    );
  }

  private calculateRiskScore(riskFactors: RiskFactor[]): number {
    if (riskFactors.length === 0) return 100;

    const severityWeights = {
      HIGH: 30,
      MEDIUM: 15,
      LOW: 5
    };

    const totalPenalty = riskFactors.reduce((penalty, factor) => 
      penalty + severityWeights[factor.severity], 0);

    return Math.max(0, 100 - totalPenalty);
  }

  private calculatePriceStability(priceHistory: { date: Date; price: number }[]): number {
    if (priceHistory.length < 2) return 50; // Neutral score for insufficient data

    // Calculate price volatility using standard deviation
    const prices = priceHistory.map(h => h.price);
    const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
    const variance = prices.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / prices.length;
    const volatility = Math.sqrt(variance) / mean;

    // Convert volatility to a 0-100 score (lower volatility = higher score)
    return Math.round(Math.max(0, 100 - (volatility * 100)));
  }

  private calculateLiquidityScore(nft: NFT): number {
    // This would typically involve analyzing:
    // - Trading volume
    // - Number of holders
    // - Time between trades
    // For now, returning a placeholder score
    return 70;
  }

  generatePortfolioAnalytics(nfts: NFT[]): PortfolioHealth {
    if (nfts.length === 0) {
      return {
        overallScore: 0,
        totalValue: 0,
        riskDistribution: { low: 0, medium: 0, high: 0 },
        topPerformers: []
      };
    }

    const totalValue = nfts.reduce((sum, nft) => sum + nft.value.current, 0);
    const riskDistribution = this.calculateRiskDistribution(nfts);
    const topPerformers = this.getTopPerformers(nfts);
    const overallScore = this.calculateOverallPortfolioScore(nfts, riskDistribution);

    return {
      overallScore,
      totalValue,
      riskDistribution,
      topPerformers
    };
  }

  private calculateRiskDistribution(nfts: NFT[]) {
    const distribution = { low: 0, medium: 0, high: 0 };
    const total = nfts.length;

    nfts.forEach(nft => {
      if (nft.healthScore >= 80) distribution.low++;
      else if (nft.healthScore >= 50) distribution.medium++;
      else distribution.high++;
    });

    return {
      low: (distribution.low / total) * 100,
      medium: (distribution.medium / total) * 100,
      high: (distribution.high / total) * 100
    };
  }

  private getTopPerformers(nfts: NFT[]): NFT[] {
    return [...nfts]
      .sort((a, b) => b.healthScore - a.healthScore)
      .slice(0, 5);
  }

  private calculateOverallPortfolioScore(nfts: NFT[], riskDistribution: PortfolioHealth['riskDistribution']): number {
    const weights = {
      averageHealth: 0.4,
      riskDistribution: 0.3,
      diversification: 0.3
    };

    const avgHealthScore = nfts.reduce((sum, nft) => sum + nft.healthScore, 0) / nfts.length;
    const riskScore = 100 - riskDistribution.high;
    
    // Calculate diversification score based on unique collections
    const uniqueCollections = new Set(nfts.map(nft => nft.collection)).size;
    const diversificationScore = Math.min((uniqueCollections / nfts.length) * 100, 100);

    return Math.round(
      (avgHealthScore * weights.averageHealth) +
      (riskScore * weights.riskDistribution) +
      (diversificationScore * weights.diversification)
    );
  }
}