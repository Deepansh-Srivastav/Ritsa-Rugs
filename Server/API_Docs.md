# API Documentation

## 1. Project Overview

* **Description:** Rista-Rugs backend application (Rugs selling platform).
* **Tech Stack:** Node.js, Express.js, MongoDB (Mongoose).
* **Base URL:** `/api/v1`

---

## 2. Authentication & Authorization

* **Implementation:** JWT (JSON Web Tokens). Access tokens are sent in responses and expected in headers. Refresh tokens are stored in HTTP-only cookies.
* **OAuth:** Google OAuth integration exists.
* **Middleware used:**
  * `authenticationMiddleware`: Verifies the access token and attaches the authenticated user to `req.user`.
  * `authorizationMiddleware`: Role-based access control checking if `req.user.role === "admin"`.

---

## 3. API Endpoints

### Auth

#### Endpoint: Login User
* **Method:** POST
* **URL:** `/api/v1/auth/login`
* **Description:** Authenticates a user, sets a `refreshToken` cookie, and returns an `accessToken`.

**Request:**
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "<token>",
  "user": {}
}
```

#### Endpoint: Logout User
* **Method:** POST
* **URL:** `/api/v1/auth/logout`
* **Description:** Logs out a user, clears the `refreshToken` cookie.

**Request:**
* **Headers:** Not explicitly required for this route (relies on cookies).

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Logged out successfully"
}
```

#### Endpoint: Refresh Access Token
* **Method:** POST
* **URL:** `/api/v1/auth/refresh-token`
* **Description:** Generates a new access token using the `refreshToken` cookie.

**Response:**
* **Success Response:**
```json
{
  "error": false,
  "success": true,
  "message": "access token generated successfully",
  "data": {
    "accessToken": "<new_token>"
  }
}
```

#### Endpoint: Google OAuth Redirect
* **Method:** GET
* **URL:** `/api/v1/auth/google`
* **Description:** Redirects the user to the Google OAuth login page.

#### Endpoint: Google OAuth Callback
* **Method:** GET
* **URL:** `/api/v1/auth/google/callback`
* **Description:** Handles Google OAuth callback, sets the `refreshToken` cookie, and redirects to the frontend with the `accessToken`.

**Request:**
* **Query:**
```json
{
  "code": "string"
}
```

---

### Users

#### Endpoint: Register User
* **Method:** POST
* **URL:** `/api/v1/user/register-user`
* **Description:** Creates a new user account.

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "User created successfully",
  "data": {}
}
```

#### Endpoint: Get User Details
* **Method:** GET
* **URL:** `/api/v1/user/get-user-details`
* **Description:** Fetches details of the currently authenticated user.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "data": {}
}
```

#### Endpoint: Update User Details
* **Method:** PUT
* **URL:** `/api/v1/user/update-user-details`
* **Description:** Updates details of a user. Note: The route lacks a `:userId` parameter, but the controller expects `req.params.userId`.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "User updated successfully",
  "data": {}
}
```

#### Endpoint: Soft Delete User
* **Method:** DELETE
* **URL:** `/api/v1/user/delete-user`
* **Description:** Soft deletes a user account. Note: The route lacks a `:userId` parameter, but the controller expects `req.params.userId`.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Account deleted successfully",
  "data": {}
}
```

---

### Addresses

Note: Address routes are mounted on `/api/v1/user` in `app.js`.

#### Endpoint: Create Address
* **Method:** POST
* **URL:** `/api/v1/user/create-address`
* **Description:** Creates a new address for the authenticated user.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

#### Endpoint: Get All Addresses
* **Method:** GET
* **URL:** `/api/v1/user/get-all-addresses`
* **Description:** Fetches all addresses of the authenticated user.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "data": []
}
```

#### Endpoint: Get Address By ID
* **Method:** GET
* **URL:** `/api/v1/user/get-address/:addressId`
* **Description:** Fetches a specific address by its ID.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "addressId": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

#### Endpoint: Update Address
* **Method:** PUT
* **URL:** `/api/v1/user/update-address/:addressId`
* **Description:** Updates a specific address.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "addressId": "string"
}
```
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "data": {}
}
```

#### Endpoint: Delete Address
* **Method:** DELETE
* **URL:** `/api/v1/user/delete-address/:addressId`
* **Description:** Deletes a specific address.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "addressId": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "message": "Address deleted successfully"
}
```

---

### Products

Note: Public product routes are mounted on `/api/v1/user` in `app.js`.

#### Endpoint: Get All Products
* **Method:** GET
* **URL:** `/api/v1/user/get-all-products`
* **Description:** Fetches all products.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Products fetched successfully",
  "data": []
}
```

#### Endpoint: Get Product by Slug
* **Method:** GET
* **URL:** `/api/v1/user/get-product/:slug`
* **Description:** Fetches a single product by its slug.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "slug": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Product fetched successfully",
  "data": {}
}
```

---

### Cart

#### Endpoint: Add to Cart
* **Method:** POST
* **URL:** `/api/v1/cart/add-cart-item`
* **Description:** Adds an item to the authenticated user's cart.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Body:**
```json
{
  "productId": "string",
  "quantity": 1
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Item added to cart",
  "data": {}
}
```

#### Endpoint: Get Cart
* **Method:** GET
* **URL:** `/api/v1/cart/get-all-cart-items`
* **Description:** Fetches the authenticated user's cart.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Cart fetched successfully",
  "data": {}
}
```

#### Endpoint: Update Cart Item Quantity
* **Method:** PUT
* **URL:** `/api/v1/cart/update-cart-item-quantity`
* **Description:** Updates the quantity of a cart item.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Body:**
```json
{
  "productId": "string",
  "action": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Cart updated successfully",
  "data": {}
}
```

#### Endpoint: Delete Cart Item
* **Method:** DELETE
* **URL:** `/api/v1/cart/delete-cart-item/:productId`
* **Description:** Removes an item from the cart.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "productId": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Item removed from cart",
  "data": {}
}
```

---

### Admin

#### Endpoint: Admin Login
* **Method:** POST
* **URL:** `/api/v1/admin/login`
* **Description:** Authenticates an admin user, sets a `refreshToken` cookie.

**Request:**
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "<token>",
  "user": {}
}
```

#### Endpoint: Create Product
* **Method:** POST
* **URL:** `/api/v1/admin/create-product`
* **Description:** Creates a new product.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Product created successfully",
  "data": {}
}
```

#### Endpoint: Update Product
* **Method:** PUT
* **URL:** `/api/v1/admin/update-product/:productId`
* **Description:** Updates an existing product.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "productId": "string"
}
```
* **Body:** Not स्पष्ट in code (handled in service)

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Product updated successfully",
  "data": {}
}
```

#### Endpoint: Delete Product
* **Method:** DELETE
* **URL:** `/api/v1/admin/delete-product/:productId`
* **Description:** Deletes a product.

**Request:**
* **Headers:** 
```json
{
  "Authorization": "Bearer <token>"
}
```
* **Params:**
```json
{
  "productId": "string"
}
```

**Response:**
* **Success Response:**
```json
{
  "success": true,
  "error": false,
  "message": "Product deleted successfully"
}
```

---

## 4. Data Models

### Model: User
* **Required fields:** `name`, `email`
* **Enums:** 
  * `role`: `["user", "admin"]` (default: `"user"`)
  * `authProvider`: `["local", "google"]` (default: `"google"`)
* **Default values:** `isActive: true`
* **Schema:**
```json
{
  "name": "string (min 2, max 50)",
  "email": "string (unique, lowercase)",
  "role": "string",
  "avatar": "string",
  "isActive": "boolean",
  "lastLoginAt": "date",
  "authProvider": "string",
  "refreshToken": "string (select: false)"
}
```

### Model: Product
* **Required fields:** `name`, `slug`, `price`, `taxCategory`, `stock`, `thumbnail`, `images`
* **Enums:**
  * `taxCategory`: `["GST_5", "GST_12", "GST_18"]`
* **Default values:** `stock: 0`, `isActive: true`
* **Schema:**
```json
{
  "name": "string (max 120)",
  "slug": "string (unique, lowercase)",
  "description": "string (max 2000)",
  "price": "number (min 0)",
  "discountPrice": "number (min 0)",
  "taxCategory": "string",
  "stock": "number (min 0)",
  "thumbnail": "string",
  "images": ["string"],
  "isActive": "boolean"
}
```

### Model: Cart
* **Required fields:** `user`
* **Relationships:** `user` (ref: `User`), `items.productId` (ref: `Product`)
* **Default values:** `isActive: true`
* **Enums:**
  * `items.taxCategory`: `["GST_5", "GST_12", "GST_18"]`
* **Schema:**
```json
{
  "user": "ObjectId (unique)",
  "items": [
    {
      "productId": "ObjectId",
      "quantity": "number (min 1, default 1)",
      "price": "number (min 0)",
      "discountPrice": "number (min 0)",
      "taxCategory": "string",
      "stock": "number (min 1)",
      "image": "string"
    }
  ],
  "isActive": "boolean"
}
```

### Model: Address
* **Required fields:** `user`, `name`, `phone`, `addressLine1`, `city`, `state`, `postalCode`
* **Relationships:** `user` (ref: `User`)
* **Enums:**
  * `type`: `["home", "work", "other"]` (default: `"home"`)
* **Default values:** `country: "India"`, `isDefault: false`, `isActive: true`
* **Schema:**
```json
{
  "user": "ObjectId",
  "name": "string (max 100)",
  "phone": "string (max 15)",
  "addressLine1": "string (max 150)",
  "addressLine2": "string (max 150)",
  "city": "string (max 50)",
  "state": "string (max 50)",
  "postalCode": "string (max 20)",
  "country": "string",
  "type": "string",
  "isDefault": "boolean",
  "isActive": "boolean"
}
```

---

## 5. Middleware

* **`authenticationMiddleware` (`auth.js`):** Extracts the access token from the request, verifies it, fetches the authenticated user from the database, and attaches the user object to `req.user`. Throws an error if authentication fails.
* **`authorizationMiddleware` (`authorization.js`):** Checks if `req.user` exists and verifies that `req.user.role` is exactly `"admin"`. If not, it throws a 403 Access Denied error.
* **`errorHandler` (`errorHandler.js`):** A global error handling middleware. Formats errors with `success: false` and `error: true`, extracts the message, sets the appropriate HTTP status code (defaults to 500), and includes the error stack trace only when `NODE_ENV === "development"`.

---

## 6. Error Handling Pattern

* **Structure:** Errors are returned in a standard JSON format across all endpoints.
* **Common Status Codes Used:**
  * `200` / `201`: Success
  * `403`: Forbidden (from authorization middleware)
  * `500`: Internal Server Error (fallback)
* **Response Format:**
```json
{
  "success": false,
  "error": true,
  "message": "Error message details",
  "stack": "Stack trace (only visible in development mode)"
}
```

---

## 7. Folder Structure

* **`routes/` (inside `modules/`):** Contains Express routers defining endpoint paths and assigning middlewares and controller functions.
* **`controllers/` (inside `modules/`):** Handles incoming HTTP requests, extracts parameters/body data, delegates business logic to services, and sends HTTP responses.
* **`models/` (inside `modules/`):** Defines Mongoose schemas for MongoDB collections (User, Product, Cart, Address).
* **`services/`:** Contains core business logic and database interactions, keeping controllers lightweight.
* **`middlewares/`:** Contains custom Express middleware for authentication, role validation, and global error handling.
* **`config/`:** Contains database connection logic and third-party configuration (e.g., Google OAuth).
* **`utils/`:** Helper functions for cookies, tokens, and custom error classes.
