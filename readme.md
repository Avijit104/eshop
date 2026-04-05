# 🛍️ Online Saree Shop

A full-stack e-commerce web application for browsing, selecting, and purchasing sarees online. Built using the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Features

- 👗 Browse sarees by category (Silk, Cotton, Designer, etc.)
- 🔍 Search and filter products
- 🛒 Add to cart & manage cart
- ❤️ Wishlist functionality
- 🔐 User authentication (Login/Register)
- 📦 Order placement & tracking
- 💳 Secure checkout system
- 🧑‍💼 Admin dashboard
- 📱 Fully responsive design

---

## 🧰 Tech Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS / Bootstrap (optional)

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose (ODM)

---

## 📦 Badges

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/Framework-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📁 Project Structure

```text
eshop/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── wishlistController.js
│   │   ├── orderController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Wishlist.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── wishlistRoutes.js
│   │   ├── orderRoutes.js
│   │   └── adminRoutes.js
│   ├── seed/
│   │   └── sampleData.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   └── tailwind.config.js
├── .gitignore
├── README.md
└── package.json
```

## 🧩 Backend API Endpoints

### Auth

- `POST /api/auth/register`
  - signup new user
  - body: `name`, `email`, `password`
- `POST /api/auth/login`
  - login existing user
  - body: `email`, `password`
- `GET /api/auth/profile`
  - get current user profile
  - auth: token

### Products

- `GET /api/products`
  - list all products
  - query: `category`, `search`, `price_min`, `price_max`, `sort`
- `GET /api/products/:id`
  - get product details
- `POST /api/products`
  - add new product
  - auth: admin
- `PUT /api/products/:id`
  - update product
  - auth: admin
- `DELETE /api/products/:id`
  - remove product
  - auth: admin

### Cart

- `GET /api/cart`
  - get user cart
  - auth: token
- `POST /api/cart`
  - add item to cart
  - body: `productId`, `quantity`
- `PUT /api/cart/:itemId`
  - update cart item quantity
  - body: `quantity`
- `DELETE /api/cart/:itemId`
  - remove item from cart

### Wishlist

- `GET /api/wishlist`
  - get wishlist items
  - auth: token
- `POST /api/wishlist`
  - add product to wishlist
  - body: `productId`
- `DELETE /api/wishlist/:itemId`
  - remove item from wishlist

### Orders

- `POST /api/orders`
  - place a new order
  - body: `shippingAddress`, `paymentMethod`, `items`
- `GET /api/orders`
  - get user orders
  - auth: token
- `GET /api/orders/:id`
  - get order details
- `PUT /api/orders/:id/status`
  - update order status
  - auth: admin

### Admin

- `GET /api/admin/users`
  - list all users
  - auth: admin
- `PUT /api/admin/users/:id`
  - update user role/status
  - auth: admin
- `DELETE /api/admin/users/:id`
  - delete user
  - auth: admin

## 📝 Notes

- Use JWT for authentication and `Authorization: Bearer <token>`
- Store config values in `.env`
- Use Mongoose schemas for validation and relations
- Include error handling middleware for API responses
- Seed initial product and user data in `backend/seed/sampleData.js`
- Keep frontend services aligned with backend routes using Axios or fetch
