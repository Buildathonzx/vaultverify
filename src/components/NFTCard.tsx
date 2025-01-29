import Image from 'next/image';
import { NFT, RiskFactor } from '../types';

interface NFTCardProps {
  nft: NFT;
  onClick?: (nft: NFT) => void;
}

export function NFTCard({ nft, onClick }: NFTCardProps) {
  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 50) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRiskBadgeColor = (severity: RiskFactor['severity']) => {
    switch (severity) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick?.(nft)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-lg">{nft.name}</h3>
            <p className="text-sm text-gray-600">{nft.collection}</p>
          </div>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${getHealthScoreColor(nft.healthScore)}`}>
            {nft.healthScore}/100
          </span>
        </div>

        <div className="mt-3">
          <p className="text-sm font-medium text-gray-700">Current Value</p>
          <p className="text-lg font-semibold">{nft.value.current} ETH</p>
        </div>

        {nft.riskFactors.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-1">Risk Factors</p>
            <div className="flex flex-wrap gap-1">
              {nft.riskFactors.map((risk, index) => (
                <span
                  key={index}
                  className={`px-2 py-0.5 rounded-full text-xs ${getRiskBadgeColor(risk.severity)}`}
                  title={risk.description}
                >
                  {risk.type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}