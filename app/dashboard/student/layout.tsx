'use client';

import { useRouteGuard } from '../../hooks/useRouteGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, isLoading } = useRouteGuard();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!authorized) {
    return null; // Will redirect in the hook
  }

  return <>{children}</>;
}