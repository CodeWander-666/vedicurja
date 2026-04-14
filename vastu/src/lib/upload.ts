import { supabase } from './supabaseClient';

export async function uploadImage(file: File, bucket: string): Promise<string | null> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) { console.error('Upload error:', error); return null; }
  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicUrl;
}

export async function uploadVideo(file: File): Promise<string | null> {
  return uploadImage(file, 'course-videos');
}
