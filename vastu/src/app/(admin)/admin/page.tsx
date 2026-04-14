'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { uploadImage, uploadVideo } from '@/lib/upload';
import {
  Course, Module, Chapter, BlogPost, Service, Testimonial, Consultation, Payment,
  Profile, HomeSection, FreeTool, VirtualConsultSection, SiteSetting, ErrorLog
} from '@/types/admin';

const COLORS = ['#C88A5D', '#E8B960', '#1A2A3A', '#8B5A2B', '#1985A1'];

// ------------------------------------------------------------------------------
// Reusable Components
// ------------------------------------------------------------------------------
const Input = ({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) => (
  <div><label className="block text-sm mb-1 text-nidra-indigo/70">{label}</label><input {...props} className="w-full p-3 border border-prakash-gold/20 rounded-xl bg-vastu-parchment" /></div>
);

const TextArea = ({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <div><label className="block text-sm mb-1 text-nidra-indigo/70">{label}</label><textarea {...props} className="w-full p-3 border border-prakash-gold/20 rounded-xl bg-vastu-parchment" /></div>
);

const ImageUpload = ({ currentUrl, onUpload, bucket = 'site-images' }: { currentUrl: string; onUpload: (url: string) => void; bucket?: string }) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true);
    const url = await uploadImage(file, bucket);
    if (url) onUpload(url);
    setUploading(false);
  };
  return (
    <div className="flex items-center gap-4">
      <button type="button" onClick={() => fileRef.current?.click()} className="px-4 py-2 bg-bg-tertiary rounded-xl text-sm" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      <input type="file" ref={fileRef} onChange={handleFile} accept="image/*" className="hidden" />
      {currentUrl && <img src={currentUrl} className="h-16 w-24 object-cover rounded-lg border border-prakash-gold/20" />}
    </div>
  );
};

// ------------------------------------------------------------------------------
// Custom Hook for Realtime Table
// ------------------------------------------------------------------------------
function useRealtimeTable<T>(table: string, orderBy: string = 'created_at', ascending: boolean = false) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const fetch = async () => {
    const { data } = await supabase.from(table).select('*').order(orderBy, { ascending });
    setItems((data as T[]) || []);
    setLoading(false);
  };
  useEffect(() => {
    fetch();
    const ch = supabase.channel(`${table}-realtime`).on('postgres_changes', { event: '*', schema: 'public', table }, fetch).subscribe();
    return () => { ch.unsubscribe().catch(console.error); };
  }, [table, orderBy, ascending]);
  return { items, loading, refetch: fetch };
}

// ------------------------------------------------------------------------------
// Dashboard Tab (Full Analytics)
// ------------------------------------------------------------------------------
const DashboardTab = () => {
  const [stats, setStats] = useState({ users:0, courses:0, blogs:0, consultations:0, revenue:0, active:0 });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [toolUsage, setToolUsage] = useState<any[]>([]);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [topPages, setTopPages] = useState<{path:string, count:number}[]>([]);

  const fetchAll = async () => {
    const [
      { count: users }, { count: courses }, { count: blogs }, { count: consultations },
      { data: payments }, { data: active }, { data: tools }, { data: pageViews }, { data: errorLogs }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count:'exact', head:true }),
      supabase.from('courses').select('*', { count:'exact', head:true }),
      supabase.from('blog_posts').select('*', { count:'exact', head:true }),
      supabase.from('consultations').select('*', { count:'exact', head:true }),
      supabase.from('payments').select('amount,created_at').eq('status','succeeded').order('created_at', { ascending: true }),
      supabase.rpc('get_active_visitors'),
      supabase.from('tool_usage').select('tool_type'),
      supabase.from('page_views').select('path,created_at').order('created_at', { ascending: false }).limit(5000),
      supabase.from('error_logs').select('*').order('created_at', { ascending: false }).limit(20)
    ]);
    const revenue = (payments as any[] || []).reduce((s,p) => s + (p.amount||0), 0);
    const byDate: Record<string,number> = {};
    (payments as any[] || []).forEach(p => { const d = p.created_at?.split('T')[0]; if(d) byDate[d] = (byDate[d]||0) + p.amount; });
    setRevenueData(Object.entries(byDate).map(([date,amount]) => ({ date, amount })));
    const toolCounts: Record<string,number> = {};
    (tools || []).forEach(t => { toolCounts[t.tool_type] = (toolCounts[t.tool_type]||0) + 1; });
    setToolUsage(Object.entries(toolCounts).map(([name,value]) => ({ name, value })));
    const viewsByHour: Record<string,number> = {};
    (pageViews as any[] || []).forEach(v => { const h = v.created_at?.slice(0,13); if(h) viewsByHour[h] = (viewsByHour[h]||0) + 1; });
    setTrafficData(Object.entries(viewsByHour).map(([hour,count]) => ({ hour, count })).sort((a,b)=>a.hour.localeCompare(b.hour)).slice(-48));
    const pageCounts: Record<string,number> = {};
    (pageViews as any[] || []).forEach(v => { pageCounts[v.path] = (pageCounts[v.path]||0) + 1; });
    setTopPages(Object.entries(pageCounts).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([path,count])=>({path,count})));
    setErrors((errorLogs as ErrorLog[]) || []);
    setStats({ users:users||0, courses:courses||0, blogs:blogs||0, consultations:consultations||0, revenue, active:active||0 });
  };

  useEffect(() => {
    fetchAll();
    const channels: RealtimeChannel[] = [];
    ['profiles','courses','blog_posts','consultations','payments','tool_usage','page_views','error_logs'].forEach(t => {
      const ch = supabase.channel(`dash-${t}`).on('postgres_changes', { event:'*', schema:'public', table:t }, fetchAll).subscribe();
      channels.push(ch);
    });
    return () => { channels.forEach(c => c.unsubscribe().catch(console.error)); };
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[{ label:'Users', value:stats.users, icon:'👥' },{ label:'Courses', value:stats.courses, icon:'📚' },{ label:'Blogs', value:stats.blogs, icon:'✍️' },{ label:'Consultations', value:stats.consultations, icon:'📅' },{ label:'Revenue', value:`₹${stats.revenue.toLocaleString()}`, icon:'💰' },{ label:'Active Now', value:stats.active, icon:'🟢' }].map(s => (
          <motion.div key={s.label} initial={{ opacity:0 }} animate={{ opacity:1 }} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl border border-prakash-gold/20">
            <span className="text-2xl">{s.icon}</span><p className="text-2xl font-serif mt-1">{s.value}</p><p className="text-xs text-nidra-indigo/70">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl"><h3 className="font-serif text-lg mb-4">Revenue Trend</h3><ResponsiveContainer width="100%" height={200}><LineChart data={revenueData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" tick={{fontSize:10}} /><YAxis /><Tooltip /><Line type="monotone" dataKey="amount" stroke="#C88A5D" strokeWidth={2} /></LineChart></ResponsiveContainer></div>
        <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl"><h3 className="font-serif text-lg mb-4">Tool Usage</h3><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={toolUsage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>{toolUsage.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Tooltip /></PieChart></ResponsiveContainer></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl"><h3 className="font-serif text-lg mb-4">Traffic (Last 48h)</h3><ResponsiveContainer width="100%" height={200}><AreaChart data={trafficData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="hour" tickFormatter={v=>v?.slice(11)||''} /><YAxis /><Tooltip /><Area type="monotone" dataKey="count" stroke="#C88A5D" fill="#C88A5D" fillOpacity={0.3} /></AreaChart></ResponsiveContainer></div>
        <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl"><h3 className="font-serif text-lg mb-4">Top Pages</h3><div className="space-y-2">{topPages.map(p=><div key={p.path} className="flex justify-between"><span className="truncate">{p.path}</span><span className="font-medium">{p.count}</span></div>)}</div></div>
      </div>
      <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl"><h3 className="font-serif text-lg mb-4">Recent Errors</h3><div className="space-y-2 max-h-60 overflow-auto">{errors.map(e=><div key={e.id} className="p-3 bg-red-50 border border-red-200 rounded"><p className="font-medium text-red-700">{e.source}: {e.message}</p><p className="text-xs text-red-500">{new Date(e.created_at).toLocaleString()}</p></div>)}</div></div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Home Tab (Full CRUD)
// ------------------------------------------------------------------------------
const HomeTab = () => {
  const { items, refetch } = useRealtimeTable<HomeSection>('home_sections', 'order_index');
  const [editing, setEditing] = useState<HomeSection | null>(null);
  const [form, setForm] = useState({ section_key:'', title:'', subtitle:'', description:'', image_url:'', button_text:'', button_link:'', order_index:0, is_published:true });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = form.image_url;
    if (imageFile) { const u = await uploadImage(imageFile, 'site-images'); if (u) url = u; }
    const payload = { ...form, image_url: url };
    if (editing) await supabase.from('home_sections').update(payload).eq('id', editing.id);
    else await supabase.from('home_sections').insert(payload);
    setEditing(null); setForm({ section_key:'', title:'', subtitle:'', description:'', image_url:'', button_text:'', button_link:'', order_index:0, is_published:true }); setImageFile(null); refetch();
  };

  const handleEdit = (section: HomeSection) => { setEditing(section); setForm({ ...section, image_url: section.image_url||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('home_sections').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Section' : 'Add Section'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Section Key" value={form.section_key} onChange={e=>setForm({...form, section_key:e.target.value})} required />
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <Input label="Subtitle" value={form.subtitle} onChange={e=>setForm({...form, subtitle:e.target.value})} />
          <Input label="Button Text" value={form.button_text} onChange={e=>setForm({...form, button_text:e.target.value})} />
          <Input label="Button Link" value={form.button_link} onChange={e=>setForm({...form, button_link:e.target.value})} />
          <Input label="Order" type="number" value={form.order_index} onChange={e=>setForm({...form, order_index:+e.target.value})} />
        </div>
        <TextArea label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <ImageUpload currentUrl={form.image_url} onUpload={url=>setForm({...form, image_url:url})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({ section_key:'', title:'', subtitle:'', description:'', image_url:'', button_text:'', button_link:'', order_index:0, is_published:true });}} className="ml-4 border px-6 py-2 rounded-full">Cancel</button>}
      </form>
      <div className="space-y-2">
        {items.map(s => <div key={s.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between items-center">
          <div><span className="font-medium">{s.section_key}</span> - {s.title}</div>
          <div><button onClick={()=>handleEdit(s)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(s.id)} className="text-red-500">Delete</button></div>
        </div>)}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Free Tools Tab (Full CRUD)
// ------------------------------------------------------------------------------
const FreeToolsTab = () => {
  const { items, refetch } = useRealtimeTable<FreeTool>('free_tools', 'order_index');
  const [editing, setEditing] = useState<FreeTool | null>(null);
  const [form, setForm] = useState({ tool_key:'', title:'', tagline:'', description:'', features:'', image_url:'', color:'#C88A5D', order_index:0, is_published:true });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let url = form.image_url;
    if (imageFile) { const u = await uploadImage(imageFile, 'site-images'); if (u) url = u; }
    const payload = { ...form, features: form.features.split(',').map(s=>s.trim()), image_url: url };
    if (editing) await supabase.from('free_tools').update(payload).eq('id', editing.id);
    else await supabase.from('free_tools').insert(payload);
    setEditing(null); setForm({ tool_key:'', title:'', tagline:'', description:'', features:'', image_url:'', color:'#C88A5D', order_index:0, is_published:true }); setImageFile(null); refetch();
  };

  const handleEdit = (tool: FreeTool) => { setEditing(tool); setForm({ ...tool, features: tool.features.join(', '), image_url: tool.image_url||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('free_tools').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Tool' : 'Add Tool'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Tool Key" value={form.tool_key} onChange={e=>setForm({...form, tool_key:e.target.value})} required />
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <Input label="Tagline" value={form.tagline} onChange={e=>setForm({...form, tagline:e.target.value})} />
          <Input label="Color" type="color" value={form.color} onChange={e=>setForm({...form, color:e.target.value})} />
          <Input label="Order" type="number" value={form.order_index} onChange={e=>setForm({...form, order_index:+e.target.value})} />
        </div>
        <TextArea label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <Input label="Features (comma-separated)" value={form.features} onChange={e=>setForm({...form, features:e.target.value})} />
        <ImageUpload currentUrl={form.image_url} onUpload={url=>setForm({...form, image_url:url})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
        {editing && <button type="button" onClick={()=>{setEditing(null); setForm({ tool_key:'', title:'', tagline:'', description:'', features:'', image_url:'', color:'#C88A5D', order_index:0, is_published:true });}} className="ml-4 border px-6 py-2 rounded-full">Cancel</button>}
      </form>
      <div className="space-y-2">{items.map(t => <div key={t.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><span>{t.tool_key} - {t.title}</span><div><button onClick={()=>handleEdit(t)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(t.id)} className="text-red-500">Delete</button></div></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Services Tab (Full CRUD)
// ------------------------------------------------------------------------------
const ServicesTab = () => {
  const { items, refetch } = useRealtimeTable<Service>('services', 'order_index');
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ title:'', slug:'', tagline:'', description:'', benefits:'', use_case:'', image_url:'', order_index:0, is_published:true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, benefits: form.benefits.split(',').map(s=>s.trim()) };
    if (editing) await supabase.from('services').update(payload).eq('id', editing.id);
    else await supabase.from('services').insert(payload);
    setEditing(null); setForm({ title:'', slug:'', tagline:'', description:'', benefits:'', use_case:'', image_url:'', order_index:0, is_published:true }); refetch();
  };

  const handleEdit = (s: Service) => { setEditing(s); setForm({ ...s, benefits: s.benefits.join(', '), image_url: s.image_url||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('services').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Service' : 'Add Service'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
          <Input label="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} required />
          <Input label="Tagline" value={form.tagline} onChange={e=>setForm({...form, tagline:e.target.value})} />
          <Input label="Order" type="number" value={form.order_index} onChange={e=>setForm({...form, order_index:+e.target.value})} />
        </div>
        <TextArea label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <Input label="Benefits (comma)" value={form.benefits} onChange={e=>setForm({...form, benefits:e.target.value})} />
        <TextArea label="Use Case" value={form.use_case} onChange={e=>setForm({...form, use_case:e.target.value})} />
        <ImageUpload currentUrl={form.image_url} onUpload={url=>setForm({...form, image_url:url})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
      </form>
      <div className="space-y-2">{items.map(s => <div key={s.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><span>{s.title}</span><div><button onClick={()=>handleEdit(s)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(s.id)} className="text-red-500">Delete</button></div></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Virtual Consult Tab (Full CRUD)
// ------------------------------------------------------------------------------
const VirtualConsultTab = () => {
  const { items, refetch } = useRealtimeTable<VirtualConsultSection>('virtual_consult_content', 'order_index');
  const [editing, setEditing] = useState<VirtualConsultSection | null>(null);
  const [form, setForm] = useState({ section_key:'', title:'', subtitle:'', description:'', image_url:'', order_index:0, is_published:true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await supabase.from('virtual_consult_content').update(form).eq('id', editing.id);
    else await supabase.from('virtual_consult_content').insert(form);
    setEditing(null); setForm({ section_key:'', title:'', subtitle:'', description:'', image_url:'', order_index:0, is_published:true }); refetch();
  };

  const handleEdit = (s: VirtualConsultSection) => { setEditing(s); setForm({ ...s, image_url: s.image_url||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('virtual_consult_content').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Section' : 'Add Section'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Section Key" value={form.section_key} onChange={e=>setForm({...form, section_key:e.target.value})} required />
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
          <Input label="Subtitle" value={form.subtitle} onChange={e=>setForm({...form, subtitle:e.target.value})} />
          <Input label="Order" type="number" value={form.order_index} onChange={e=>setForm({...form, order_index:+e.target.value})} />
        </div>
        <TextArea label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <ImageUpload currentUrl={form.image_url} onUpload={url=>setForm({...form, image_url:url})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
      </form>
      <div className="space-y-2">{items.map(s => <div key={s.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><span>{s.section_key} - {s.title}</span><div><button onClick={()=>handleEdit(s)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(s.id)} className="text-red-500">Delete</button></div></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Courses Tab (Full CRUD with modules, chapters, video)
// ------------------------------------------------------------------------------
const CoursesTab = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editing, setEditing] = useState<Course | null>(null);
  const [form, setForm] = useState({ title:'', slug:'', description:'', level:'Beginner', subject:'Vastu', price:0, is_published:true, thumbnail_url:'' });
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [moduleForm, setModuleForm] = useState({ title:'', order_index:1 });
  const [chapterForm, setChapterForm] = useState({ title:'', video_url:'', notes:'', order_index:1 });
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLInputElement>(null);

  const fetchCourses = async () => { const { data } = await supabase.from('courses').select('*').order('created_at', { ascending: false }); setCourses((data as Course[]) || []); };
  const fetchModules = async (courseId: string) => { const { data } = await supabase.from('modules').select('id, title, order_index, chapters(id, title, video_url, notes, order_index)').eq('course_id', courseId).order('order_index'); if (data) setModules(data as Module[]); };
  useEffect(() => { fetchCourses(); const ch = supabase.channel('courses-realtime').on('postgres_changes', { event:'*', schema:'public', table:'courses' }, fetchCourses).subscribe(); return () => { ch.unsubscribe().catch(console.error); }; }, []);
  useEffect(() => { if (!selectedCourse) return; fetchModules(selectedCourse); const ch = supabase.channel(`modules-${selectedCourse}`).on('postgres_changes', { event:'*', schema:'public', table:'modules', filter:`course_id=eq.${selectedCourse}` }, ()=>fetchModules(selectedCourse)).on('postgres_changes', { event:'*', schema:'public', table:'chapters' }, ()=>fetchModules(selectedCourse)).subscribe(); return () => { ch.unsubscribe().catch(console.error); }; }, [selectedCourse]);

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let thumb = form.thumbnail_url;
    const payload = { ...form, thumbnail_url: thumb };
    if (editing) await supabase.from('courses').update(payload).eq('id', editing.id);
    else await supabase.from('courses').insert(payload);
    setEditing(null); setForm({ title:'', slug:'', description:'', level:'Beginner', subject:'Vastu', price:0, is_published:true, thumbnail_url:'' }); fetchCourses();
  };

  const handleModuleSubmit = async (e: React.FormEvent) => { e.preventDefault(); if (!selectedCourse) return; await supabase.from('modules').insert({ ...moduleForm, course_id: selectedCourse }); setModuleForm({ title:'', order_index:1 }); fetchModules(selectedCourse); };
  const handleChapterSubmit = async (moduleId: string) => {
    let videoUrl = chapterForm.video_url;
    if (videoFile) { const u = await uploadVideo(videoFile); if (u) videoUrl = u; }
    const payload = { ...chapterForm, video_url: videoUrl };
    if (editingChapter) await supabase.from('chapters').update(payload).eq('id', editingChapter.id);
    else await supabase.from('chapters').insert({ ...payload, module_id: moduleId });
    setEditingChapter(null); setChapterForm({ title:'', video_url:'', notes:'', order_index:1 }); setVideoFile(null); fetchModules(selectedCourse!);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleCourseSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Course' : 'Add Course'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
          <Input label="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} required />
        </div>
        <TextArea label="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <div className="grid md:grid-cols-3 gap-4">
          <select value={form.level} onChange={e=>setForm({...form, level:e.target.value})} className="p-3 border rounded-xl"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
          <select value={form.subject} onChange={e=>setForm({...form, subject:e.target.value})} className="p-3 border rounded-xl"><option>Vastu</option><option>Numerology</option></select>
          <Input label="Price (₹)" type="number" value={form.price} onChange={e=>setForm({...form, price:+e.target.value})} />
        </div>
        <ImageUpload currentUrl={form.thumbnail_url} onUpload={url=>setForm({...form, thumbnail_url:url})} bucket="course-thumbnails" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
      </form>
      <div className="space-y-2">{courses.map(c => <div key={c.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><span>{c.title}</span><div><button onClick={()=>{ setEditing(c); setForm({...c, thumbnail_url:c.thumbnail_url||''}); }} className="text-blue-500 mr-3">Edit</button><button onClick={()=>{ setSelectedCourse(c.id); fetchModules(c.id); }} className="text-green-500 mr-3">Modules</button><button onClick={async()=>{ if(confirm('Delete?')){ await supabase.from('courses').delete().eq('id',c.id); fetchCourses(); }}} className="text-red-500">Delete</button></div></div>)}</div>
      {selectedCourse && (
        <div className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl">
          <h3 className="font-serif text-xl mb-4">Modules</h3>
          <form onSubmit={handleModuleSubmit} className="flex gap-4 mb-4">
            <Input label="Title" value={moduleForm.title} onChange={e=>setModuleForm({...moduleForm, title:e.target.value})} required />
            <Input label="Order" type="number" value={moduleForm.order_index} onChange={e=>setModuleForm({...moduleForm, order_index:+e.target.value})} />
            <button type="submit" className="bg-ganga-sandstone text-white px-4 py-2 rounded">Add</button>
          </form>
          {modules.map(m => (
            <details key={m.id} className="mb-2">
              <summary className="p-3 bg-bg-tertiary rounded cursor-pointer">{m.title} (Order: {m.order_index})</summary>
              <div className="p-3 space-y-2">
                <div className="bg-white p-3 rounded">
                  <h4 className="font-medium mb-2">{editingChapter ? 'Edit Chapter' : 'Add Chapter'}</h4>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <Input label="Title" value={chapterForm.title} onChange={e=>setChapterForm({...chapterForm, title:e.target.value})} />
                    <Input label="Order" type="number" value={chapterForm.order_index} onChange={e=>setChapterForm({...chapterForm, order_index:+e.target.value})} />
                  </div>
                  <TextArea label="Notes" value={chapterForm.notes} onChange={e=>setChapterForm({...chapterForm, notes:e.target.value})} />
                  <div className="flex items-center gap-4 my-2">
                    <button type="button" onClick={()=>videoRef.current?.click()} className="px-3 py-1 bg-gray-200 rounded">Upload Video</button>
                    <input type="file" ref={videoRef} onChange={e=>setVideoFile(e.target.files?.[0]||null)} accept="video/*" className="hidden" />
                    {chapterForm.video_url && <span className="text-green-600">Video ready</span>}
                  </div>
                  <button onClick={()=>handleChapterSubmit(m.id)} className="bg-ganga-sandstone text-white px-4 py-1 rounded">{editingChapter ? 'Update' : 'Add'} Chapter</button>
                </div>
                {m.chapters?.map(ch => <div key={ch.id} className="flex justify-between p-2 bg-gray-50 rounded"><span>{ch.title} {ch.video_url && '📹'}</span><div><button onClick={()=>{ setEditingChapter(ch); setChapterForm({ title:ch.title, video_url:ch.video_url||'', notes:ch.notes||'', order_index:ch.order_index }); }} className="text-blue-500 mr-2">Edit</button><button onClick={async()=>{ if(confirm('Delete?')){ await supabase.from('chapters').delete().eq('id',ch.id); fetchModules(selectedCourse); }}} className="text-red-500">Delete</button></div></div>)}
              </div>
            </details>
          ))}
          <button onClick={()=>setSelectedCourse(null)} className="mt-4 text-ganga-sandstone">Close</button>
        </div>
      )}
    </div>
  );
};

// ------------------------------------------------------------------------------
// Blogs Tab (Full CRUD with image)
// ------------------------------------------------------------------------------
const BlogsTab = () => {
  const { items, refetch } = useRealtimeTable<BlogPost>('blog_posts', 'published_at', false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({ title:'', slug:'', excerpt:'', content:'', category:'Vastu Science', read_time:5, is_published:true, featured_image:'' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await supabase.from('blog_posts').update(form).eq('id', editing.id);
    else await supabase.from('blog_posts').insert(form);
    setEditing(null); setForm({ title:'', slug:'', excerpt:'', content:'', category:'Vastu Science', read_time:5, is_published:true, featured_image:'' }); refetch();
  };
  const handleEdit = (p: BlogPost) => { setEditing(p); setForm({ ...p, featured_image: p.featured_image||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('blog_posts').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Post' : 'Add Post'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
          <Input label="Slug" value={form.slug} onChange={e=>setForm({...form, slug:e.target.value})} required />
        </div>
        <TextArea label="Excerpt" value={form.excerpt} onChange={e=>setForm({...form, excerpt:e.target.value})} />
        <TextArea label="Content (HTML)" value={form.content} onChange={e=>setForm({...form, content:e.target.value})} className="h-40" />
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
          <Input label="Read Time (min)" type="number" value={form.read_time} onChange={e=>setForm({...form, read_time:+e.target.value})} />
        </div>
        <ImageUpload currentUrl={form.featured_image} onUpload={url=>setForm({...form, featured_image:url})} bucket="blog-images" />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Publish'}</button>
      </form>
      <div className="space-y-2">{items.map(p => <div key={p.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><div className="flex items-center gap-3"><img src={p.featured_image||''} className="w-10 h-10 object-cover rounded" /><span>{p.title}</span></div><div><button onClick={()=>handleEdit(p)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(p.id)} className="text-red-500">Delete</button></div></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Testimonials Tab (Full CRUD)
// ------------------------------------------------------------------------------
const TestimonialsTab = () => {
  const { items, refetch } = useRealtimeTable<Testimonial>('testimonials', 'order_index');
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ client_name:'', location:'', project_type:'Residential', rating:5, content:'', avatar_url:'', verified:true, order_index:0, is_published:true });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) await supabase.from('testimonials').update(form).eq('id', editing.id);
    else await supabase.from('testimonials').insert(form);
    setEditing(null); setForm({ client_name:'', location:'', project_type:'Residential', rating:5, content:'', avatar_url:'', verified:true, order_index:0, is_published:true }); refetch();
  };
  const handleEdit = (t: Testimonial) => { setEditing(t); setForm({ ...t, avatar_url: t.avatar_url||'' }); };
  const handleDelete = async (id: string) => { if(confirm('Delete?')) { await supabase.from('testimonials').delete().eq('id', id); refetch(); } };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl space-y-4">
        <h3 className="font-serif text-xl">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Client Name" value={form.client_name} onChange={e=>setForm({...form, client_name:e.target.value})} required />
          <Input label="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <select value={form.project_type} onChange={e=>setForm({...form, project_type:e.target.value})} className="p-3 border rounded-xl"><option>Residential</option><option>Commercial</option><option>Industrial</option><option>Spiritual</option></select>
          <Input label="Rating (1-5)" type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({...form, rating:+e.target.value})} />
          <Input label="Order" type="number" value={form.order_index} onChange={e=>setForm({...form, order_index:+e.target.value})} />
        </div>
        <TextArea label="Content" value={form.content} onChange={e=>setForm({...form, content:e.target.value})} required />
        <ImageUpload currentUrl={form.avatar_url} onUpload={url=>setForm({...form, avatar_url:url})} />
        <label className="flex items-center gap-2"><input type="checkbox" checked={form.is_published} onChange={e=>setForm({...form, is_published:e.target.checked})} /> Published</label>
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">{editing ? 'Update' : 'Create'}</button>
      </form>
      <div className="space-y-2">{items.map(t => <div key={t.id} className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-xl flex justify-between"><span>{t.client_name} - {t.project_type}</span><div><button onClick={()=>handleEdit(t)} className="text-blue-500 mr-3">Edit</button><button onClick={()=>handleDelete(t.id)} className="text-red-500">Delete</button></div></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Bookings Tab (FullCalendar with realtime)
// ------------------------------------------------------------------------------
const BookingsTab = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [clients, setClients] = useState<Profile[]>([]);
  const [form, setForm] = useState({ client_id:'', scheduled_at:'', duration_minutes:60, status:'pending_payment', notes:'' });

  const fetchConsultations = async () => { const { data } = await supabase.from('consultations').select('*, profiles(full_name)').order('scheduled_at'); setConsultations((data as Consultation[]) || []); };
  const fetchClients = async () => { const { data } = await supabase.from('profiles').select('id, full_name').order('full_name'); setClients((data as Profile[]) || []); };
  useEffect(() => { fetchConsultations(); fetchClients(); const ch = supabase.channel('bookings').on('postgres_changes', { event:'*', schema:'public', table:'consultations' }, fetchConsultations).subscribe(); return () => { ch.unsubscribe().catch(console.error); }; }, []);

  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await supabase.from('consultations').insert({ ...form, scheduled_at: new Date(form.scheduled_at).toISOString() }); setForm({ client_id:'', scheduled_at:'', duration_minutes:60, status:'pending_payment', notes:'' }); };
  const handleEventDrop = async (info: any) => { await supabase.from('consultations').update({ scheduled_at: info.event.startStr }).eq('id', info.event.id); };

  const events = consultations.map(c => ({ id:c.id, title:`${c.profiles?.full_name||'Client'} (${c.status})`, start:c.scheduled_at, end: new Date(new Date(c.scheduled_at).getTime() + c.duration_minutes*60000).toISOString(), backgroundColor: c.status==='scheduled'?'#10b981':'#eab308' }));

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl">
        <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} initialView="timeGridWeek" headerToolbar={{ left:'prev,next today', center:'title', right:'dayGridMonth,timeGridWeek,timeGridDay' }} editable selectable events={events} eventDrop={handleEventDrop} height="auto" />
      </div>
      <div className="bg-white/70 dark:bg-dark-surface/70 p-4 rounded-2xl">
        <h3 className="font-serif text-lg mb-4">Add Booking</h3>
        <form onSubmit={handleSubmit} className="space-y-3">
          <select value={form.client_id} onChange={e=>setForm({...form, client_id:e.target.value})} className="w-full p-3 border rounded-xl" required><option value="">Select Client</option>{clients.map(c=><option key={c.id} value={c.id}>{c.full_name}</option>)}</select>
          <Input label="Scheduled At" type="datetime-local" value={form.scheduled_at} onChange={e=>setForm({...form, scheduled_at:e.target.value})} required />
          <Input label="Duration (min)" type="number" value={form.duration_minutes} onChange={e=>setForm({...form, duration_minutes:+e.target.value})} />
          <TextArea label="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
          <button type="submit" className="bg-ganga-sandstone text-white px-4 py-2 rounded-full">Add</button>
        </form>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Payments Tab (Table with export)
// ------------------------------------------------------------------------------
const PaymentsTab = () => {
  const { items, loading } = useRealtimeTable<Payment>('payments', 'created_at', false);
  const exportCSV = () => { const csv = "Date,User,Amount,Status\n" + items.map(p => `${p.created_at},${p.profiles?.full_name},${p.amount},${p.status}`).join("\n"); const blob = new Blob([csv], { type:'text/csv' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'payments.csv'; a.click(); };
  return (
    <div>
      <button onClick={exportCSV} className="mb-4 bg-ganga-sandstone text-white px-4 py-2 rounded-full">Export CSV</button>
      <div className="bg-white/70 dark:bg-dark-surface/70 rounded-2xl overflow-hidden"><table className="w-full"><thead className="bg-bg-tertiary"><tr><th className="p-3">Date</th><th className="p-3">User</th><th className="p-3">Amount</th><th className="p-3">Status</th></tr></thead><tbody>{items.map(p=><tr key={p.id} className="border-t"><td className="p-3">{new Date(p.created_at).toLocaleString()}</td><td className="p-3">{p.profiles?.full_name}</td><td className="p-3">₹{p.amount}</td><td className="p-3">{p.status}</td></tr>)}</tbody></table></div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Users Tab
// ------------------------------------------------------------------------------
const UsersTab = () => {
  const { items, refetch } = useRealtimeTable<Profile>('profiles', 'created_at', false);
  const toggleRole = async (id: string, current: string) => { await supabase.from('profiles').update({ role: current==='admin'?'client':'admin' }).eq('id', id); refetch(); };
  return (
    <div className="bg-white/70 dark:bg-dark-surface/70 rounded-2xl overflow-hidden"><table className="w-full"><thead className="bg-bg-tertiary"><tr><th className="p-3">Name</th><th className="p-3">Role</th><th className="p-3">Coins</th><th className="p-3">Actions</th></tr></thead><tbody>{items.map(u=><tr key={u.id} className="border-t"><td className="p-3">{u.full_name}</td><td className="p-3">{u.role}</td><td className="p-3">{u.coins}</td><td className="p-3"><button onClick={()=>toggleRole(u.id, u.role)} className="text-ganga-sandstone">{u.role==='admin'?'Revoke':'Make Admin'}</button></td></tr>)}</tbody></table></div>
  );
};

// ------------------------------------------------------------------------------
// Settings Tab
// ------------------------------------------------------------------------------
const SettingsTab = () => {
  const { items, refetch } = useRealtimeTable<SiteSetting>('site_settings', 'key');
  const [form, setForm] = useState({ key:'', value:'' });
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await supabase.from('site_settings').upsert(form, { onConflict:'key' }); setForm({ key:'', value:'' }); refetch(); };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="bg-white/70 dark:bg-dark-surface/70 p-6 rounded-2xl flex gap-4">
        <Input label="Key" value={form.key} onChange={e=>setForm({...form, key:e.target.value})} required />
        <Input label="Value" value={form.value} onChange={e=>setForm({...form, value:e.target.value})} required />
        <button type="submit" className="bg-ganga-sandstone text-white px-6 py-2 rounded-full">Save</button>
      </form>
      <div className="space-y-2">{items.map(s => <div key={s.key} className="bg-white/70 dark:bg-dark-surface/70 p-3 rounded flex justify-between"><span className="font-medium">{s.key}</span><span>{s.value}</span></div>)}</div>
    </div>
  );
};

// ------------------------------------------------------------------------------
// Main Admin Page
// ------------------------------------------------------------------------------
const tabs = ['Dashboard', 'Home', 'Free Tools', 'Services', 'Virtual Consult', 'Courses', 'Blogs', 'Testimonials', 'Bookings', 'Payments', 'Users', 'Settings'] as const;
type Tab = typeof tabs[number];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Dashboard');
  return (
    <div className="space-y-6 p-6">
      <h1 className="font-serif text-3xl text-nidra-indigo">Admin Dashboard</h1>
      <div className="flex flex-wrap gap-2 border-b border-prakash-gold/20 pb-2">
        {tabs.map(tab => <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm transition ${activeTab===tab?'bg-ganga-sandstone text-white':'text-nidra-indigo/70 hover:bg-bg-tertiary'}`}>{tab}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }} transition={{ duration:0.2 }}>
          {activeTab==='Dashboard' && <DashboardTab />}
          {activeTab==='Home' && <HomeTab />}
          {activeTab==='Free Tools' && <FreeToolsTab />}
          {activeTab==='Services' && <ServicesTab />}
          {activeTab==='Virtual Consult' && <VirtualConsultTab />}
          {activeTab==='Courses' && <CoursesTab />}
          {activeTab==='Blogs' && <BlogsTab />}
          {activeTab==='Testimonials' && <TestimonialsTab />}
          {activeTab==='Bookings' && <BookingsTab />}
          {activeTab==='Payments' && <PaymentsTab />}
          {activeTab==='Users' && <UsersTab />}
          {activeTab==='Settings' && <SettingsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
