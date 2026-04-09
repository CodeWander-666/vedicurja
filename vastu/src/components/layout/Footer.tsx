export function Footer() {
  return (
    <footer className="bg-[#1A2A3A] text-white/70 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div><h4 className="font-serif text-white text-xl mb-4">Vastu Vidya</h4><p className="text-sm">Rooted in the sacred geometry of Uttar Pradesh.</p></div>
          <div><h5 className="font-sans text-white mb-3">Global Reach</h5><ul className="space-y-2 text-sm"><li>New York</li><li>London</li><li>Dubai</li></ul></div>
          <div><h5 className="font-sans text-white mb-3">Resources</h5><ul className="space-y-2 text-sm"><li>Free Kundali</li><li>Vastu Blog</li><li>Library</li></ul></div>
          <div><h5 className="font-sans text-white mb-3">Contact</h5><p className="text-sm">Uttar Pradesh, India</p><p className="text-sm mt-2">consult@vastu.com</p></div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm">© 2026 Acharya [Name]. All rights reserved.</div>
      </div>
    </footer>
  );
}
