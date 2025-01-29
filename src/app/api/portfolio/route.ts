import { NextRequest, NextResponse } from 'next/server';
import { PortfolioService } from '@/services/portfolioService';

const portfolioService = new PortfolioService();

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const timeframe = searchParams.get('timeframe') || '7d';

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  try {
    const portfolioHealth = await portfolioService.analyzePortfolio(address);
    
    return NextResponse.json({
      status: 'success',
      data: portfolioHealth
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze portfolio' },
      { status: 500 }
    );
  }
}