<!-- We are using the Feature-based modular structure. -->

server/
├── src/
│ ├── config/
│ │ ├── db.js
│ │ ├── env.js
│ │ └── index.js
│ │
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── auth.controller.js
│ │ │ ├── auth.service.js
│ │ │ ├── auth.routes.js
│ │ │ ├── auth.validation.js
│ │ │ └── auth.middleware.js
│ │ │
│ │ ├── user/
│ │ │ ├── user.model.js
│ │ │ ├── user.controller.js
│ │ │ ├── user.service.js
│ │ │ └── user.routes.js
│ │ │
│ │ └── order/
│ │ ├── order.model.js
│ │ ├── order.controller.js
│ │ ├── order.service.js
│ │ └── order.routes.js
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── error.middleware.js
│ │ └── rateLimiter.js
│ │
│ ├── utils/
│ │ ├── ApiError.js
│ │ ├── ApiResponse.js
│ │ ├── asyncHandler.js
│ │ └── logger.js
│ │
│ ├── routes/
│ │ └── index.js
│ │
│ ├── app.js
│ └── server.js
│
├── tests/
│ ├── auth.test.js
│ └── user.test.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
└── README.md

<!-- We are using the (Feature-based) structure to ensure better future scaling. -->

server/
├── src/
│ ├── modules/
│ │ ├── auth/
│ │ │ ├── auth.routes.js
│ │ │ ├── auth.controller.js
│ │ │ ├── auth.service.js
│ │ │ └── auth.model.js
│ │ ├── product/
│ │ ├── order/
│ ├── config/
│ ├── middlewares/
│ ├── utils/
│ └── app.js

<!-- FRONTEND Structure  -->

src/
├── api/
│ ├── auth.api.js
│ ├── product.api.js
├── pages/
├── components/
├── hooks/
└── utils/

<!-- Project layers -->

1 Presentation Layer
UI, frontend

2 Transport Layer
Controller, routes

- What it imports
  Services
  Middlewares

- What it must NOT import
  Database logic directly
  Utils like bcrypt, JWT, Razorpay

3 Service Layer/ Business Layer

- Purpose
  Core application logic
  Decides what should happen

  auth.service.js
  product.service.js
  order.service.js

- What it imports
  Models
  Utils (JWT, payment, email)
  Other services (if needed)

- What it must NOT import
  Express
  req / res
  Routes

4 Data Access Layer

- Purpose
  Database schemas & queries

- What it imports
  Mongoose / MongoDB

- What it must NOT import
  Services
  Controllers
  HTTP concepts

5 Middleware Layer

- What it imports
  Utils
  Models (sometimes)

- What it must NOT import
  Services (generally)
  Controllers

6 Utility Layer

- Purpose
  Reusable helpers
  External services
  No app rules

- What it imports
  External SDKs
  Node core modules

- What it must NOT import
  Controllers
  Express
  Business rules

<!-- Response Shape  -->

{
"success": true,
"error":false,
"message": "Human readable message",
"data": {}
}

<!-- USER Endpoints -->
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
GET    /api/v1/auth/user

<!-- Address Endpoints -->
POST   /api/v1/addresses
GET    /api/v1/addresses
GET    /api/v1/addresses/:id
PATCH  /api/v1/addresses/:id
DELETE /api/v1/addresses/:id
PATCH  /api/v1/addresses/:id/default

<!-- Products Endpoints -->
GET    /api/v1/products
GET    /api/v1/products/:slug

<!-- Cart Endpoints -->
GET     /api/v1/cart
POST    /api/v1/cart/items
PATCH   /api/v1/cart/items/:productId
DELETE  /api/v1/cart/items/:productId
DELETE  /api/v1/cart
POST    /api/v1/cart/validate

<!-- Orders Endpoints -->
POST    /api/v1/orders
GET     /api/v1/orders
GET     /api/v1/orders/:id