'use client';
import { useState, useEffect } from 'react';
import GlobalLoader from './GlobalLoader';

export default function PageLoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Show loader for at least 1.5 seconds to be visible
    const timer = setTimeout(() => setIsPageLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalLoader isLoading={isPageLoading} message="Loading VedicUrja..." />
      {children}
    </>
  );
}
