import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, useToast } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@/hooks';
import { AUTH_ENDPOINTS } from '@/services/api/endpoints';
import './Auth.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const navigate = useNavigate();
  const { show: showToast } = useToast();
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const { mutate, loading } = useMutation();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms and conditions';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      const response = await mutate('POST', AUTH_ENDPOINTS.REGISTER, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response;

      // Store auth data
      setAuthData(user, token);
      localStorage.setItem('authToken', token);

      showToast('Registration successful!', 'success');
      navigate('/');
    } catch (error) {
      showToast(
        error.response?.data?.message || 'Registration failed',
        'error'
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h1>Create Account</h1>
          <p className="auth-subtitle">Join Ritsa Rugs and discover handcrafted beauty</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <Input
                label="First Name"
                type="text"
                placeholder="John"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur('firstName')}
                error={errors.firstName}
                touched={touched.firstName}
                required
              />

              <Input
                label="Last Name"
                type="text"
                placeholder="Doe"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur('lastName')}
                error={errors.lastName}
                touched={touched.lastName}
                required
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={() => handleBlur('password')}
              error={errors.password}
              touched={touched.password}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={() => handleBlur('confirmPassword')}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              required
            />

            <div className="auth-terms">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
              />
              <label htmlFor="terms">
                I agree to the <a href="#terms">Terms of Service</a> and{' '}
                <a href="#privacy">Privacy Policy</a>
              </label>
              {errors.terms && <span className="auth-terms__error">{errors.terms}</span>}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              Create Account
            </Button>
          </form>

          <p className="auth-footer">
            Already have an account?{' '}
            <Link to="/auth/login" className="auth-link">
              Sign in here
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

export default Register;