'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';

const courses = [
  { id: 'vastu-beginner', title: 'Vastu Foundations', level: 'Beginner', subject: 'Vastu', duration: '4 weeks', modules: 2, description: 'Master the core principles of Vastu Shastra.', color: '#C88A5D' },
  { id: 'vastu-advanced', title: 'Advanced Vastu', level: 'Advanced', subject: 'Vastu', duration: '8 weeks', modules: 3, description: 'Deep dive into commercial Vastu and remedies.', color: '#8B5A2B' },
  { id: 'numerology-beginner', title: 'Numerology Basics', level: 'Beginner', subject: 'Numerology', duration: '3 weeks', modules: 2, description: 'Learn Pythagorean and Chaldean systems.', color: '#1985A1' },
  { id: 'numerology-advanced', title: 'Master Numerology', level: 'Advanced', subject: 'Numerology', duration: '6 weeks', modules: 3, description: 'Master numbers, compatibility, and forecasting.', color: '#9A4C95' },
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
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#C88A5D]/20 hover:shadow-xl transition-all group"
        >
          <div className="h-2" style={{ backgroundColor: course.color }} />
          <div className="p-5">
            <h3 className="font-serif text-xl text-[#1A2A3A] mb-1">{course.title}</h3>
            <p className="text-sm text-[#C88A5D] mb-2">{course.level} • {course.duration}</p>
            <p className="text-sm text-[#1A2A3A]/60 mb-4">{course.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#1A2A3A]/50">{course.modules} modules</span>
              <Link
                href={`/courses/${course.id}`}
                onClick={() => play('clickPrimary')}
                className="bg-[#C88A5D] hover:bg-[#A06A3D] text-white px-4 py-2 rounded-full text-sm font-medium transition-all"
              >
                Enroll
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
export default CourseCards;
