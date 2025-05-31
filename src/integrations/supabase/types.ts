export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ads: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link_url: string | null
          position: string
          size: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          position: string
          size: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          position?: string
          size?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blogs: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published_at: string
          read_time: string | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string
          read_time?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string
          read_time?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brokers: {
        Row: {
          account_opening_fee: string | null
          annual_charges: string | null
          brokerage_rate: string | null
          cons: string[] | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          logo_url: string | null
          name: string
          pros: string[] | null
          ratings: number | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          account_opening_fee?: string | null
          annual_charges?: string | null
          brokerage_rate?: string | null
          cons?: string[] | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          logo_url?: string | null
          name: string
          pros?: string[] | null
          ratings?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          account_opening_fee?: string | null
          annual_charges?: string | null
          brokerage_rate?: string | null
          cons?: string[] | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          logo_url?: string | null
          name?: string
          pros?: string[] | null
          ratings?: number | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          category: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      ipo_performance: {
        Row: {
          created_at: string
          current_price: number | null
          id: string
          ipo_name: string
          issue_date: string
          issue_price: number
          listing_gains: number | null
          listing_price: number | null
          profit_loss: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_price?: number | null
          id?: string
          ipo_name: string
          issue_date: string
          issue_price: number
          listing_gains?: number | null
          listing_price?: number | null
          profit_loss?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_price?: number | null
          id?: string
          ipo_name?: string
          issue_date?: string
          issue_price?: number
          listing_gains?: number | null
          listing_price?: number | null
          profit_loss?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      ipos: {
        Row: {
          category: string | null
          change_percentage: string | null
          close_date: string | null
          company_description: string | null
          created_at: string
          current_price: string | null
          financial_highlights: string | null
          gmp: string | null
          id: string
          issue_size: string | null
          listing_date: string | null
          listing_price: string | null
          lot_size: number | null
          min_investment: string | null
          name: string
          open_date: string | null
          price_range: string | null
          profit_per_lot: string | null
          shareholding_pattern: Json | null
          status: string
          subscription_details: Json | null
          subscription_rate: string | null
          type: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          change_percentage?: string | null
          close_date?: string | null
          company_description?: string | null
          created_at?: string
          current_price?: string | null
          financial_highlights?: string | null
          gmp?: string | null
          id?: string
          issue_size?: string | null
          listing_date?: string | null
          listing_price?: string | null
          lot_size?: number | null
          min_investment?: string | null
          name: string
          open_date?: string | null
          price_range?: string | null
          profit_per_lot?: string | null
          shareholding_pattern?: Json | null
          status: string
          subscription_details?: Json | null
          subscription_rate?: string | null
          type: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          change_percentage?: string | null
          close_date?: string | null
          company_description?: string | null
          created_at?: string
          current_price?: string | null
          financial_highlights?: string | null
          gmp?: string | null
          id?: string
          issue_size?: string | null
          listing_date?: string | null
          listing_price?: string | null
          lot_size?: number | null
          min_investment?: string | null
          name?: string
          open_date?: string | null
          price_range?: string | null
          profit_per_lot?: string | null
          shareholding_pattern?: Json | null
          status?: string
          subscription_details?: Json | null
          subscription_rate?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      join_us_requests: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          message: string | null
          mobile: string
          name: string
          pan_card: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id?: string
          message?: string | null
          mobile: string
          name: string
          pan_card?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          mobile?: string
          name?: string
          pan_card?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published_at: string
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          mobile: string | null
          name: string
          pan_card: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id: string
          mobile?: string | null
          name: string
          pan_card?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          mobile?: string | null
          name?: string
          pan_card?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      slider_content: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          order_index: number | null
          text: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          text: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          order_index?: number | null
          text?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          ipo_name: string | null
          name: string
          profit_amount: string | null
          story: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          ipo_name?: string | null
          name: string
          profit_amount?: string | null
          story: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          ipo_name?: string | null
          name?: string
          profit_amount?: string | null
          story?: string
        }
        Relationships: []
      }
      user_ipo_applications: {
        Row: {
          applied_at: string
          id: string
          ipo_id: string
          user_id: string
        }
        Insert: {
          applied_at?: string
          id?: string
          ipo_id: string
          user_id: string
        }
        Update: {
          applied_at?: string
          id?: string
          ipo_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_ipo_applications_ipo_id_fkey"
            columns: ["ipo_id"]
            isOneToOne: false
            referencedRelation: "ipos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
