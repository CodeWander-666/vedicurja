'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import SmoothScroll from '@/components/global/ScrollSmoother';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { HomeSection, FreeTool, Service, Course, BlogPost, Testimonial, Consultation, Payment, Profile } from '@/types/admin';

const tabs = [
  'Dashboard',
  'Home',
  'Free Tools',
  'Services',
  'Courses',
  'Blogs',
  'Testimonials',
  'Bookings',
  'Payments',
  'Users',
  'AI Tools',
  'Contact Msgs',
] as const;
type Tab = typeof tabs[number];

export default function AdminPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');

  // Redirect if not admin (handled by layout, but double-check)
  if (profile?.role !== 'admin') {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">Access Denied</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto notranslate">
          <h1 className="font-serif text-4xl text-nidra-indigo mb-8">Admin Dashboard</h1>
          <div className="flex flex-wrap gap-2 border-b border-prakash-gold/20 pb-4 mb-8">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm transition ${
                  activeTab === tab ? 'bg-sacred-saffron text-white' : 'bg-vastu-stone text-nidra-indigo'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}>
              {activeTab === 'Dashboard' && <DashboardTab />}
              {activeTab === 'Home' && <HomeTab />}
              {activeTab === 'Free Tools' && <FreeToolsTab />}
              {activeTab === 'Services' && <ServicesTab />}
              {activeTab === 'Courses' && <CoursesTab />}
              {activeTab === 'Blogs' && <BlogsTab />}
              {activeTab === 'Testimonials' && <TestimonialsTab />}
              {activeTab === 'Bookings' && <BookingsTab />}
              {activeTab === 'Payments' && <PaymentsTab />}
              {activeTab === 'Users' && <UsersTab />}
              {activeTab === 'AI Tools' && <AIToolsTab />}
              {activeTab === 'Contact Msgs' && <ContactMessagesTab />}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboard Tab – Overview stats                                      */
/* ------------------------------------------------------------------ */
function DashboardTab() {
  const { items: users } = useRealtimeContent<Profile>('profiles');
  const { items: payments } = useRealtimeContent<Payment>('payments');
  const { items: consultations } = useRealtimeContent<Consultation>('consultations');
  const { items: posts } = useRealtimeContent<BlogPost>('blog_posts');

  const totalUsers = users.length;
  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const pendingConsultations = consultations.filter(c => c.status === 'pending_payment').length;
  const publishedPosts = posts.filter(p => p.is_published).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard label="Total Users" value={totalUsers} icon="👥" />
      <StatCard label="Total Revenue" value={`₹${totalRevenue}`} icon="💰" />
      <StatCard label="Pending Consultations" value={pendingConsultations} icon="📅" />
      <StatCard label="Published Posts" value={publishedPosts} icon="📝" />
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-prakash-gold/20">
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold text-nidra-indigo">{value}</div>
      <div className="text-sm text-nidra-indigo/60">{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Home Tab – Manage home_sections                                     */
/* ------------------------------------------------------------------ */
function HomeTab() {
  const { items, loading } = useRealtimeContent<HomeSection>('home_sections', 'order_index');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<HomeSection>>({});

  const handleEdit = (section: HomeSection) => {
    setEditingId(section.id);
    setEditForm(section);
  };

  const handleSave = async () => {
    if (!editingId) return;
    await supabase.from('home_sections').update(editForm).eq('id', editingId);
    setEditingId(null);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from('home_sections').update({ is_published: !current }).eq('id', id);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl">Home Sections</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">Key</th>
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Published</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(section => (
              <tr key={section.id} className="border-b">
                <td className="py-2">{section.section_key}</td>
                <td className="py-2">
                  {editingId === section.id ? (
                    <input
                      type="text"
                      value={editForm.title || ''}
                      onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                      className="border rounded px-2 py-1"
                    />
                  ) : (
                    section.title
                  )}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => handleTogglePublish(section.id, section.is_published)}
                    className={`px-2 py-1 rounded text-xs ${section.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {section.is_published ? 'Published' : 'Draft'}
                  </button>
                </td>
                <td className="py-2">
                  {editingId === section.id ? (
                    <>
                      <button onClick={handleSave} className="text-green-600 mr-2">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(section)} className="text-prakash-gold">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Free Tools Tab                                                      */
/* ------------------------------------------------------------------ */
function FreeToolsTab() {
  const { items, loading } = useRealtimeContent<FreeTool>('free_tools', 'order_index');
  if (loading) return <LoadingSpinner />;
  return <DataTable data={items} columns={['tool_key','title','description','premium_price','is_published']} tableName="free_tools" />;
}

/* ------------------------------------------------------------------ */
/* Services Tab                                                        */
/* ------------------------------------------------------------------ */
function ServicesTab() {
  const { items, loading } = useRealtimeContent<Service>('services', 'order_index');
  if (loading) return <LoadingSpinner />;
  return <DataTable data={items} columns={['slug','title','description','is_published']} tableName="services" />;
}

/* ------------------------------------------------------------------ */
/* Courses Tab                                                         */
/* ------------------------------------------------------------------ */
function CoursesTab() {
  const { items, loading } = useRealtimeContent<Course>('courses', 'created_at', false);
  if (loading) return <LoadingSpinner />;
  return <DataTable data={items} columns={['slug','title','level','subject','price','is_published']} tableName="courses" />;
}

/* ------------------------------------------------------------------ */
/* Blogs Tab                                                           */
/* ------------------------------------------------------------------ */
function BlogsTab() {
  const { items, loading } = useRealtimeContent<BlogPost>('blog_posts', 'published_at', false);
  if (loading) return <LoadingSpinner />;
  return <DataTable data={items} columns={['slug','title','category','is_published']} tableName="blog_posts" />;
}

/* ------------------------------------------------------------------ */
/* Testimonials Tab                                                    */
/* ------------------------------------------------------------------ */
function TestimonialsTab() {
  const { items, loading } = useRealtimeContent<Testimonial>('testimonials', 'order_index');
  if (loading) return <LoadingSpinner />;
  return <DataTable data={items} columns={['client_name','location','rating','is_published']} tableName="testimonials" />;
}

/* ------------------------------------------------------------------ */
/* Bookings Tab                                                        */
/* ------------------------------------------------------------------ */
function BookingsTab() {
  const { items, loading } = useRealtimeContent<Consultation>('consultations', 'scheduled_at', false);
  const [updating, setUpdating] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    await supabase.from('consultations').update({ status }).eq('id', id);
    setUpdating(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Client</th>
            <th className="py-2 text-left">Scheduled</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Meeting</th>
          </tr>
        </thead>
        <tbody>
          {items.map(c => (
            <tr key={c.id} className="border-b">
              <td className="py-2">{c.client_id?.slice(0,8)}...</td>
              <td className="py-2">{new Date(c.scheduled_at).toLocaleString()}</td>
              <td className="py-2">
                <select
                  value={c.status}
                  onChange={e => updateStatus(c.id, e.target.value)}
                  disabled={updating === c.id}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending_payment">Pending</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-2">
                {c.meeting_url ? (
                  <button onClick={() => navigator.clipboard?.writeText(c.meeting_url!)} className="text-prakash-gold underline text-xs">
                    Copy Link
                  </button>
                ) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Payments Tab                                                        */
/* ------------------------------------------------------------------ */
function PaymentsTab() {
  const { items, loading } = useRealtimeContent<Payment>('payments', 'created_at', false);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">User</th>
            <th className="py-2 text-left">Amount</th>
            <th className="py-2 text-left">Status</th>
            <th className="py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id} className="border-b">
              <td className="py-2">{p.user_id?.slice(0,8)}...</td>
              <td className="py-2">₹{p.amount}</td>
              <td className="py-2">{p.status}</td>
              <td className="py-2">{new Date(p.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Users Tab                                                           */
/* ------------------------------------------------------------------ */
function UsersTab() {
  const { items, loading } = useRealtimeContent<Profile>('profiles', 'created_at', false);
  const [updating, setUpdating] = useState<string | null>(null);

  const toggleRole = async (id: string, currentRole: string) => {
    setUpdating(id);
    const newRole = currentRole === 'admin' ? 'client' : 'admin';
    await supabase.from('profiles').update({ role: newRole }).eq('id', id);
    setUpdating(null);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Role</th>
            <th className="py-2 text-left">Coins</th>
            <th className="py-2 text-left">Joined</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(u => (
            <tr key={u.id} className="border-b">
              <td className="py-2">{u.full_name || '—'}</td>
              <td className="py-2">{u.role}</td>
              <td className="py-2">{u.coins}</td>
              <td className="py-2">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="py-2">
                <button
                  onClick={() => toggleRole(u.id, u.role)}
                  disabled={updating === u.id}
                  className="text-xs bg-prakash-gold/20 px-2 py-1 rounded"
                >
                  Toggle Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* AI Tools Tab (Stats)                                                */
/* ------------------------------------------------------------------ */
function AIToolsTab() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.rpc('get_tool_usage_stats').then(({ data }) => {
      setStats(data || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl">AI Tools Usage</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div key={stat.tool_type} className="bg-white p-6 rounded-xl shadow-md border">
            <h3 className="font-serif text-xl capitalize">{stat.tool_type.replace('_',' ')}</h3>
            <div className="mt-4 space-y-2">
              <p><span className="font-medium">Total Uses:</span> {stat.total_uses}</p>
              <p><span className="font-medium">Unique Users:</span> {stat.unique_users}</p>
              <p><span className="font-medium">Premium Unlocks:</span> {stat.premium_unlocks}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact Messages Tab                                                */
/* ------------------------------------------------------------------ */
function ContactMessagesTab() {
  const { items, loading } = useRealtimeContent<any>('contact_messages', 'created_at', false);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 text-left">Date</th>
            <th className="py-2 text-left">Name</th>
            <th className="py-2 text-left">Email</th>
            <th className="py-2 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {items.map(m => (
            <tr key={m.id} className="border-b">
              <td className="py-2">{new Date(m.created_at).toLocaleString()}</td>
              <td className="py-2">{m.name}</td>
              <td className="py-2">{m.email}</td>
              <td className="py-2 max-w-md truncate">{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable Data Table with inline editing (simplified)                */
/* ------------------------------------------------------------------ */
function DataTable({ data, columns, tableName }: { data: any[]; columns: string[]; tableName: string }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const handleEdit = (row: any) => {
    setEditingId(row.id);
    setEditForm(row);
  };

  const handleSave = async () => {
    if (!editingId) return;
    const { id, created_at, updated_at, ...rest } = editForm;
    await supabase.from(tableName).update(rest).eq('id', editingId);
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return;
    await supabase.from(tableName).delete().eq('id', id);
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from(tableName).update({ is_published: !current }).eq('id', id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            {columns.map(col => <th key={col} className="py-2 text-left capitalize">{col.replace('_',' ')}</th>)}
            <th className="py-2 text-left">Published</th>
            <th className="py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b">
              {columns.map(col => (
                <td key={col} className="py-2">
                  {editingId === row.id ? (
                    <input
                      type={col.includes('price') ? 'number' : 'text'}
                      value={editForm[col] || ''}
                      onChange={e => setEditForm({ ...editForm, [col]: e.target.value })}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    String(row[col] ?? '—')
                  )}
                </td>
              ))}
              <td className="py-2">
                <button
                  onClick={() => handleTogglePublish(row.id, row.is_published)}
                  className={`px-2 py-1 rounded text-xs ${row.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  {row.is_published ? 'Yes' : 'No'}
                </button>
              </td>
              <td className="py-2">
                {editingId === row.id ? (
                  <>
                    <button onClick={handleSave} className="text-green-600 mr-2">Save</button>
                    <button onClick={() => setEditingId(null)} className="text-gray-500">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(row)} className="text-prakash-gold mr-2">Edit</button>
                    <button onClick={() => handleDelete(row.id)} className="text-red-500">Del</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-12">
      <div className="w-8 h-8 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
