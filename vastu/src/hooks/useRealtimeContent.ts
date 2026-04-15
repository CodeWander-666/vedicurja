'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

export function useRealtimeContent<T>(
  table: string,
  orderBy: string = 'created_at',
  ascending: boolean = false
) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(orderBy, { ascending });
      if (error) throw error;
      if (isMountedRef.current) {
        setItems((data as T[]) || []);
      }
    } catch (err) {
      console.error(`Error fetching ${table}:`, err);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [table, orderBy, ascending]);

  useEffect(() => {
    isMountedRef.current = true;
    let channel: RealtimeChannel | null = null;
    
    const init = async () => {
      await fetchData();
      
      if (supabase && !channel) {
        // Create channel only once per component instance
        channel = supabase
          .channel(`${table}-realtime-${Date.now()}`) // unique name to avoid conflicts
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table },
            () => {
              if (isMountedRef.current) {
                fetchData();
              }
            }
          )
          .subscribe((status) => {
            if (status === 'SUBSCRIBED') {
              console.log(`✅ Realtime subscribed to ${table}`);
            }
          });
        channelRef.current = channel;
      }
    };

    init();

    return () => {
      isMountedRef.current = false;
      if (channelRef.current) {
        channelRef.current.unsubscribe().catch(console.warn);
        channelRef.current = null;
      }
    };
  }, [table, orderBy, ascending, fetchData]);

  return { items, loading };
}
