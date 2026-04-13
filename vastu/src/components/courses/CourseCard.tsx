'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSound } from '@/hooks/useSound';
import { Course } from '@/types/course';

interface CourseCardProps {
  course: Course;
  index: number;
}

export function CourseCard({ course, index }: CourseCardProps) {
  const { play } = useSound();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#C88A5D]/10 hover:border-[#C88A5D]/30 transition-all shadow-md hover:shadow-xl"
    >
      <Link href={`/courses/course?slug=${course.slug}`} onClick={() => play('clickPrimary')} className="block">
        <div className="h-2" style={{ backgroundColor: index === 0 ? '#C88A5D' : index === 1 ? '#8B5A2B' : index === 2 ? '#1985A1' : '#9A4C95' }} />
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#C88A5D] uppercase tracking-wider">{course.level}</span>
            <span className="text-xs text-[#1A2A3A]/50">{course.subject}</span>
          </div>
          <h3 className="font-serif text-2xl text-[#1A2A3A] mb-3 group-hover:text-[#C88A5D] transition-colors">
            {course.title}
          </h3>
          <p className="font-sans text-sm text-[#1A2A3A]/60 mb-6 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-serif text-[#1A2A3A]">
              {course.price === 0 ? 'Free' : `₹${course.price}`}
            </span>
            <span className="inline-flex items-center text-[#C88A5D] text-sm font-medium group-hover:translate-x-1 transition-transform">
              Enroll Now <span className="ml-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
export default CourseCard;
