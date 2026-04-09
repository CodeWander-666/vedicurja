import { useQuery } from '@tanstack/react-query';

export function useBooks() {
  return useQuery({ queryKey: ['useBooks'], queryFn: async () => ({}) });
}
