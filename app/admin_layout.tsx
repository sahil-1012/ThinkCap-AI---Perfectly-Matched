'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in as admin
    // This is a simplified example - in a real app, you would check JWT tokens or session data
    const checkAuth = () => {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      // In a real app, check for admin credentials in localStorage or cookies
      const isAdmin = localStorage.getItem('adminAuth') === 'true';
      
      if (!isAdmin) {
        // Redirect to admin login if not authorized
        router.push('/admin/login');
      } else {
        setIsAuthorized(true);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If not authorized and not on login page, the useEffect will handle redirect
  if (!isAuthorized && pathname !== '/admin/login') {
    return null;
  }

  // Render children (admin pages)
  return <>{children}</>;
}