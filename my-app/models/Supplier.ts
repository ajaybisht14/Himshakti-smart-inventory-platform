import mongoose, { Schema, model, models } from 'mongoose';

export interface ISupplier {
  name: string;
  email: string;
  phone: string;
  address: string;
  productsSupplied: number;
  rating: number;
  status: 'active' | 'inactive';
}

const SupplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: [true, 'Please provide supplier name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide an address'],
      maxlength: [200, 'Address cannot be more than 200 characters'],
    },
    productsSupplied: {
      type: Number,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = models.Supplier || model<ISupplier>('Supplier', SupplierSchema);

export default Supplier;
