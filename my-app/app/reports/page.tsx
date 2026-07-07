'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Package, DollarSign, ShoppingCart, BarChart3 } from 'lucide-react';

export default function Reports() {
  const [analytics, setAnalytics] = useState<any>(null);
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
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const categoryData = Object.entries(analytics?.categoryBreakdown || {});

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive inventory insights</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                {analytics?.overview.totalProducts || 0}
              </span>
            </div>
            <p className="text-gray-600">Total Products</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-900">
                ₹{(analytics?.overview.totalValue || 0).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">
                ₹{(analytics?.overview.totalSales || 0).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600">Sales (30 days)</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-2">
              <ShoppingCart className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-bold text-gray-900">
                ₹{(analytics?.overview.totalPurchases || 0).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-600">Purchases (30 days)</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6" />
            Inventory by Category
          </h2>
          {categoryData.length === 0 ? (
            <p className="text-gray-600 text-center py-8">No category data available</p>
          ) : (
            <div className="space-y-4">
              {categoryData.map(([category, data]: [string, any]) => (
                <div key={category} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 capitalize">{category}</h3>
                    <div className="flex gap-6">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Products</p>
                        <p className="text-lg font-bold text-gray-900">{data.count}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Value</p>
                        <p className="text-lg font-bold text-gray-900">₹{data.value.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                      style={{
                        width: `${(data.value / analytics.overview.totalValue) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Low Stock Alert</h3>
            <p className="text-3xl font-bold text-yellow-900 mb-1">
              {analytics?.overview.lowStockCount || 0}
            </p>
            <p className="text-yellow-700">Products need restocking</p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-900 mb-1">
              {analytics?.overview.outOfStockCount || 0}
            </p>
            <p className="text-red-700">Products unavailable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
