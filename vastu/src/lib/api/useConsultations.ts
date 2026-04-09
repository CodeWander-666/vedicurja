import { useQuery } from '@tanstack/react-query';

export function useConsultations() {
  return useQuery({ queryKey: ['useConsultations'], queryFn: async () => ({}) });
}
