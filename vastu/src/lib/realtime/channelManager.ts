import { supabase } from '@/lib/supabaseClient';
import type { RealtimeChannel } from '@supabase/supabase-js';

type Callback = () => void;

interface ChannelEntry {
  channel: RealtimeChannel;
  callbacks: Set<Callback>;
  refCount: number;
}

const channels = new Map<string, ChannelEntry>();

export function subscribeToTable(table: string, callback: Callback): () => void {
  let entry = channels.get(table);

  if (!entry) {
    const channel = supabase
      .channel(`${table}-realtime`)
      .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
        const currentEntry = channels.get(table);
        if (currentEntry) currentEntry.callbacks.forEach(cb => cb());
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') console.log(`✅ Realtime: ${table}`);
      });

    entry = { channel, callbacks: new Set(), refCount: 0 };
    channels.set(table, entry);
  }

  entry.callbacks.add(callback);
  entry.refCount++;

  return () => {
    const currentEntry = channels.get(table);
    if (!currentEntry) return;
    currentEntry.callbacks.delete(callback);
    currentEntry.refCount--;
    if (currentEntry.refCount === 0 && currentEntry.callbacks.size === 0) {
      currentEntry.channel.unsubscribe().catch(console.warn);
      channels.delete(table);
    }
  };
}
