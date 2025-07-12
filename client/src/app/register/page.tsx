"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, User, Mail, Ruler, Sparkles } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    size: '',
    categories: [] as string[]
  });

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const sizeOptions = [
    { value: 'XS', label: 'XS' },
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'XXL', label: 'XXL' }
  ];

  const categoryOptions = [
    { value: 'clothes', label: 'Clothes', icon: '👗', description: 'Dresses, tops, pants, and more' },
    { value: 'footwear', label: 'Footwear', icon: '👟', description: 'Shoes, boots, sandals' },
    { value: 'accessories', label: 'Accessories', icon: '👜', description: 'Bags, jewelry, watches' }
  ];

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Here you would typically make an API call to register the user
      console.log('Registration data:', formData);
    }, 2000);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.username && formData.email;
    }
    if (step === 2) {
      return formData.size;
    }
    if (step === 3) {
      return formData.categories.length > 0;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center space-x-3 text-neutral-600 hover:text-neutral-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.jpeg"
              alt="ReWear Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="text-xl font-bold text-neutral-900">ReWear</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-neutral-900">Join ReWear</h1>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  <span className="text-sm text-primary-600 font-medium">Step {step}/3</span>
                </div>
              </div>
              
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8 animate-slide-up">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">Tell us about yourself</h2>
                      <p className="text-neutral-700 text-sm">Let&apos;s start with your basic information</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-800 mb-2">
                          Username
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleInputChange('username', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="Enter your username"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-neutral-800 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Size Preference */}
                {step === 2 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">What&apos;s your size?</h2>
                      <p className="text-neutral-700 text-sm">This helps us recommend the perfect items for you</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-neutral-800 mb-3">
                        Size Preference
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {sizeOptions.map((size) => (
                          <button
                            key={size.value}
                            type="button"
                            onClick={() => handleInputChange('size', size.value)}
                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                              formData.size === size.value
                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                : 'border-neutral-300 hover:border-primary-300 hover:bg-neutral-50'
                            }`}
                          >
                            <Ruler className="w-5 h-5 mx-auto mb-2" />
                            <span className="font-medium">{size.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Category Preferences */}
                {step === 3 && (
                  <div className="space-y-6 animate-slide-up">
                    <div>
                      <h2 className="text-xl font-semibold text-neutral-900 mb-2">What are you looking for?</h2>
                      <p className="text-neutral-700 text-sm">Select the categories you&apos;re most interested in</p>
                    </div>
                    
                    <div className="space-y-3">
                      {categoryOptions.map((category) => (
                        <button
                          key={category.value}
                          type="button"
                          onClick={() => handleCategoryToggle(category.value)}
                          className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                            formData.categories.includes(category.value)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-300 hover:border-primary-300 hover:bg-neutral-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{category.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium text-neutral-900">{category.label}</div>
                              <div className="text-sm text-neutral-700">{category.description}</div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.categories.includes(category.value)
                                ? 'border-primary-500 bg-primary-500'
                                : 'border-neutral-300'
                            }`}>
                              {formData.categories.includes(category.value) && (
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex space-x-3 pt-6">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="flex-1 px-4 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      disabled={!canProceed()}
                      className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!canProceed() || isLoading}
                      className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Account...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-700">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 