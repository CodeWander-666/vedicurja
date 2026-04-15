'use client';
import GlobalLoader from '@/components/ui/GlobalLoader';

export default function Loading() {
  return <GlobalLoader isLoading={true} message="Loading..." />;
}
