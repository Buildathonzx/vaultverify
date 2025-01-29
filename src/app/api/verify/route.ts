import { NextRequest, NextResponse } from 'next/server';
import { NFTApi } from '@/lib/nftApi';

const nftApi = new NFTApi();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractAddress, tokenId, imageUrl } = body;

    if (!contractAddress || !tokenId) {
      return NextResponse.json(
        { error: 'Contract address and token ID are required' },
        { status: 400 }
      );
    }

    // Analyze NFT authenticity
    const riskFactors = await nftApi.analyzeNFT(contractAddress, tokenId);
    
    // Calculate verification score
    const verificationScore = 100 - (riskFactors.length * 20); // Basic scoring logic

    return NextResponse.json({
      status: 'success',
      data: {
        isVerified: verificationScore >= 70,
        score: verificationScore,
        riskFactors,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify NFT' },
      { status: 500 }
    );
  }
}