import mongoose, { Schema, model, models } from 'mongoose';

export interface IProduct {
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  costPrice: number;
  quantity: number;
  minStockLevel: number;
  supplier: string;
  imageUrl: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastRestocked?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    sku: {
      type: String,
      required: [true, 'Please provide a SKU'],
      unique: true,
      uppercase: true,
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['electronics', 'furniture', 'supplies', 'equipment', 'materials', 'other'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: 0,
    },
    costPrice: {
      type: Number,
      required: [true, 'Please provide a cost price'],
      min: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Please provide a quantity'],
      min: 0,
      default: 0,
    },
    minStockLevel: {
      type: Number,
      required: [true, 'Please provide a minimum stock level'],
      min: 0,
      default: 10,
    },
    supplier: {
      type: String,
      required: [true, 'Please provide a supplier name'],
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    },
    status: {
      type: String,
      enum: ['in-stock', 'low-stock', 'out-of-stock'],
      default: 'in-stock',
    },
    lastRestocked: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-update status based on quantity
ProductSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.status = 'out-of-stock';
  } else if (this.quantity <= this.minStockLevel) {
    this.status = 'low-stock';
  } else {
    this.status = 'in-stock';
  }
  next();
});

const Product = models.Product || model<IProduct>('Product', ProductSchema);

export default Product;
