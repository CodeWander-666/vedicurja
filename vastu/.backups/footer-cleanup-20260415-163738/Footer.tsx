'use client';
import Link from 'next/link';
import { useRealtimeContent } from '@/hooks/useRealtimeContent';
import { SiteSetting } from '@/types/admin';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Our Story', href: '/story' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  services: [
    { name: 'Residential Vastu', href: '/services/residential' },
    { name: 'Commercial Vastu', href: '/services/commercial' },
    { name: 'Industrial Vastu', href: '/services/industrial' },
    { name: 'Land Selection', href: '/services/land' },
    { name: 'Spiritual Spaces', href: '/services/spiritual' },
    { name: 'Geopathic Stress', href: '/services/geopathic' },
    { name: 'Find a Consultant', href: '/vastu-consultant' },
  ],
  learn: [
    { name: 'Learn Vastu', href: '/learn-vastu' },
    { name: 'Free AI Tools', href: '/free-tools' },
    { name: 'Insights', href: '/insights' },
    { name: 'Client Stories', href: '/client-stories' },
    { name: 'Library', href: '/library' },
  ],
  dashboard: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'My Account', href: '/dashboard/account' },
    { name: 'Billing', href: '/dashboard/billing' },
    { name: 'My Library', href: '/dashboard/library' },
    { name: 'Consultations', href: '/dashboard/consultations' },
    { name: 'Book a Session', href: '/bookings' },
  ],
};

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/vedicurja', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.247 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.247-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.247-2.242-1.31-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.247 3.608-1.31C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.74 0 8.332.014 7.052.072 5.376.13 3.934.427 2.684 1.677 1.434 2.927 1.137 4.37 1.08 6.045.02 7.325 0 7.733 0 12s.02 4.675.08 5.955c.057 1.675.354 3.118 1.604 4.368 1.25 1.25 2.693 1.547 4.368 1.604C7.325 23.98 7.733 24 12 24s4.675-.02 5.955-.08c1.675-.057 3.118-.354 4.368-1.604 1.25-1.25 1.547-2.693 1.604-4.368.06-1.28.08-1.688.08-5.955s-.02-4.675-.08-5.955c-.057-1.675-.354-3.118-1.604-4.368C20.073.427 18.63.13 16.955.08 15.675.02 15.267 0 12 0z"/><path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
  ) },
  { name: 'Facebook', href: 'https://facebook.com/vedicurja', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  ) },
  { name: 'YouTube', href: 'https://youtube.com/@vedicurja', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
  ) },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/vedicurja', icon: (props: any) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  ) },
];

export default function Footer() {
  const { items: settings } = useRealtimeContent<SiteSetting>('site_settings');
  const getSetting = (key: string) => settings.find(s => s.key === key)?.value || '';

  const aboutText = getSetting('footer_about') || 'VedicUrja – Ancient Wisdom. Modern Precision.';
  const address = getSetting('footer_address') || 'Uttar Pradesh, India';
  const phone = getSetting('footer_phone') || '+91 98765 43210';
  const email = getSetting('footer_email') || 'acharya@vedicurja.com';
  const copyright = getSetting('footer_copyright') || `© ${new Date().getFullYear()} VedicUrja. All rights reserved.`;

  return (
    <footer className="bg-nidra-indigo border-t border-prakash-gold/30 pt-16 pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-prakash-gold/20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl text-white hover:text-prakash-gold transition">
              VedicUrja<span className="text-prakash-gold">.</span>
            </Link>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">{aboutText}</p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full border border-prakash-gold/40 flex items-center justify-center text-prakash-gold hover:bg-prakash-gold hover:text-nidra-indigo transition">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-prakash-gold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-prakash-gold transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif text-prakash-gold text-sm uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-prakash-gold transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn & Dashboard */}
          <div>
            <h3 className="font-serif text-prakash-gold text-sm uppercase tracking-wider mb-4">Learn</h3>
            <ul className="space-y-2 mb-6">
              {navigation.learn.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-prakash-gold transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-serif text-prakash-gold text-sm uppercase tracking-wider mb-4">Client Area</h3>
            <ul className="space-y-2">
              {navigation.dashboard.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/70 hover:text-prakash-gold transition">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-serif text-prakash-gold text-sm uppercase tracking-wider mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${phone}`} className="hover:text-prakash-gold">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${email}`} className="hover:text-prakash-gold">{email}</a>
              </li>
            </ul>
            <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter-email"
                  placeholder="Your email"
                  className="min-w-0 flex-1 rounded-l-full px-4 py-2 text-sm bg-white/10 border border-prakash-gold/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-prakash-gold"
                />
                <button
                  type="submit"
                  className="rounded-r-full px-4 py-2 bg-prakash-gold text-nidra-indigo text-sm font-medium hover:bg-prakash-gold/90 transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-white/50">
          <p>{copyright}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-prakash-gold transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-prakash-gold transition">Terms & Conditions</Link>
            <Link href="/sitemap" className="hover:text-prakash-gold transition">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
export { Footer };
