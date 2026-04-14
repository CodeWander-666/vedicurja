export function Footer() {
  return (
    <footer className="bg-vastu-stone border-t border-prakash-gold/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xl text-nidra-indigo mb-4">VedicUrja</h4>
            <p className="text-nidra-indigo/70 text-sm">Ancient Wisdom, Modern Precision.</p>
          </div>
          <div>
            <h5 className="font-medium mb-3">Quick Links</h5>
            <ul className="space-y-2 text-sm text-nidra-indigo/70">
              <li><a href="/services">Services</a></li>
              <li><a href="/free-tools">Free Tools</a></li>
              <li><a href="/insights">Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-3">Contact</h5>
            <ul className="space-y-2 text-sm text-nidra-indigo/70">
              <li>acharya@vedicurja.com</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-3">Follow</h5>
            <div className="flex gap-4">
              <a href="#" className="text-2xl">📘</a>
              <a href="#" className="text-2xl">📷</a>
              <a href="#" className="text-2xl">🐦</a>
            </div>
          </div>
        </div>
        <div className="border-t border-prakash-gold/20 mt-8 pt-6 text-center text-sm text-nidra-indigo/50">
          © 2026 VedicUrja. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
