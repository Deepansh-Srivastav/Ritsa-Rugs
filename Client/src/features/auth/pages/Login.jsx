import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, useToast } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@/hooks';
import axiosInstance from '@/services/api/axiosInstance';
import { AUTH_ENDPOINTS } from '@/services/api/endpoints';
import './Auth.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { mutate, loading } = useMutation();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = 'Invalid email format';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    try {
      const response = await mutate('POST', AUTH_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      const { token, user } = response;

      // Store auth data
      setAuthData(user, token);
      localStorage.setItem('authToken', token);

      showToast('Login successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast(error.response?.data?.message || 'Login failed', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h1>Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your Ritsa Rugs account</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              required
            />

            <div className="auth-form__actions">
              <a href="#forgot" className="auth-form__link">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Sign In
            </Button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="auth-socials">
            <button type="button" className="auth-social-btn">
              Google
            </button>
            <button type="button" className="auth-social-btn">
              GitHub
            </button>
          </div>

          <p className="auth-footer">
            Don't have an account?{' '}
            <Link to="/auth/register" className="auth-link">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="auth-image">
          <div className="auth-image__placeholder">
            <h2>Ritsa Rugs</h2>
            <p>Handcrafted for your home</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;