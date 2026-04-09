import { useQuery } from '@tanstack/react-query';

export function useServices() {
  return useQuery({ queryKey: ['useServices'], queryFn: async () => ({}) });
}
