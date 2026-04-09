import { useQuery } from '@tanstack/react-query';

export function useBlogPosts() {
  return useQuery({ queryKey: ['useBlogPosts'], queryFn: async () => ({}) });
}
