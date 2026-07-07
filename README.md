# Himshakti - Smart Inventory Management Platform

A comprehensive, production-ready inventory management system built with Next.js 16, TypeScript, Tailwind CSS, and MongoDB. Features real-time tracking, transaction management, supplier relationships, and powerful analytics.

## ✨ Features

- 📊 **Real-time Dashboard** - Overview of inventory health, sales, and alerts
- 📦 **Product Management** - Full CRUD operations with search and filtering
- 💰 **Transaction Tracking** - Log purchases, sales, returns, and adjustments
- 👥 **Supplier Management** - Maintain supplier relationships and ratings
- 📈 **Analytics & Reports** - Category breakdowns, trends, and insights
- ⚠️ **Smart Alerts** - Low stock and out-of-stock notifications
- 🔍 **Advanced Search** - Find products instantly by name or SKU
- 📱 **Responsive Design** - Works perfectly on all devices
- 🗄️ **Database Integration** - MongoDB with Mongoose for persistence
- ⚡ **Fast Performance** - Built on Next.js 16 with App Router

## 📦 Tech Stack

- **Framework:** Next.js 16.2.9
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB with Mongoose
- **Icons:** Lucide React
- **State Management:** React Hooks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Installation

1. **Navigate to the project:**
   ```bash
   cd my-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   The `.env.local` file is already created. For MongoDB Atlas or different connection:
   ```
   MONGODB_URI=mongodb://localhost:27017/himshakti
   ```

4. **Start MongoDB (if using local):**
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb-community
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   ├── products/route.ts       # Product CRUD operations
│   │   ├── transactions/route.ts   # Transaction logging
│   │   ├── suppliers/route.ts      # Supplier management
│   │   └── analytics/route.ts      # Analytics & reports
│   ├── products/page.tsx           # Product listing
│   ├── transactions/page.tsx       # Transaction history
│   ├── suppliers/page.tsx          # Supplier directory
│   ├── reports/page.tsx            # Analytics dashboard
│   ├── layout.tsx                  # Root layout
│   └── page.tsx                    # Main dashboard
├── components/
│   ├── Navbar.tsx                  # Navigation
│   └── Footer.tsx                  # Footer
├── lib/
│   └── mongodb.ts                  # Database connection
├── models/
│   ├── Product.ts                  # Product schema
│   ├── Transaction.ts              # Transaction schema
│   └── Supplier.ts                 # Supplier schema
└── public/                         # Static assets
```

## 🎨 Pages

- **Dashboard** (`/`) - Overview with KPIs, recent transactions, and quick actions
- **Products** (`/products`) - Search, filter, and view all inventory items
- **Transactions** (`/transactions`) - Complete transaction history with filtering
- **Suppliers** (`/suppliers`) - Supplier directory with contact information
- **Reports** (`/reports`) - Analytics, category breakdowns, and alerts

## 🗄️ Database Models

### Product Model
```typescript
{
  name: string,
  sku: string (unique),
  description: string,
  category: 'electronics' | 'furniture' | 'supplies' | 'equipment' | 'materials' | 'other',
  price: number,
  costPrice: number,
  quantity: number,
  minStockLevel: number,
  supplier: string,
  imageUrl: string,
  status: 'in-stock' | 'low-stock' | 'out-of-stock' (auto-calculated),
  lastRestocked: Date
}
```

### Transaction Model
```typescript
{
  productId: string,
  productName: string,
  type: 'purchase' | 'sale' | 'return' | 'adjustment',
  quantity: number,
  unitPrice: number,
  totalAmount: number,
  description: string,
  performedBy: string
}
```

### Supplier Model
```typescript
{
  name: string,
  email: string,
  phone: string,
  address: string,
  productsSupplied: number,
  rating: number (1-5),
  status: 'active' | 'inactive'
}
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Fetch all products (supports ?status=, ?category=, ?search=)
- `POST /api/products` - Create a new product
- `PUT /api/products` - Update existing product
- `DELETE /api/products?id=` - Delete a product

### Transactions
- `GET /api/transactions` - Fetch transactions (supports ?type=, ?productId=, ?limit=)
- `POST /api/transactions` - Create transaction (auto-updates product quantity)

### Suppliers
- `GET /api/suppliers` - Fetch all suppliers (supports ?status=)
- `POST /api/suppliers` - Create a new supplier

### Analytics
- `GET /api/analytics` - Get dashboard analytics (overview, category breakdown, recent transactions)

## 📝 Sample Data

Add sample products using the API:

```bash
# Add a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop Dell XPS 15",
    "sku": "DELLXPS15",
    "description": "15-inch laptop with i7 processor",
    "category": "electronics",
    "price": 85000,
    "costPrice": 70000,
    "quantity": 50,
    "minStockLevel": 10,
    "supplier": "Dell India",
    "imageUrl": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800"
  }'

# Record a sale
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "YOUR_PRODUCT_ID",
    "type": "sale",
    "quantity": 2,
    "unitPrice": 85000,
    "performedBy": "Admin"
  }'

# Add a supplier
curl -X POST http://localhost:3000/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "TechSupply Co.",
    "email": "contact@techsupply.com",
    "phone": "+91 98765 43210",
    "address": "123 Tech Park, Himachal Pradesh",
    "rating": 5
  }'
```

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy!

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier available)
3. Get your connection string
4. Update `MONGODB_URI` in environment variables

## 🎯 Key Features Explained

### Auto Status Updates
Product status automatically updates based on quantity:
- `out-of-stock`: quantity = 0
- `low-stock`: quantity ≤ minStockLevel
- `in-stock`: quantity > minStockLevel

### Transaction Management
- Automatically adjusts product quantities
- Tracks purchase, sale, return, and adjustment types
- Updates `lastRestocked` date on purchases
- Validates sufficient stock before sales

### Dashboard Analytics
- Real-time inventory value calculation
- 30-day sales and purchase totals
- Category-wise breakdown
- Recent transaction feed
- Stock alert counts

## 📄 License

This project is open source and available under the MIT License.

