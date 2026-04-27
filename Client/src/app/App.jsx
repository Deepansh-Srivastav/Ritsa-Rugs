import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Footer } from '@/components/layout';
import { ToastContainer, useToast } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import AppRoutes from './routes';
import '@/styles/main.scss';

const App = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const { toasts, remove: removeToast } = useToast();
  const { token, setAuthData } = useAuthStore();

  useEffect(() => {
    // Initialize auth on app load
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        // Token persists via Zustand's persist middleware
        setAuthData(null, storedToken);
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, [setAuthData]);

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app__main">
          <AppRoutes />
        </main>
        <Footer />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
};

export default App;