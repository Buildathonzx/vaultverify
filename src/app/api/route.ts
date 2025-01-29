import { NextRequest, NextResponse } from 'next/server';
import { NFTApi } from '@/lib/nftApi';
import { PortfolioService } from '@/services/portfolioService';

const nftApi = new NFTApi();
const portfolioService = new PortfolioService();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  try {
    const nfts = await nftApi.getNFTsByWallet(address);
    const portfolioHealth = await portfolioService.analyzePortfolio(address);

    return NextResponse.json({
      nfts,
      portfolioHealth
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch NFT data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractAddress, tokenId } = body;

    if (!contractAddress || !tokenId) {
      return NextResponse.json(
        { error: 'Contract address and token ID are required' },
        { status: 400 }
      );
    }

    const riskFactors = await nftApi.analyzeNFT(contractAddress, tokenId);

    return NextResponse.json({ riskFactors });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze NFT' },
      { status: 500 }
    );
  }
}