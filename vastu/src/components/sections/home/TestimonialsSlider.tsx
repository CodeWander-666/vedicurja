'use client';
import { useSound } from '@/hooks/useSound';
import './TestimonialsSlider.css';

const testimonials = [
  {
    quote: "Acharya's guidance transformed our home. We've never felt such peace.",
    author: 'Priya Malhotra',
    location: 'London, UK',
    gradient: 'linear-gradient(135deg, #C88A5D 0%, #E8B960 100%)',
  },
  {
    quote: "The commercial Vastu analysis was spot on. Revenue up 40% in months.",
    author: 'James Whitmore',
    location: 'New York, USA',
    gradient: 'linear-gradient(135deg, #1A2A3A 0%, #2D6A4F 100%)',
  },
  {
    quote: "My health improved dramatically after implementing the remedies.",
    author: 'Ananya Sharma',
    location: 'Dubai, UAE',
    gradient: 'linear-gradient(135deg, #457B9D 0%, #C88A5D 100%)',
  },
  {
    quote: "Unparalleled depth of knowledge. Practical and transformative.",
    author: 'Michael Chen',
    location: 'Singapore',
    gradient: 'linear-gradient(135deg, #2D6A4F 0%, #E8B960 100%)',
  },
  {
    quote: "Finally feel at peace in my own home. Forever grateful.",
    author: 'Elena Rossi',
    location: 'Milan, Italy',
    gradient: 'linear-gradient(135deg, #C88A5D 0%, #1A2A3A 100%)',
  },
  {
    quote: "The land selection advice saved us from a disastrous purchase.",
    author: 'David Miller',
    location: 'Sydney, Australia',
    gradient: 'linear-gradient(135deg, #E8B960 0%, #457B9D 100%)',
  },
  {
    quote: "A true master of the ancient science. Highly recommended.",
    author: 'Sophia Rodriguez',
    location: 'Madrid, Spain',
    gradient: 'linear-gradient(135deg, #1A2A3A 0%, #C88A5D 100%)',
  },
  {
    quote: "Our entire office feels more productive and harmonious.",
    author: 'Kenji Tanaka',
    location: 'Tokyo, Japan',
    gradient: 'linear-gradient(135deg, #2D6A4F 0%, #1A2A3A 100%)',
  },
  {
    quote: "The Vastu scan was incredibly detailed and accurate.",
    author: 'Olivia Brown',
    location: 'Toronto, Canada',
    gradient: 'linear-gradient(135deg, #457B9D 0%, #2D6A4F 100%)',
  },
];

export function TestimonialsSlider() {
  const { play } = useSound();

  return (
    <section className="py-24 bg-gradient-to-b from-[#F9F6F0] to-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-4">
            Words of Gratitude
          </h2>
          <p className="font-sans text-lg text-[#1A2A3A]/60 max-w-2xl mx-auto">
            Hear from those who have experienced the transformation
          </p>
        </div>
      </div>

      <div 
        className="slider"
        style={{
          '--width': '280px',
          '--height': '220px',
          '--quantity': testimonials.length.toString(),
        } as React.CSSProperties}
      >
        <div className="list">
          {testimonials.map((item, index) => (
            <div 
              key={index} 
              className="item" 
              style={{ '--position': index + 1 } as React.CSSProperties}
              onMouseEnter={() => play('hoverCard')}
            >
              <div 
                className="testimonial-slider-card"
                style={{ background: item.gradient }}
              >
                <div className="card-inner">
                  <div className="quote-mark">"</div>
                  <p className="testimonial-quote">{item.quote}</p>
                  <div className="testimonial-author">
                    <span className="author-name">{item.author}</span>
                    <span className="author-location">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TestimonialsSlider;
