# ShopSphere - Full-Stack MERN E-Commerce Platform

ShopSphere is a production-style MERN e-commerce platform built for portfolio, internship, and recruiter showcase use-cases.

## Features

- JWT + bcrypt authentication (register, login, profile, logout, persistent auth)
- Product catalog with search, category filters, featured products, and responsive cards
- Product details page with quantity selector and similar products
- Cart management (add, update, remove, dynamic totals, persistence)
- Checkout flow with shipping address and order placement
- User profile dashboard and order history
- Admin dashboard for product CRUD, inventory, all orders, and all users
- Seed script for electronics, fashion, shoes, and accessories sample data

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, Tailwind CSS, React Router DOM, Axios, Context API, React Hot Toast |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Security | JWT, bcryptjs, input validation, route protection, admin middleware |
| Deployment | Frontend ready for Vercel, Backend ready for Render |

## Architecture

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── seed/
├── utils/
└── server.js

frontend/
└── src/
    ├── components/
    ├── pages/
    ├── context/
    ├── layouts/
    ├── services/
    ├── hooks/
    ├── utils/
    ├── routes/
    └── App.jsx
```

## Installation & Run

1. Clone repo and enter project:
   ```bash
   cd codealpha
   ```
2. Install root dependencies:
   ```bash
   npm install
   ```
3. Configure environment files:
   - Copy `backend/.env.example` to `backend/.env`
   - Copy `frontend/.env.example` to `frontend/.env`
4. Install app dependencies:
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```
5. Seed sample products:
   ```bash
   npm run seed --prefix backend
   ```
6. Start frontend + backend:
   ```bash
   npm run dev
   ```

### Admin Access Setup

After registering a user, set `isAdmin: true` for that user in MongoDB Atlas (Collections → users) to unlock admin routes and dashboard.

## Environment Variables

### backend/.env

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

### frontend/.env

```env
VITE_API_URL=http://localhost:5000
```

## API Endpoints

### AUTH
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`

### PRODUCTS
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (Admin)
- `PUT /api/products/:id` (Admin)
- `DELETE /api/products/:id` (Admin)

### CART
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/update`
- `DELETE /api/cart/remove/:id`

### ORDERS
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`

### ADMIN
- `GET /api/admin/orders`
- `GET /api/admin/users`

## Deployment Guide

### Backend on Render

1. Create a Render Web Service from `backend/`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add backend `.env` variables in Render dashboard.
5. Set `CLIENT_URL` to your deployed Vercel frontend URL.

### Frontend on Vercel

1. Import project and set root directory to `frontend/`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add `VITE_API_URL` pointing to Render backend URL.

## Screenshots

Add screenshots in this section for:
- Home page
- Product details
- Cart
- Checkout
- User profile/orders
- Admin dashboard
