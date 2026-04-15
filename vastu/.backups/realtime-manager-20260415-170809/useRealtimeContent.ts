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
  const isSubscribedRef = useRef(false);

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
    
    const init = async () => {
      await fetchData();
      
      // Only create channel if we have a client and haven't subscribed yet
      if (supabase && !isSubscribedRef.current) {
        // Mark as subscribed immediately to prevent race conditions
        isSubscribedRef.current = true;
        
        const channel = supabase
          .channel(`${table}-realtime`)
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table },
            () => {
              if (isMounted) {
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
      isMounted = false;
      // Clean up subscription on unmount
      if (channelRef.current) {
        channelRef.current.unsubscribe().catch(console.warn);
        channelRef.current = null;
        isSubscribedRef.current = false;
      }
    };
  }, [table]); // Only re-run when table name changes

  return { items, loading };
}
