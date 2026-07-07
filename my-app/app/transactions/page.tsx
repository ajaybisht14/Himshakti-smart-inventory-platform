'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Package, Calendar } from 'lucide-react';

interface Transaction {
  _id: string;
  productName: string;
  type: 'purchase' | 'sale' | 'return' | 'adjustment';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  performedBy: string;
  createdAt: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      if (data.success) {
        setTransactions(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'bg-green-100 text-green-700';
      case 'purchase': return 'bg-blue-100 text-blue-700';
      case 'return': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'sale' || type === 'return' ? (
      <TrendingDown size={16} />
    ) : (
      <TrendingUp size={16} />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600 mt-1">Track all inventory movements</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex gap-2">
            {['all', 'purchase', 'sale', 'return', 'adjustment'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No transactions found</h3>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Quantity</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Unit Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(transaction.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.productName}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                        {getTypeIcon(transaction.type)}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{transaction.quantity}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">₹{transaction.unitPrice.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{transaction.totalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{transaction.performedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
