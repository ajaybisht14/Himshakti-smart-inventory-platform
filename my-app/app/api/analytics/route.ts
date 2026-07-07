import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Transaction from '@/models/Transaction';
import Supplier from '@/models/Supplier';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get all products
    const products = await Product.find({});
    
    // Get recent transactions
    const recentTransactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Calculate analytics
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
    const lowStockCount = products.filter(p => p.status === 'low-stock').length;
    const outOfStockCount = products.filter(p => p.status === 'out-of-stock').length;
    
    // Get transactions for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const transactions = await Transaction.find({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const totalSales = transactions
      .filter(t => t.type === 'sale')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    
    const totalPurchases = transactions
      .filter(t => t.type === 'purchase')
      .reduce((sum, t) => sum + t.totalAmount, 0);
    
    // Category breakdown
    const categoryBreakdown = products.reduce((acc: any, p) => {
      if (!acc[p.category]) {
        acc[p.category] = { count: 0, value: 0 };
      }
      acc[p.category].count += 1;
      acc[p.category].value += p.price * p.quantity;
      return acc;
    }, {});
    
    // Get supplier count
    const supplierCount = await Supplier.countDocuments({ status: 'active' });
    
    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalValue,
          lowStockCount,
          outOfStockCount,
          totalSales,
          totalPurchases,
          supplierCount,
        },
        categoryBreakdown,
        recentTransactions,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
