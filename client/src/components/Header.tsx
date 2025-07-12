"use client"

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { User } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Browse', href: '/browse', icon: '👗' },
    { name: 'About Us', href: '/about', icon: 'ℹ️' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/home';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Image
                src="/logo.jpeg"
                alt="ReWear Logo"
                width={32}
                height={32}
                className="hidden sm:block rounded-lg"
            ></Image>
            </div>
            <span className="text-xl font-bold text-neutral-900">ReWear</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <span className="text-lg">📊</span>
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                
                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user?.name || 'User'}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full border-2 border-primary-200"
                      onClick={()=> {window.location.href='/dashboard'}}
                    />
                  ) : (
                    <div onClick={()=> {window.location.href='/dashboard'}} className="w-8 h-8 rounded-full border-2 border-primary-200 bg-primary-50 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                  )}
                  <span className="hidden sm:block text-sm font-medium text-neutral-700">
                    {session.user?.name || 'User'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  href="/login"
                  className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-neutral-600 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 p-2"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (you can expand this with state management) */}
      <div className="md:hidden border-t border-neutral-200 bg-white">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          
          {session ? (
            <Link
              href="/dashboard"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              }`}
            >
              <span className="text-xl">📊</span>
              <span>Dashboard</span>
            </Link>
          ) : (
            <div className="pt-2 border-t border-neutral-200">
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="block mt-1 px-3 py-2 text-base font-medium bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
