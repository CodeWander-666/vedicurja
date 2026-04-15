'use client';
import { motion } from 'framer-motion';
import { Course } from '@/types/course';

interface Props {
  course: Course;
  progress: number;
  onClick: () => void;
}

export default function EnrolledCourseCard({ course, progress, onClick }: Props) {
  return (
    <motion.div
      whileHover={{ y: -8, rotateY: 3 }}
      style={{ transformStyle: 'preserve-3d' }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-prakash-gold/30 shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-2" style={{ backgroundColor: course.subject === 'Vastu' ? '#C88A5D' : '#1985A1' }} />
      <div className="p-6">
        <h3 className="font-serif text-xl text-nidra-indigo mb-1">{course.title}</h3>
        <p className="text-sm text-nidra-indigo/60 mb-4">{course.level} • {course.subject}</p>
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-prakash-gold to-sacred-saffron"
          />
        </div>
        <p className="text-right text-xs text-nidra-indigo/60 mt-1">{progress}% Complete</p>
      </div>
    </motion.div>
  );
}
