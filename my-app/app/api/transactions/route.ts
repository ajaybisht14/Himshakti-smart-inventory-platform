import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import Product from '@/models/Product';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const productId = searchParams.get('productId');
    const limit = searchParams.get('limit');
    
    let query: any = {};
    
    if (type) {
      query.type = type;
    }
    
    if (productId) {
      query.productId = productId;
    }
    
    let queryBuilder = Transaction.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      queryBuilder = queryBuilder.limit(parseInt(limit));
    }
    
    const transactions = await queryBuilder;
    
    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch transactions' },
      { status: 400 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { productId, type, quantity } = body;
    
    // Get product
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Update product quantity based on transaction type
    let newQuantity = product.quantity;
    if (type === 'purchase' || type === 'return') {
      newQuantity += quantity;
    } else if (type === 'sale') {
      newQuantity -= quantity;
      if (newQuantity < 0) {
        return NextResponse.json(
          { success: false, error: 'Insufficient stock' },
          { status: 400 }
        );
      }
    }
    
    // Update product
    product.quantity = newQuantity;
    if (type === 'purchase') {
      product.lastRestocked = new Date();
    }
    await product.save();
    
    // Create transaction
    const transaction = await Transaction.create({
      ...body,
      productName: product.name,
      totalAmount: body.unitPrice * quantity,
    });
    
    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
