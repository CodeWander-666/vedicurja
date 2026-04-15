'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Course } from '@/types/course';

interface Props {
  course: Course;
  onEnroll: () => void;
}

export default function CourseCard3D({ course, onEnroll }: Props) {
  const isFree = course.price === 0;
  
  return (
    <motion.div
      whileHover={{ y: -10, rotateY: 5 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-prakash-gold/30 shadow-lg w-full max-w-sm"
    >
      <div className="h-2" style={{ backgroundColor: course.subject === 'Vastu' ? '#C88A5D' : '#1985A1' }} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-prakash-gold uppercase">{course.level}</span>
          <span className="text-xs text-nidra-indigo/50">{course.subject}</span>
        </div>
        <h3 className="font-serif text-2xl text-nidra-indigo mb-3">{course.title}</h3>
        <p className="text-sm text-nidra-indigo/60 mb-6 line-clamp-2">{course.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-serif text-nidra-indigo">{isFree ? 'Free' : `₹${course.price}`}</span>
          <button
            onClick={onEnroll}
            className="bg-gradient-to-r from-prakash-gold to-sacred-saffron text-white px-6 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition"
          >
            {isFree ? 'Start Learning' : 'Enroll Now'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
