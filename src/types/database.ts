export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          email: string | null;
          default_currency: string;
          locale: string | null;
          onboarding_completed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          email?: string | null;
          default_currency?: string;
          locale?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          email?: string | null;
          default_currency?: string;
          locale?: string | null;
          onboarding_completed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      // Placeholders for the rest of the tables to be populated via Supabase CLI in the future
      friendships: { Row: any; Insert: any; Update: any };
      groups: { Row: any; Insert: any; Update: any };
      group_members: { Row: any; Insert: any; Update: any };
      expenses: { Row: any; Insert: any; Update: any };
      expense_splits: { Row: any; Insert: any; Update: any };
      settlements: { Row: any; Insert: any; Update: any };
      activity: { Row: any; Insert: any; Update: any };
      comments: { Row: any; Insert: any; Update: any };
      notifications: { Row: any; Insert: any; Update: any };
      recurring_expenses: { Row: any; Insert: any; Update: any };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
