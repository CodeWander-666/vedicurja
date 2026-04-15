'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';

const courses = [
  { id: 'vastu-beginner', title: 'Vastu Foundations', level: 'Beginner', duration: '4 weeks', modules: 2, description: 'Master the core principles of Vastu Shastra.', color: '#C88A5D', slug: 'vastu-beginner' },
  { id: 'vastu-advanced', title: 'Advanced Vastu', level: 'Advanced', duration: '8 weeks', modules: 3, description: 'Deep dive into commercial Vastu and remedies.', color: '#8B5A2B', slug: 'vastu-advanced' },
  { id: 'numerology-beginner', title: 'Numerology Basics', level: 'Beginner', duration: '3 weeks', modules: 2, description: 'Learn Pythagorean and Chaldean systems.', color: '#1985A1', slug: 'numerology-beginner' },
  { id: 'numerology-advanced', title: 'Master Numerology', level: 'Advanced', duration: '6 weeks', modules: 3, description: 'Master numbers, compatibility, and forecasting.', color: '#9A4C95', slug: 'numerology-advanced' },
];

export function CourseCards() {
  const { play } = useSound();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {courses.map((course, i) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#C88A5D]/20"
        >
          <div className="h-2" style={{ backgroundColor: course.color }} />
          <div className="p-5">
            <h3 className="font-serif text-xl text-[#1A2A3A]">{course.title}</h3>
            <p className="text-sm text-[#C88A5D]">{course.level} • {course.duration}</p>
            <p className="text-sm text-[#1A2A3A]/60 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs">{course.modules} modules</span>
              <Link href={`/courses/course?slug=${course.slug || '#'}` || '#'} onClick={() => play('clickPrimary')} className="bg-[#C88A5D] text-white px-4 py-2 rounded-full text-sm">Enroll</Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
export default CourseCards;
