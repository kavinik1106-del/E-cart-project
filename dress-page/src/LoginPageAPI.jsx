import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { apiCall, API_ENDPOINTS } from './config/apiConfig.js';

export default function LoginPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: ''
  });

  // Handle login input change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 1) return { text: 'Weak', color: 'text-red-500' };
    if (strength <= 3) return { text: 'Medium', color: 'text-yellow-500' };
    return { text: 'Strong', color: 'text-green-500' };
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await apiCall(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password
        })
      });

      if (response.success) {
        setMessageType('success');
        setMessage('Login successful! Redirecting...');

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setMessageType('error');
        setMessage(response.message || 'Login failed');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validation
    if (!registerData.email || !registerData.password || !registerData.confirmPassword) {
      setMessageType('error');
      setMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setMessageType('error');
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    if (registerData.password.length < 6) {
      setMessageType('error');
      setMessage('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          confirmPassword: registerData.confirmPassword,
          first_name: registerData.first_name,
          last_name: registerData.last_name,
          phone: registerData.phone
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessageType('success');
        setMessage('Registration successful! Please login.');

        // Reset form
        setRegisterData({
          email: '',
          password: '',
          confirmPassword: '',
          first_name: '',
          last_name: '',
          phone: ''
        });

        // Switch to login tab after 2 seconds
        setTimeout(() => {
          setActiveTab('login');
          setMessage('');
        }, 2000);
      } else {
        setMessageType('error');
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessageType('error');
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Logo/Brand */}
        <div className="brand-section">
          <h1 className="brand-logo">StyleNest</h1>
          <p className="brand-tagline">Your Fashion Destination</p>
        </div>

        {/* Login/Register Card */}
        <div className="auth-card">
          <div className="auth-header">
            <h2 className="auth-title">
              {activeTab === 'login' ? 'Sign in' : 'Create account'}
            </h2>
            {activeTab === 'login' && (
              <p className="auth-subtitle">Welcome back! Please sign in to your account.</p>
            )}
          </div>

          {/* Tab Switcher */}
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign in
            </button>
            <button
              className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              New customer? Create account
            </button>
          </div>

          {/* Message Display */}
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="auth-form">
              <div className="form-group">
                <label htmlFor="login-email">Email or mobile phone number</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkmark"></span>
                  Keep me signed in
                </label>
                <a href="#forgot" className="forgot-link">Forgot your password?</a>
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <div className="form-footer">
                <p className="terms-text">
                  By continuing, you agree to StyleNest's{' '}
                  <a href="#conditions" className="link">Conditions of Use</a> and{' '}
                  <a href="#privacy" className="link">Privacy Notice</a>.
                </p>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="auth-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="first-name">First name</label>
                  <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    value={registerData.first_name}
                    onChange={handleRegisterChange}
                    placeholder="First name"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last-name">Last name</label>
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    value={registerData.last_name}
                    onChange={handleRegisterChange}
                    placeholder="Last name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-email">Email</label>
                <input
                  type="email"
                  id="reg-email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Mobile number (optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                  placeholder="Enter your mobile number"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="reg-password">Password</label>
                <input
                  type="password"
                  id="reg-password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="At least 6 characters"
                  required
                  className="form-input"
                />
                {registerData.password && (
                  <div className="password-strength">
                    <div className="strength-bar">
                      <div 
                        className={`strength-fill strength-${getPasswordStrength(registerData.password)}`}
                        style={{ width: `${(getPasswordStrength(registerData.password) / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className={`strength-text ${getPasswordStrengthText(getPasswordStrength(registerData.password)).color}`}>
                      {getPasswordStrengthText(getPasswordStrength(registerData.password)).text}
                    </span>
                  </div>
                )}
                <div className="password-hint">
                  Passwords must be at least 6 characters.
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirm-password">Re-enter password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="Re-enter your password"
                  required
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create your StyleNest account'}
              </button>

              <div className="form-footer">
                <p className="terms-text">
                  By creating an account, you agree to StyleNest's{' '}
                  <a href="#conditions" className="link">Conditions of Use</a> and{' '}
                  <a href="#privacy" className="link">Privacy Notice</a>.
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-section">
            <h4>Need help?</h4>
            <ul>
              <li><a href="#forgot">Forgot Password</a></li>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Shopping</h4>
            <ul>
              <li><a href="#deals">Today's Deals</a></li>
              <li><a href="#categories">Shop by Category</a></li>
              <li><a href="#new">New Arrivals</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
