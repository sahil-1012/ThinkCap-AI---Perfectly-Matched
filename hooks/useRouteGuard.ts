// app/hooks/useRouteGuard.ts

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRouteGuard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('userData');
        
        if (!userData) {
          // Redirect to signup if not authenticated
          router.push('/signup');
        } else {
          setAuthorized(true);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/signup');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { authorized, isLoading };
}