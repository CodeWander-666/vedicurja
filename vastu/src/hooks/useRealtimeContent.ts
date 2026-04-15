'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { subscribeToTable } from '@/lib/realtime/channelManager';

export function useRealtimeContent<T>(
  table: string,
  orderBy: string = 'created_at',
  ascending: boolean = false
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });
      if (error) throw error;
      setItems((data as T[]) || []);
    } catch (err) {
      console.error(`Error fetching ${table}:`, err);
    } finally {
      setLoading(false);
    }
  }, [table, orderBy, ascending]);

  useEffect(() => {
    let isMounted = true;
    const wrappedFetch = async () => { if (isMounted) await fetchData(); };
    wrappedFetch();
    const unsubscribe = subscribeToTable(table, () => { if (isMounted) fetchData(); });
    return () => { isMounted = false; unsubscribe(); };
  }, [table, fetchData]);

  return { items, loading };
}
