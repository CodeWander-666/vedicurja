'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeContent<T>(table: string, orderBy: string = 'order_index', ascending: boolean = true) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from(table)
        .select('*')
        .eq('is_published', true)
        .order(orderBy, { ascending });
      setItems((data as T[]) || []);
      setLoading(false);
    };

    fetchData();

    const channel: RealtimeChannel = supabase
      .channel(`${table}-public`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, fetchData)
      .subscribe();

    return () => {
      channel.unsubscribe().catch(console.error);
    };
  }, [table, orderBy, ascending]);

  return { items, loading };
}
