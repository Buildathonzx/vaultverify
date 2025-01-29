import { useState, useEffect } from 'react';
import { WalletService } from '../services/walletService';
import { PortfolioService } from '../services/portfolioService';
import { WalletInfo } from '../types';

export function useWallet() {
  const [walletService] = useState(() => new WalletService());
  const [portfolioService] = useState(() => new PortfolioService());
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if wallet is already connected
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (walletService.isConnected()) {
      const address = await walletService.getAddress();
      if (address) {
        await refreshWalletInfo(address);
      }
    }
  };

  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      // Connect wallet
      const info = await walletService.connectWallet();
      
      // Get portfolio analysis
      const portfolioHealth = await portfolioService.analyzePortfolio(info.address);
      
      // Update wallet info with portfolio data
      setWalletInfo({
        ...info,
        portfolioHealth
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
      setWalletInfo(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = async () => {
    try {
      await walletService.disconnectWallet();
      setWalletInfo(null);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to disconnect wallet');
    }
  };

  const refreshWalletInfo = async (address: string) => {
    try {
      setError(null);
      const portfolioHealth = await portfolioService.analyzePortfolio(address);
      
      setWalletInfo(prev => {
        if (!prev) return null;
        return {
          ...prev,
          portfolioHealth
        };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh wallet info');
    }
  };

  return {
    walletInfo,
    isConnecting,
    error,
    connect,
    disconnect,
    refreshWalletInfo,
    isConnected: walletService.isConnected()
  };
}