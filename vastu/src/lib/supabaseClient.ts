import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// 调试：输出连接状态（仅在开发环境）
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Supabase client initialized');
}
