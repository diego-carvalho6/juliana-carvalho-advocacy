export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          content: string
          author_id: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          author_id: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          author_id?: string
          created_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          case_number: string
          client_name: string
          status: string
          description: string | null
          date: string
          user_id: string
        }
        Insert: {
          id?: string
          case_number: string
          client_name: string
          status: string
          description?: string | null
          date: string
          user_id: string
        }
        Update: {
          id?: string
          case_number?: string
          client_name?: string
          status?: string
          description?: string | null
          date?: string
          user_id?: string
        }
      }
    }
  }
}
