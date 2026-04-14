'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { supabase } from '@/lib/supabaseClient';

function PostContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      const { data } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
      setPost(data);
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (!slug) return <div className="pt-32 text-center">No post specified.</div>;
  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!post) return <div className="pt-32 text-center">Post not found.</div>;

  return (
    <article className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      <h1 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-4">{post.title}</h1>
      <div className="flex items-center gap-4 text-sm text-[#1A2A3A]/60 mb-8">
        <span>{post.author_name}</span>
        <span>•</span>
        <span>{new Date(post.published_at).toLocaleDateString()}</span>
        <span>•</span>
        <span>{post.read_time} min read</span>
      </div>
      {post.featured_image && <img src={post.featured_image} alt={post.title} className="w-full h-80 object-cover rounded-2xl mb-8" />}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}

export default function PostPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="pt-32 text-center">Loading...</div>}>
        <PostContent />
      </Suspense>
      <Footer />
    </>
  );
}
