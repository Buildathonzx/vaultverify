import { useWallet } from '@/hooks/useWallet';
import { NFTCard } from '@/components/NFTCard';
import Link from 'next/link';

export default function Dashboard() {
  const { walletInfo } = useWallet();

  if (!walletInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">
            Connect your wallet to view your NFT portfolio health and analytics
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Portfolio Overview</h1>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Portfolio Health</h3>
            <p className="text-3xl font-bold mt-2">
              {walletInfo.portfolioHealth.overallScore}/100
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Total Value</h3>
            <p className="text-3xl font-bold mt-2">
              {walletInfo.portfolioHealth.totalValue.toFixed(2)} ETH
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium">Risk Distribution</h3>
            <div className="mt-2 flex gap-2">
              <div className="flex-1 bg-green-100 rounded p-2">
                <p className="text-sm text-green-800">Low: {walletInfo.portfolioHealth.riskDistribution.low}%</p>
              </div>
              <div className="flex-1 bg-yellow-100 rounded p-2">
                <p className="text-sm text-yellow-800">Medium: {walletInfo.portfolioHealth.riskDistribution.medium}%</p>
              </div>
              <div className="flex-1 bg-red-100 rounded p-2">
                <p className="text-sm text-red-800">High: {walletInfo.portfolioHealth.riskDistribution.high}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Performers</h2>
          <Link 
            href="/portfolio" 
            className="text-indigo-600 hover:text-indigo-800"
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {walletInfo.portfolioHealth.topPerformers.map((nft) => (
            <NFTCard key={nft.id} nft={nft} />
          ))}
        </div>
      </div>
    </div>
  );
}