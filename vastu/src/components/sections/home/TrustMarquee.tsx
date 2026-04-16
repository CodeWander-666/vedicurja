'use client';
export function TrustMarquee() {
  const brands = ['Mahindra', 'TCS', 'Adani', 'Times of India', 'P&G', 'Reliance'];
  return (
    <section className="py-12 sm:py-16 bg-white/40 backdrop-blur-sm border-y border-prakash-gold/20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-center font-serif text-2xl sm:text-3xl text-nidra-indigo mb-8">Trusted by Global Publications</h2>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
          {brands.map(brand => (
            <span key={brand} className="font-serif text-xl sm:text-2xl text-nidra-indigo/40 hover:text-prakash-gold transition-colors">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TrustMarquee;
