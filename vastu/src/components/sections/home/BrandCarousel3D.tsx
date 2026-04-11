'use client';
import { useRef } from 'react';
import './BrandCarousel3D.css';

const brands = [
  { name: 'TCS', logo: 'TATA CONSULTANCY SERVICES', class: 'brand-tcs' },
  { name: 'Mahindra', logo: 'MAHINDRA', class: 'brand-mahindra' },
  { name: 'PRLog', logo: 'PRLog', class: 'brand-prlog' },
  { name: 'openPR', logo: 'openPR', class: 'brand-openpr' },
  { name: '24-7PressRelease', logo: '24-7 Press Release', class: 'brand-247pr' },
  { name: '1888PressRelease', logo: '1888 Press Release', class: 'brand-1888pr' },
  { name: 'Adani', logo: 'ADANI', class: 'brand-adani' },
];

export function BrandCarousel3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-16 bg-white/40 backdrop-blur-sm border-y border-[#C88A5D]/10">
      <div className="container mx-auto px-6">
        <h2 className="text-center font-serif text-3xl md:text-4xl text-[#1A2A3A] mb-8 brand-title">
          Trusted by Global Publications
        </h2>
        
        <div className="carousel-3d-container" ref={containerRef}>
          <div className="carousel-3d-track">
            {/* 渲染两遍以实现无缝循环 */}
            {[...brands, ...brands].map((brand, i) => (
              <div 
                key={i} 
                className={`carousel-3d-card ${brand.class}`}
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="card-content">
                  <span className="brand-name">{brand.logo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default BrandCarousel3D;
