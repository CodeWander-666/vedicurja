import { useQuery } from '@tanstack/react-query';

export function useAI() {
  return useQuery({ queryKey: ['useAI'], queryFn: async () => ({}) });
}
