"use client"

import { SessionProvider } from 'next-auth/react';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-neutral-50">
        <Header />
        
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-6">
              Welcome to{' '}
              <span className="text-primary-600">ReWear</span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-8">
              Give your clothes a second life. Discover sustainable fashion and join our community of eco-conscious fashion lovers.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                Start Browsing
              </button>
              <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-medium text-lg transition-colors">
                Learn More
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">♻️</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Sustainable Fashion</h3>
              <p className="text-neutral-600">
                Reduce waste by giving pre-loved clothes a new home and extending their lifecycle.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">👗</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Quality Items</h3>
              <p className="text-neutral-600">
                Discover carefully curated fashion pieces that are still in excellent condition.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Eco Impact</h3>
              <p className="text-neutral-600">
                Track your environmental impact and see how much CO₂ you're saving with each purchase.
              </p>
            </div>
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
