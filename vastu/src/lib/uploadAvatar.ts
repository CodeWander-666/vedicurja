import { supabase } from './supabaseClient';
export async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const { error } = await supabase.storage.from('avatars').upload(fileName, file, { upsert: true });
  if (error) { console.error('Avatar upload error:', error); return null; }
  const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
  return data.publicUrl;
}
