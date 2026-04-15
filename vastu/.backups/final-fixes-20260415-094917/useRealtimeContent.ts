'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeContent<T>(
  table: string,
  orderBy: string = 'created_at',
  ascending: boolean = false
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });
      if (!error && isMounted) {
        setItems((data as T[]) || []);
        setLoading(false);
      }
    };

    fetchData();

    if (supabase) {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
      }

      const channel = supabase
        .channel(`${table}-realtime`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table },
          () => {
            fetchData();
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log(`Subscribed to ${table} changes`);
          }
        });

      channelRef.current = channel;
    }

    return () => {
      isMounted = false;
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current = null;
      }
    };
  }, [table, orderBy, ascending]);

  return { items, loading };
}
