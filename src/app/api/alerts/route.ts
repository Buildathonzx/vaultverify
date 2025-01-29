import { NextRequest, NextResponse } from 'next/server';
import { Alert } from '@/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const address = searchParams.get('address');
  const status = searchParams.get('status'); // 'read' | 'unread' | 'all'

  if (!address) {
    return NextResponse.json(
      { error: 'Wallet address is required' },
      { status: 400 }
    );
  }

  try {
    // TODO: Replace with actual database query
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'FRAUD_DETECTED',
        severity: 'HIGH',
        nftId: 'nft123',
        message: 'Potential duplicate NFT detected in collection',
        timestamp: new Date(),
        isRead: false
      }
    ];

    return NextResponse.json({
      status: 'success',
      data: mockAlerts
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (!alertId) {
      return NextResponse.json(
        { error: 'Alert ID is required' },
        { status: 400 }
      );
    }

    // TODO: Mark alert as read in database
    return NextResponse.json({
      status: 'success',
      message: 'Alert marked as read'
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update alert' },
      { status: 500 }
    );
  }
}