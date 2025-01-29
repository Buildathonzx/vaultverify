import { NFT, RiskFactor } from '../types';

export class NFTApi {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BITSCRUNCH_API_URL || '';
    this.apiKey = process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY || '';
  }

  async getNFTsByWallet(address: string): Promise<NFT[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/wallet/${address}/nfts`,
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch NFTs');
      }

      const data = await response.json();
      return this.processNFTData(data);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      return [];
    }
  }

  async analyzeNFT(contractAddress: string, tokenId: string): Promise<RiskFactor[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/nft/analyze`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ contractAddress, tokenId }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to analyze NFT');
      }

      const data = await response.json();
      return this.processRiskFactors(data);
    } catch (error) {
      console.error('Error analyzing NFT:', error);
      return [];
    }
  }

  private processNFTData(data: any): NFT[] {
    // Transform API response into NFT objects
    return data.map((item: any) => ({
      id: item.id || `${item.contract_address}-${item.token_id}`,
      name: item.name || 'Unnamed NFT',
      image: item.image_url || '',
      collection: item.collection_name || 'Unknown Collection',
      tokenId: item.token_id,
      contractAddress: item.contract_address,
      owner: item.owner,
      healthScore: this.calculateHealthScore(item),
      riskFactors: this.processRiskFactors(item.risk_analysis || []),
      value: {
        current: item.current_price || 0,
        historical: (item.price_history || []).map((price: any) => ({
          date: new Date(price.timestamp),
          price: price.price
        }))
      }
    }));
  }

  private processRiskFactors(data: any[]): RiskFactor[] {
    return data.map(risk => ({
      type: this.mapRiskType(risk.type),
      severity: this.mapSeverity(risk.severity),
      description: risk.description,
      detectedAt: new Date(risk.detected_at)
    }));
  }

  private calculateHealthScore(nft: any): number {
    // Implement health score calculation logic based on:
    // - Price stability
    // - Trading volume
    // - Risk factors
    // - Authentication status
    // Returns a score between 0-100
    let score = 100;
    
    // Deduct points for each risk factor
    const riskFactors = nft.risk_analysis || [];
    riskFactors.forEach((risk: any) => {
      switch (risk.severity) {
        case 'HIGH':
          score -= 30;
          break;
        case 'MEDIUM':
          score -= 15;
          break;
        case 'LOW':
          score -= 5;
          break;
      }
    });

    // Ensure score stays within 0-100 range
    return Math.max(0, Math.min(100, score));
  }

  private mapRiskType(type: string): RiskFactor['type'] {
    const riskTypes: Record<string, RiskFactor['type']> = {
      'duplicate': 'DUPLICATE',
      'copyright': 'COPYRIGHT',
      'wash_trading': 'WASH_TRADING',
      'suspicious': 'SUSPICIOUS_ACTIVITY'
    };
    return riskTypes[type.toLowerCase()] || 'SUSPICIOUS_ACTIVITY';
  }

  private mapSeverity(severity: string): RiskFactor['severity'] {
    const severityLevels: Record<string, RiskFactor['severity']> = {
      'high': 'HIGH',
      'medium': 'MEDIUM',
      'low': 'LOW'
    };
    return severityLevels[severity.toLowerCase()] || 'MEDIUM';
  }
}