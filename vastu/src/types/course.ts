export interface Chapter {
  id: string;
  title: string;
  video_url: string | null;
  notes: string | null;
  order_index: number;
  completed?: boolean;
  quiz?: Quiz | null;
}

export interface Module {
  id: string;
  title: string;
  order_index: number;
  chapters: Chapter[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  subject: string;
  price: number;
  thumbnail_url: string | null;
  is_published: boolean;
  modules?: Module[];
}

export interface UserProgress {
  chapter_id: string;
  completed: boolean;
}

export interface QuizScore {
  quizId: string;
  score: number;
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}
