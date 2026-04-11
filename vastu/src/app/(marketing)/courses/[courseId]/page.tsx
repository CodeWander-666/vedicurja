import { notFound } from 'next/navigation';
import CourseDashboard from '@/components/courses/CourseDashboard';

const courses = {
  'vastu-beginner': { id: 'vastu-beginner', title: 'Vastu Foundations', level: 'Beginner', modules: 2 },
  'vastu-advanced': { id: 'vastu-advanced', title: 'Advanced Vastu', level: 'Advanced', modules: 3 },
  'numerology-beginner': { id: 'numerology-beginner', title: 'Numerology Basics', level: 'Beginner', modules: 2 },
  'numerology-advanced': { id: 'numerology-advanced', title: 'Master Numerology', level: 'Advanced', modules: 3 },
};

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const course = courses[courseId as keyof typeof courses];
  if (!course) notFound();
  return <CourseDashboard course={course} />;
}

export async function generateStaticParams() {
  return Object.keys(courses).map((courseId) => ({ courseId }));
}
