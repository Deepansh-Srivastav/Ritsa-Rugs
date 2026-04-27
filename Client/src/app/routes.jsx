import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/ui/ProtectedRoute';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
import { Spinner } from '@/components/ui';

// Auth Pages
const LoginPage = lazy(() => import('@/features/auth/pages/Login'));
const RegisterPage = lazy(() => import('@/features/auth/pages/Register'));

// Home
const HomePage = lazy(() => import('@/features/home/pages/Home'));

// Products
const ProductListPage = lazy(() => import('@/features/products/pages/ProductList'));
const ProductDetailsPage = lazy(() => import('@/features/products/pages/ProductDetails'));

// Cart & Checkout
const CartPage = lazy(() => import('@/features/cart/pages/Cart'));
const CheckoutPage = lazy(() => import('@/features/checkout/pages/Checkout'));
const OrderSuccessPage = lazy(() => import('@/features/checkout/pages/OrderSuccess'));

// User
const ProfilePage = lazy(() => import('@/features/user/pages/Profile'));
const OrdersPage = lazy(() => import('@/features/user/pages/Orders'));
const AddressesPage = lazy(() => import('@/features/user/pages/Addresses'));

// Wishlist
const WishlistPage = lazy(() => import('@/features/wishlist/pages/Wishlist'));

const LoadingFallback = () => <Spinner fullScreen />;

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListPage />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />

                {/* Auth Routes */}
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route
                    path="/checkout"
                    element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/order-success/:orderId"
                    element={
                        <ProtectedRoute>
                            <OrderSuccessPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addresses"
                    element={
                        <ProtectedRoute>
                            <AddressesPage />
                        </ProtectedRoute>
                    }
                />

                {/* 404 Page */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;