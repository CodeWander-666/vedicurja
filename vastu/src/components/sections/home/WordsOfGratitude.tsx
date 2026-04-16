'use client';
import { TestimonialsSlider } from './TestimonialsSlider';
export function WordsOfGratitude() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-4xl text-center text-nidra-indigo mb-4">Words of Gratitude</h2>
        <TestimonialsSlider />
      </div>
    </section>
  );
}
export default WordsOfGratitude;
