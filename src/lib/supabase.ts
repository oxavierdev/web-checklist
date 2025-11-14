import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: 'admin' | 'mechanic' | 'receptionist';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: 'admin' | 'mechanic' | 'receptionist';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: 'admin' | 'mechanic' | 'receptionist';
          created_at?: string;
        };
      };
      vehicles: {
        Row: {
          id: string;
          plate: string;
          brand: string;
          model: string;
          year: number;
          color: string;
          customer_name: string;
          customer_phone: string;
          customer_email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          plate: string;
          brand: string;
          model: string;
          year: number;
          color: string;
          customer_name: string;
          customer_phone: string;
          customer_email?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          plate?: string;
          brand?: string;
          model?: string;
          year?: number;
          color?: string;
          customer_name?: string;
          customer_phone?: string;
          customer_email?: string;
          created_at?: string;
        };
      };
      service_orders: {
        Row: {
          id: string;
          vehicle_id: string;
          mechanic_id: string | null;
          status: 'pending' | 'in_progress' | 'waiting_approval' | 'approved' | 'completed' | 'cancelled';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          entry_date: string;
          estimated_completion: string | null;
          completion_date: string | null;
          total_estimate: number;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          mechanic_id?: string | null;
          status?: 'pending' | 'in_progress' | 'waiting_approval' | 'approved' | 'completed' | 'cancelled';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          entry_date?: string;
          estimated_completion?: string | null;
          completion_date?: string | null;
          total_estimate?: number;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          vehicle_id?: string;
          mechanic_id?: string | null;
          status?: 'pending' | 'in_progress' | 'waiting_approval' | 'approved' | 'completed' | 'cancelled';
          priority?: 'low' | 'medium' | 'high' | 'urgent';
          entry_date?: string;
          estimated_completion?: string | null;
          completion_date?: string | null;
          total_estimate?: number;
          notes?: string | null;
          created_at?: string;
        };
      };
      inspection_items: {
        Row: {
          id: string;
          service_order_id: string;
          category: string;
          item_name: string;
          status: 'ok' | 'attention' | 'critical';
          notes: string | null;
          photo_url: string | null;
          video_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          service_order_id: string;
          category: string;
          item_name: string;
          status: 'ok' | 'attention' | 'critical';
          notes?: string | null;
          photo_url?: string | null;
          video_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          service_order_id?: string;
          category?: string;
          item_name?: string;
          status?: 'ok' | 'attention' | 'critical';
          notes?: string | null;
          photo_url?: string | null;
          video_url?: string | null;
          created_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          service_order_id: string;
          description: string;
          estimated_cost: number;
          actual_cost: number | null;
          status: 'pending' | 'approved' | 'in_progress' | 'completed';
          created_at: string;
        };
        Insert: {
          id?: string;
          service_order_id: string;
          description: string;
          estimated_cost: number;
          actual_cost?: number | null;
          status?: 'pending' | 'approved' | 'in_progress' | 'completed';
          created_at?: string;
        };
        Update: {
          id?: string;
          service_order_id?: string;
          description?: string;
          estimated_cost?: number;
          actual_cost?: number | null;
          status?: 'pending' | 'approved' | 'in_progress' | 'completed';
          created_at?: string;
        };
      };
    };
  };
};
