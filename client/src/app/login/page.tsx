"use client"

import { loginWithGoogle } from '@/lib/auth';
import { useSession } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  return (
    <SessionProvider>
      <LoginContent />
    </SessionProvider>
  );
}

function LoginContent() {
  const { data: session } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [heights, setHeights] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  useEffect(() => {
    setHeights(Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)));
  },[]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('Form submitted:', { isSignUp, email, username, password });

    try {
      if (isSignUp) {
        // Register user
        console.log('Attempting registration...');
        const response = await fetch('http://localhost:8000/api/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            username,
            password,
          }),
        });

        console.log('Registration response:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Registration successful:', data);
          setIsSignUp(false);
          setError('');
          alert('Registration successful! Please sign in.');
        } else {
          const errorData = await response.json();
          console.log('Registration error:', errorData);
          setError(errorData.detail || 'Registration failed');
        }
      } else {
        // Login user
        console.log('Attempting login...');
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);

        const response = await fetch('http://localhost:8000/api/v1/auth/login', {
          method: 'POST',
          body: formData,
        });

        console.log('Login response:', response.status);
        if (response.ok) {
          const data = await response.json();
          console.log('Login successful:', data);
          localStorage.setItem('access_token', data.access_token);
          window.location.href = '/home';
        } else {
          const errorData = await response.json();
          console.log('Login error:', errorData);
          setError(errorData.detail || 'Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Network error:', error);
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    // Redirect to dashboard or home if already logged in
    window.location.href = '/home';
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Column - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className="ml-3 text-2xl font-bold text-neutral-900">ReWear</span>
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </h2>
            <p className="text-neutral-600">
              {isSignUp ? 'Create your ReWear account' : 'Welcome back! Please enter your details'}
            </p>
          </div>

          {/* Sign In Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {/* Username Field (only for signup) */}
            {isSignUp && (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-neutral-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors placeholder-neutral-400 text-neutral-700"
                  required
                  disabled={isLoading}
                />
              </div>
            )}
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors placeholder-neutral-400 text-neutral-700"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors placeholder-neutral-400 text-neutral-900"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                    {passwordVisible ? (
                        <EyeOff className="w-5 h-5" onClick={() => setPasswordVisible(false)} />
                    ) : (
                        <Eye className="w-5 h-5" onClick={() => setPasswordVisible(true)} />
                    )}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-neutral-600">Remember for 30 Days</span>
              </label>
              <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Forgot password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              {isLoading ? (isSignUp ? 'Creating account...' : 'Signing in...') : (isSignUp ? 'Sign Up' : 'Sign In')}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">OR</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-neutral-400"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </button>

              {/* <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-neutral-400"
              >
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Sign up with Facebook
              </button> */}
            </div>

            {/* Sign Up/In Link */}
            <p className="text-center text-sm text-neutral-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setUsername('');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right Column - Welcome Message & Dashboard Preview */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-500 to-accent-600 items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <h2 className="text-xl mb-6">Please sign in to your ReWear account</h2>
          <p className="text-primary-100 mb-8">
            Discover sustainable fashion and give your clothes a second life. Join our community of eco-conscious fashion lovers.
          </p>
          
          {/* Dashboard Preview Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sustainability Report</h3>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-primary-200 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-300 rounded-full"></div>
                <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Mock Chart */}
            <div className="flex items-end justify-between h-24 mb-4">
              {heights.map((height, index) => (
                <div
                  key={index}
                  className="bg-primary-200 rounded-t transition-height duration-1000 ease-in-out"
                  style={{ 
                    height: `${height}%`,
                    width: '6px',
                  }}
                ></div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-primary-200">Items Reworn</div>
                <div className="text-xl font-bold">247</div>
              </div>
              <div>
                <div className="text-primary-200">CO₂ Saved</div>
                <div className="text-xl font-bold">52kg</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

