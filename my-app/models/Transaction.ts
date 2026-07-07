import mongoose, { Schema, model, models } from 'mongoose';

export interface ITransaction {
  productId: string;
  productName: string;
  type: 'purchase' | 'sale' | 'return' | 'adjustment';
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  description?: string;
  performedBy: string;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    productId: {
      type: String,
      required: [true, 'Product ID is required'],
    },
    productName: {
      type: String,
      required: [true, 'Product name is required'],
    },
    type: {
      type: String,
      required: [true, 'Transaction type is required'],
      enum: ['purchase', 'sale', 'return', 'adjustment'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    unitPrice: {
      type: Number,
      required: [true, 'Unit price is required'],
      min: 0,
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
    },
    description: {
      type: String,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    performedBy: {
      type: String,
      required: [true, 'Please provide who performed this transaction'],
      default: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = models.Transaction || model<ITransaction>('Transaction', TransactionSchema);

export default Transaction;
