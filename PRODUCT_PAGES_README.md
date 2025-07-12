# Product Pages Documentation

## Overview

This document describes the dynamic product pages created for the ReWear application, including product details, swap functionality, and similar products recommendations.

## Pages Created

### 1. Dynamic Product Page (`/product/[id]`)
**Location**: `client/src/app/product/[id]/page.tsx`

**Features**:
- Dynamic routing based on product ID
- Product details display (title, description, category, size, condition)
- Owner information
- Swap points calculation and display
- Similar products recommendations
- Action buttons (Start Swap, Contact Owner)
- Wishlist and share functionality
- Responsive design with animations

**Key Components**:
- Product image gallery
- Product specifications (size, condition, category)
- Points calculation system
- Similar products grid
- Swap benefits section

### 2. Swap Page (`/swap/[id]`)
**Location**: `client/src/app/swap/[id]/page.tsx`

**Features**:
- Target product display
- User's available items for swap
- Item selection interface
- Points calculation and comparison
- Swap summary with points difference
- Real-time validation

**Key Components**:
- Target product card
- Available items list with selection
- Points calculation system
- Swap summary dashboard
- Progress indicators

### 3. Swap Success Page (`/swap-success`)
**Location**: `client/src/app/swap-success/page.tsx`

**Features**:
- Success confirmation
- Swap details summary
- Next steps guidance
- Safety tips
- Navigation options

### 4. Browse Page (`/browse`)
**Location**: `client/src/app/browse/page.tsx`

**Features**:
- Product grid/list view
- Search functionality
- Category and condition filters
- Points display
- Responsive design

## Points System

The application uses a points-based swap system:

### Points Calculation
```javascript
const conditionPoints = {
  'New': 100,
  'Like New': 80,
  'Good': 60,
  'Fair': 40,
  'Poor': 20
};

const categoryMultiplier = {
  'Clothes': 1.0,
  'Footwear': 1.2,
  'Accessories': 0.8
};
```

### Formula
```
Points = Condition Points × Category Multiplier
```

## API Integration

### Backend Endpoints Used
- `GET /api/v1/items/` - Get all items
- `GET /api/v1/items/{id}` - Get specific item
- `POST /api/v1/items/seed` - Create sample data

### Proxy API Route
**Location**: `client/src/app/api/proxy/route.ts`

Handles CORS issues by proxying requests to the backend:
```javascript
// Example usage
const response = await fetch(`/api/proxy?url=${encodeURIComponent('http://localhost:8000/api/v1/items/')}`);
```

## Setup Instructions

### 1. Start the Backend
```bash
cd Backend
python -m uvicorn app.main:app --reload
```

### 2. Seed Sample Data
```bash
curl -X POST http://localhost:8000/api/v1/items/seed
```

### 3. Start the Frontend
```bash
cd client
npm run dev
```

### 4. Access the Pages
- Browse: `http://localhost:3000/browse`
- Product: `http://localhost:3000/product/1`
- Swap: `http://localhost:3000/swap/1`

## Features Implemented

### ✅ Dynamic Routing
- Product pages with dynamic IDs
- Proper navigation between pages
- Breadcrumb navigation

### ✅ Product Details
- Complete product information display
- Size, condition, category specifications
- Owner information
- Points calculation

### ✅ Similar Products
- Recommendations based on category
- Points display for each item
- Clickable cards for navigation

### ✅ Swap Functionality
- Item selection interface
- Points comparison
- Real-time validation
- Progress indicators

### ✅ Points System
- Condition-based points
- Category multipliers
- Points difference calculation
- Visual indicators

### ✅ UI/UX Features
- Responsive design
- Smooth animations
- Loading states
- Error handling
- Modern gradient backgrounds

### ✅ Backend Integration
- API proxy for CORS handling
- Sample data seeding
- Proper error handling

## File Structure

```
client/src/app/
├── product/
│   └── [id]/
│       └── page.tsx          # Dynamic product page
├── swap/
│   ├── [id]/
│   │   └── page.tsx          # Swap interface
│   └── swap-success/
│       └── page.tsx          # Success page
├── browse/
│   └── page.tsx              # Browse all products
└── api/
    └── proxy/
        └── route.ts          # API proxy for CORS
```

## Usage Examples

### Navigating to a Product
```javascript
// From browse page
router.push(`/product/${product.id}`);

// From any component
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/product/1');
```

### Fetching Product Data
```javascript
const fetchProduct = async () => {
  const response = await fetch(`/api/proxy?url=${encodeURIComponent(`http://localhost:8000/api/v1/items/${id}`)}`);
  const data = await response.json();
  setProduct(data);
};
```

### Calculating Points
```javascript
const calculatePoints = (condition, category) => {
  const conditionPoints = { 'New': 100, 'Like New': 80, /* ... */ };
  const categoryMultiplier = { 'Clothes': 1.0, 'Footwear': 1.2, /* ... */ };
  
  return Math.round(conditionPoints[condition] * categoryMultiplier[category]);
};
```

## Future Enhancements

1. **Image Upload**: Add support for multiple product images
2. **Chat System**: Implement in-app messaging between users
3. **Location Services**: Add proximity-based product recommendations
4. **Advanced Filters**: Size, price range, brand filters
5. **User Reviews**: Product and user rating system
6. **Push Notifications**: Real-time swap notifications
7. **Payment Integration**: Premium features or transaction fees
8. **Social Features**: Share swaps on social media

## Troubleshooting

### CORS Issues
- Ensure the proxy API route is working
- Check backend is running on correct port
- Verify API endpoints are accessible

### No Products Displayed
- Run the seed endpoint to create sample data
- Check backend database connection
- Verify API responses in browser dev tools

### Points Not Calculating
- Check condition and category values match expected format
- Verify calculation function is properly imported
- Test with known values

## Contributing

When adding new features:
1. Follow the existing code structure
2. Use the established points system
3. Maintain responsive design principles
4. Add proper error handling
5. Test with the sample data 