'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, TrendingUp, AlertTriangle, ShoppingCart, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Analytics {
  overview: {
    totalProducts: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
    totalSales: number;
    totalPurchases: number;
    supplierCount: number;
  };
  categoryBreakdown: any;
  recentTransactions: any[];
}

export default function Home() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      const data = await response.json();
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Products',
      value: analytics?.overview.totalProducts || 0,
      icon: <Package className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Inventory Value',
      value: `₹${(analytics?.overview.totalValue || 0).toLocaleString()}`,
      icon: <DollarSign className="w-8 h-8" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      label: 'Low Stock Items',
      value: analytics?.overview.lowStockCount || 0,
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      link: '/products?status=low-stock',
    },
    {
      label: 'Out of Stock',
      value: analytics?.overview.outOfStockCount || 0,
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      link: '/products?status=out-of-stock',
    },
  ];

  const secondaryStats = [
    {
      label: 'Sales (30 days)',
      value: `₹${(analytics?.overview.totalSales || 0).toLocaleString()}`,
      icon: <TrendingUp className="w-6 h-6" />,
      change: '+12.5%',
      positive: true,
    },
    {
      label: 'Purchases (30 days)',
      value: `₹${(analytics?.overview.totalPurchases || 0).toLocaleString()}`,
      icon: <ShoppingCart className="w-6 h-6" />,
      change: '+8.2%',
      positive: true,
    },
    {
      label: 'Active Suppliers',
      value: analytics?.overview.supplierCount || 0,
      icon: <Users className="w-6 h-6" />,
      change: '+3',
      positive: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-blue-100">Welcome to Himshakti Inventory Management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.textColor}>{stat.icon}</div>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
              {stat.link && (
                <Link
                  href={stat.link}
                  className="text-sm text-blue-600 hover:text-blue-700 mt-2 inline-block"
                >
                  View details →
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {secondaryStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-600">{stat.icon}</div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.positive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.positive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  {stat.change}
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h4>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transactions</h2>
            <Link
              href="/transactions"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>
          {analytics?.recentTransactions && analytics.recentTransactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Amount</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {analytics.recentTransactions.map((transaction, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.productName}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            transaction.type === 'sale'
                              ? 'bg-green-100 text-green-700'
                              : transaction.type === 'purchase'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">{transaction.quantity}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        ₹{transaction.totalAmount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No transactions yet</p>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 mt-2 inline-block"
              >
                Add your first product →
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/products"
            className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Manage Products</h3>
            <p className="text-blue-100">Add, edit, or remove products from your inventory</p>
          </Link>
          <Link
            href="/transactions"
            className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <ShoppingCart className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Record Transaction</h3>
            <p className="text-green-100">Log sales, purchases, and stock adjustments</p>
          </Link>
          <Link
            href="/suppliers"
            className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            <Users className="w-8 h-8 mb-3" />
            <h3 className="text-xl font-bold mb-2">Manage Suppliers</h3>
            <p className="text-indigo-100">View and manage your supplier information</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
