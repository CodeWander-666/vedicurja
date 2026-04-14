'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeContent<T>(
  table: string,
  orderBy: string = 'created_at',
  ascending: boolean = false
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const fetch = async () => {
      const { data } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });
      setItems((data as T[]) || []);
      setLoading(false);
    };
    fetch();

    const channel: RealtimeChannel = supabase
      .channel(`${table}-realtime`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, fetch)
      .subscribe();

    return () => {
      channel.unsubscribe().catch(console.error);
    };
  }, [table, orderBy, ascending]);

  return { items, loading };
}
