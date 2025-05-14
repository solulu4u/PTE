import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types based on database schema
export type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  last_login: string | null;
  user_role: 'student' | 'teacher' | 'admin';
  subscription_status: 'free' | 'basic' | 'premium';
  subscription_end_date: string | null;
};

export type Skill = {
  id: number;
  name: string;
  description: string | null;
};

export type QuestionType = {
  id: number;
  skill_id: number;
  name: string;
  description: string | null;
  instructions: string | null;
  scoring_criteria: string | null;
  time_limit: number | null;
};

export type Question = {
  id: number;
  question_type_id: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  title: string | null;
  content: string | null;
  audio_url: string | null;
  image_url: string | null;
  created_at: string;
  is_ai_generated: boolean;
  ai_model: string | null;
  ai_prompt: string | null;
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  tags: string | null;
};

export type Answer = {
  id: number;
  question_id: number;
  content: string | null;
  is_correct: boolean;
  explanation: string | null;
};

export type PracticeSet = {
  id: number;
  title: string;
  description: string | null;
  skill_id: number | null;
  difficulty_level: 'easy' | 'medium' | 'hard' | 'mixed';
  estimated_time: number | null;
  created_at: string;
  is_featured: boolean;
  is_ai_generated: boolean;
};

export type MockTest = {
  id: number;
  title: string;
  description: string | null;
  duration: number | null;
  created_at: string;
  is_featured: boolean;
  difficulty_level: 'easy' | 'medium' | 'hard';
  is_ai_generated: boolean;
};

export type UserResponse = {
  id: number;
  user_id: number;
  question_id: number;
  practice_set_id: number | null;
  mock_test_id: number | null;
  response_text: string | null;
  response_audio_url: string | null;
  score: number | null;
  feedback: string | null;
  ai_evaluation_details: string | null;
  created_at: string;
  time_spent: number | null;
};

export type UserProgress = {
  id: number;
  user_id: number;
  skill_id: number | null;
  question_type_id: number | null;
  completed_exercises: number;
  avg_score: number;
  last_activity_date: string | null;
  strength_level: 'weak' | 'developing' | 'proficient' | 'strong';
};