import { AdminGuard } from '@/components/global/AdminGuard';
import { Header } from '@/components/layout/Header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <Header />
      <main className="pt-24 pb-16 px-6 container mx-auto max-w-7xl">
        {children}
      </main>
    </AdminGuard>
  );
}
