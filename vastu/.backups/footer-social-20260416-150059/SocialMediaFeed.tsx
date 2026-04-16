'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const platforms = [
  { name: 'Instagram', icon: '📷', handle: '@vedicurja', color: 'from-pink-500 to-purple-500', href: 'https://instagram.com/vedicurja' },
  { name: 'Facebook', icon: '📘', handle: 'VedicUrja', color: 'from-blue-600 to-blue-800', href: 'https://facebook.com/vedicurja' },
  { name: 'YouTube', icon: '▶️', handle: '@vedicurja', color: 'from-red-500 to-red-700', href: 'https://youtube.com/@vedicurja' },
  { name: 'LinkedIn', icon: '💼', handle: 'VedicUrja', color: 'from-blue-500 to-blue-700', href: 'https://linkedin.com/company/vedicurja' },
];

const recentPosts = [
  { platform: 'Instagram', content: '✨ Transform your space with these simple Vastu tips! Swipe to see before & after. #VastuShastra #VedicUrja', likes: 234, image: '/images/social/post1.jpg' },
  { platform: 'YouTube', content: '🎥 New Video: How to Choose an Auspicious Plot – Acharya KK Nagaich ji explains the ancient parameters.', views: '1.2K', thumbnail: '/images/social/post2.jpg' },
  { platform: 'Facebook', content: '🙏 Gratitude to our 500+ clients worldwide. Your trust inspires us every day.', likes: 456, image: '/images/social/post3.jpg' },
  { platform: 'Instagram', content: '🔮 Free AI Kundali – discover your cosmic blueprint in minutes. Link in bio!', likes: 189, image: '/images/social/post4.jpg' },
];

export function SocialMediaFeed() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-vastu-parchment">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-nidra-indigo mb-4">Connect With Us</h2>
          <p className="text-nidra-indigo/60 max-w-2xl mx-auto">Follow VedicUrja on social media for daily wisdom, tips, and community stories.</p>
        </div>

        {/* Platform Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {platforms.map((p) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className={`flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br ${p.color} text-white shadow-lg hover:shadow-xl transition`}
            >
              <span className="text-3xl mb-2">{p.icon}</span>
              <span className="font-medium">{p.name}</span>
              <span className="text-xs opacity-80">{p.handle}</span>
            </motion.a>
          ))}
        </div>

        {/* Recent Posts Grid */}
        <h3 className="font-serif text-2xl text-center text-nidra-indigo mb-8">Latest from Our Feed</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {recentPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-md border border-prakash-gold/20 overflow-hidden"
            >
              <div className="h-32 bg-gradient-to-br from-prakash-gold/20 to-sacred-saffron/20 flex items-center justify-center text-4xl">
                {post.platform === 'Instagram' ? '📷' : post.platform === 'YouTube' ? '▶️' : '📘'}
              </div>
              <div className="p-4">
                <p className="text-sm text-nidra-indigo/80 line-clamp-3 mb-3">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-nidra-indigo/50">
                  <span>{post.platform}</span>
                  <span>{post.likes ? `❤️ ${post.likes}` : post.views ? `👁️ ${post.views}` : ''}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/contact" className="text-prakash-gold font-medium hover:underline">Follow us for daily inspiration →</Link>
        </div>
      </div>
    </section>
  );
}
export default SocialMediaFeed;
