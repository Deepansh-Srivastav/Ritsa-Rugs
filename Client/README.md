folder structure for the frontend,

src/
 ├─ app/
 │   ├─ config/
 │   │   ├─ env.js
 │   │   └─ constants.js
 │   │
 │   ├─ routes.jsx
 │   ├─ providers.jsx
 │   └─ App.jsx
 │
 ├─ lib/
 │   ├─ http/
 │   │   ├─ axios.instance.js
 │   │   ├─ interceptors.js
 │   │   └─ handleError.js
 │   └─ queryClient.js
 │
 ├─ services/
 │   └─ apiPaths.js
 │
 ├─ features/
 │   ├─ auth/
 │   │   ├─ pages/
 │   │   │   ├─ LoginPage.jsx
 │   │   │   └─ RegisterPage.jsx
 │   │   ├─ components/
 │   │   │   └─ AuthForm.jsx
 │   │   ├─ hooks/
 │   │   │   └─ useAuth.js
 │   │   └─ api/
 │   │       └─ auth.api.js
 │   │
 │   ├─ rugs/
 │   │   ├─ pages/
 │   │   │   ├─ RugsListPage.jsx
 │   │   │   └─ RugDetailsPage.jsx
 │   │   ├─ components/
 │   │   │   ├─ RugCard.jsx
 │   │   │   └─ RugFilters.jsx
 │   │   ├─ hooks/
 │   │   │   └─ useRugs.js
 │   │   └─ api/
 │   │       └─ rugs.api.js
 │   │
 │   ├─ cart/
 │   │   ├─ pages/
 │   │   │   └─ CartPage.jsx
 │   │   ├─ components/
 │   │   │   └─ CartItem.jsx
 │   │   ├─ hooks/
 │   │   │   └─ useCart.js
 │   │   └─ api/
 │   │       └─ cart.api.js
 │   │
 │   ├─ orders/
 │   │   ├─ pages/
 │   │   │   └─ OrdersPage.jsx
 │   │   ├─ hooks/
 │   │   │   └─ useOrders.js
 │   │   └─ api/
 │   │       └─ orders.api.js
 │
 ├─ shared/
 │   ├─ components/
 │   │   ├─ Button.jsx
 │   │   ├─ Loader.jsx
 │   │   └─ Modal.jsx
 │   └─ utils/
 │
 ├─ assets/
 │   └─ images/
 │
 ├─ styles/
 │   └─ global.css
 │
 └─ main.jsx
