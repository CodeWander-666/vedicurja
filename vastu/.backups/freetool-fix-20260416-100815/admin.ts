export interface HomeSection { id: string; section_key: string; title: string; subtitle: string; description: string; image_url: string | null; button_text: string; button_link: string; order_index: number; is_published: boolean; }
export interface FreeTool { id: string; tool_key: string; title: string; tagline: string; description: string; features: string[]; image_url: string | null; color: string; order_index: number; is_published: boolean; }
  icon?: string;
  color?: string;
export interface Service { id: string; title: string; slug: string; tagline: string; description: string; benefits: string[]; use_case: string; image_url: string | null; order_index: number; is_published: boolean; }
export interface Course { id: string; title: string; slug: string; description: string; level: string; subject: string; price: number; thumbnail_url: string | null; is_published: boolean; }
export interface BlogPost {
  author_name?: string | null; id: string; title: string; slug: string; excerpt: string; content: string; featured_image: string | null; category: string; read_time: number; is_published: boolean; published_at: string; }
export interface Testimonial { id: string; client_name: string; location: string; project_type: string; rating: number; content: string; avatar_url: string | null; verified: boolean; order_index: number; is_published: boolean; }
export interface Consultation { meeting_url?: string | null; recording_url?: string | null; payment_status?: string; id: string; client_id: string; scheduled_at: string; duration_minutes: number; status: string; notes: string; }
export interface Payment { id: string; user_id: string; amount: number; status: string; created_at: string; }
export interface Profile {
  id: string; full_name: string; role: string; coins: number; created_at: string; }
export interface SiteSetting { key: string; value: string; }

export interface Quiz {
  id: string;
  chapter_id: string;
  questions: QuizQuestion[];
}
export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}
export interface UserQuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  answers: number[];
  created_at: string;
}
