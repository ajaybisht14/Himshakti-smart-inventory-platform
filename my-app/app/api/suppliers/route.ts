import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Supplier from '@/models/Supplier';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    let query: any = {};
    
    if (status) {
      query.status = status;
    }
    
    const suppliers = await Supplier.find(query).sort({ name: 1 });
    
    return NextResponse.json({ success: true, data: suppliers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch suppliers' },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const supplier = await Supplier.create(body);
    
    return NextResponse.json({ success: true, data: supplier }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
