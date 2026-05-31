import { NextResponse } from 'next/server';
import { fetchAllQuotes } from '@/lib/finance-fetcher';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchAllQuotes();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[api/quotes] Unhandled error:', error);
    return NextResponse.json(
      { rows: [], lastUpdated: null, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
