import { ethers } from 'ethers';
import { WalletInfo, NFT, PortfolioHealth } from '../types';

export class WalletService {
  private provider: ethers.providers.Web3Provider | null = null;
  private signer: ethers.Signer | null = null;

  async connectWallet(): Promise<WalletInfo> {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    await this.provider.send('eth_requestAccounts', []);
    this.signer = this.provider.getSigner();

    const address = await this.signer.getAddress();
    const network = await this.provider.getNetwork();
    const balance = parseFloat(ethers.utils.formatEther(
      await this.provider.getBalance(address)
    ));

    // Initialize with empty values - to be populated by NFT API
    return {
      address,
      network: network.name,
      balance,
      nfts: [],
      portfolioHealth: {
        overallScore: 0,
        totalValue: 0,
        riskDistribution: { low: 0, medium: 0, high: 0 },
        topPerformers: []
      }
    };
  }

  async disconnectWallet(): Promise<void> {
    this.provider = null;
    this.signer = null;
  }

  isConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }

  async getAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return await this.signer.getAddress();
  }

  // This will be expanded to use the NFT API for real data
  async refreshPortfolio(address: string): Promise<PortfolioHealth> {
    // Placeholder - will be replaced with actual API calls
    return {
      overallScore: 85,
      totalValue: 0,
      riskDistribution: {
        low: 70,
        medium: 20,
        high: 10
      },
      topPerformers: []
    };
  }
}