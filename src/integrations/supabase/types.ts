export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
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
      bonds: {
        Row: {
          bond_type: string | null
          created_at: string
          credit_rating: string | null
          id: string
          interest_rate: string | null
          issuer: string | null
          maturity_date: string | null
          minimum_investment: string | null
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          bond_type?: string | null
          created_at?: string
          credit_rating?: string | null
          id?: string
          interest_rate?: string | null
          issuer?: string | null
          maturity_date?: string | null
          minimum_investment?: string | null
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          bond_type?: string | null
          created_at?: string
          credit_rating?: string | null
          id?: string
          interest_rate?: string | null
          issuer?: string | null
          maturity_date?: string | null
          minimum_investment?: string | null
          name?: string
          status?: string | null
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
      chatbot_conversations: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          intent: string | null
          message: string
          response: string
          session_id: string
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          intent?: string | null
          message: string
          response: string
          session_id: string
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          intent?: string | null
          message?: string
          response?: string
          session_id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      chatbot_flows: {
        Row: {
          created_at: string
          flow_data: Json
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          version: number | null
        }
        Insert: {
          created_at?: string
          flow_data: Json
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          version?: number | null
        }
        Update: {
          created_at?: string
          flow_data?: Json
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          version?: number | null
        }
        Relationships: []
      }
      chatbot_responses: {
        Row: {
          category: string | null
          created_at: string
          id: string
          is_active: boolean | null
          response_message: string
          trigger_keywords: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          response_message: string
          trigger_keywords: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          response_message?: string
          trigger_keywords?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          area: string | null
          brokers_available: string[] | null
          business_environment: string | null
          cost_of_living: string | null
          country: string
          created_at: string
          description: string | null
          economic_overview: string | null
          id: string
          image_url: string | null
          investment_opportunities: string | null
          is_active: boolean | null
          local_investment_tips: string | null
          major_companies: string | null
          name: string
          population: string | null
          state: string
          stock_exchanges: string | null
          updated_at: string
        }
        Insert: {
          area?: string | null
          brokers_available?: string[] | null
          business_environment?: string | null
          cost_of_living?: string | null
          country?: string
          created_at?: string
          description?: string | null
          economic_overview?: string | null
          id?: string
          image_url?: string | null
          investment_opportunities?: string | null
          is_active?: boolean | null
          local_investment_tips?: string | null
          major_companies?: string | null
          name: string
          population?: string | null
          state: string
          stock_exchanges?: string | null
          updated_at?: string
        }
        Update: {
          area?: string | null
          brokers_available?: string[] | null
          business_environment?: string | null
          cost_of_living?: string | null
          country?: string
          created_at?: string
          description?: string | null
          economic_overview?: string | null
          id?: string
          image_url?: string | null
          investment_opportunities?: string | null
          is_active?: boolean | null
          local_investment_tips?: string | null
          major_companies?: string | null
          name?: string
          population?: string | null
          state?: string
          stock_exchanges?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content_pages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_published: boolean | null
          meta_description: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      country_codes: {
        Row: {
          country_code: string
          country_name: string
          id: string
          is_active: boolean | null
          phone_code: string
          phone_format: string | null
          phone_length: number
        }
        Insert: {
          country_code: string
          country_name: string
          id?: string
          is_active?: boolean | null
          phone_code: string
          phone_format?: string | null
          phone_length: number
        }
        Update: {
          country_code?: string
          country_name?: string
          id?: string
          is_active?: boolean | null
          phone_code?: string
          phone_format?: string | null
          phone_length?: number
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
      gmp_data: {
        Row: {
          created_at: string
          current_gmp: number | null
          expected_listing_price: number | null
          id: string
          ipo_id: string | null
          ipo_name: string
          lot_size: number | null
          percentage_change: number | null
          price_range: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_gmp?: number | null
          expected_listing_price?: number | null
          id?: string
          ipo_id?: string | null
          ipo_name: string
          lot_size?: number | null
          percentage_change?: number | null
          price_range?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_gmp?: number | null
          expected_listing_price?: number | null
          id?: string
          ipo_id?: string | null
          ipo_name?: string
          lot_size?: number | null
          percentage_change?: number | null
          price_range?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gmp_data_ipo_id_fkey"
            columns: ["ipo_id"]
            isOneToOne: false
            referencedRelation: "ipos"
            referencedColumns: ["id"]
          },
        ]
      }
      ipo_allotments: {
        Row: {
          allotment_amount: number | null
          allotment_date: string | null
          application_number: string | null
          created_at: string
          id: string
          ipo_id: string | null
          lots_allotted: number | null
          lots_applied: number
          pan_number: string | null
          refund_amount: number | null
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          allotment_amount?: number | null
          allotment_date?: string | null
          application_number?: string | null
          created_at?: string
          id?: string
          ipo_id?: string | null
          lots_allotted?: number | null
          lots_applied: number
          pan_number?: string | null
          refund_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          allotment_amount?: number | null
          allotment_date?: string | null
          application_number?: string | null
          created_at?: string
          id?: string
          ipo_id?: string | null
          lots_allotted?: number | null
          lots_applied?: number
          pan_number?: string | null
          refund_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ipo_allotments_ipo_id_fkey"
            columns: ["ipo_id"]
            isOneToOne: false
            referencedRelation: "ipos"
            referencedColumns: ["id"]
          },
        ]
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
      ipo_trades: {
        Row: {
          created_at: string
          id: string
          ipo_id: string | null
          issue_price: number | null
          listing_price: number | null
          lots_allotted: number | null
          lots_applied: number
          profit_loss: number | null
          sell_date: string | null
          sell_price: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          ipo_id?: string | null
          issue_price?: number | null
          listing_price?: number | null
          lots_allotted?: number | null
          lots_applied: number
          profit_loss?: number | null
          sell_date?: string | null
          sell_price?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          ipo_id?: string | null
          issue_price?: number | null
          listing_price?: number | null
          lots_allotted?: number | null
          lots_applied?: number
          profit_loss?: number | null
          sell_date?: string | null
          sell_price?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ipo_trades_ipo_id_fkey"
            columns: ["ipo_id"]
            isOneToOne: false
            referencedRelation: "ipos"
            referencedColumns: ["id"]
          },
        ]
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
          parent_company: string | null
          price_range: string | null
          profit_per_lot: string | null
          quota_categories: string[] | null
          sector: string | null
          shareholder_deadline: string | null
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
          parent_company?: string | null
          price_range?: string | null
          profit_per_lot?: string | null
          quota_categories?: string[] | null
          sector?: string | null
          shareholder_deadline?: string | null
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
          parent_company?: string | null
          price_range?: string | null
          profit_per_lot?: string | null
          quota_categories?: string[] | null
          sector?: string | null
          shareholder_deadline?: string | null
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
      nfos: {
        Row: {
          allotment_date: string | null
          aum: string | null
          benchmark: string | null
          category: string | null
          close_date: string | null
          contact_details: string | null
          created_at: string
          exit_load: string | null
          expense_ratio: string | null
          fund_house: string | null
          fund_manager: string | null
          id: string
          investment_objective: string | null
          maximum_investment: string | null
          minimum_investment: string | null
          name: string
          nav: string | null
          open_date: string | null
          peer_comparison: string | null
          risk_level: string | null
          status: string
          tax_implications: string | null
          type: string
          updated_at: string
        }
        Insert: {
          allotment_date?: string | null
          aum?: string | null
          benchmark?: string | null
          category?: string | null
          close_date?: string | null
          contact_details?: string | null
          created_at?: string
          exit_load?: string | null
          expense_ratio?: string | null
          fund_house?: string | null
          fund_manager?: string | null
          id?: string
          investment_objective?: string | null
          maximum_investment?: string | null
          minimum_investment?: string | null
          name: string
          nav?: string | null
          open_date?: string | null
          peer_comparison?: string | null
          risk_level?: string | null
          status?: string
          tax_implications?: string | null
          type?: string
          updated_at?: string
        }
        Update: {
          allotment_date?: string | null
          aum?: string | null
          benchmark?: string | null
          category?: string | null
          close_date?: string | null
          contact_details?: string | null
          created_at?: string
          exit_load?: string | null
          expense_ratio?: string | null
          fund_house?: string | null
          fund_manager?: string | null
          id?: string
          investment_objective?: string | null
          maximum_investment?: string | null
          minimum_investment?: string | null
          name?: string
          nav?: string | null
          open_date?: string | null
          peer_comparison?: string | null
          risk_level?: string | null
          status?: string
          tax_implications?: string | null
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          message: string
          roles: string[] | null
          send_email: boolean | null
          send_sms: boolean | null
          sent_at: string | null
          target_users: string | null
          title: string
          type: string | null
          user_ids: string[] | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          message: string
          roles?: string[] | null
          send_email?: boolean | null
          send_sms?: boolean | null
          sent_at?: string | null
          target_users?: string | null
          title: string
          type?: string | null
          user_ids?: string[] | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          message?: string
          roles?: string[] | null
          send_email?: boolean | null
          send_sms?: boolean | null
          sent_at?: string | null
          target_users?: string | null
          title?: string
          type?: string | null
          user_ids?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          annual_income: string | null
          bank_account_number: string | null
          bank_name: string | null
          broker_name: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          demat_account_number: string | null
          email: string
          id: string
          ifsc_code: string | null
          investment_experience: string | null
          mobile: string | null
          name: string
          occupation: string | null
          pan_card: string | null
          pincode: string | null
          risk_appetite: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          annual_income?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          broker_name?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          demat_account_number?: string | null
          email: string
          id: string
          ifsc_code?: string | null
          investment_experience?: string | null
          mobile?: string | null
          name: string
          occupation?: string | null
          pan_card?: string | null
          pincode?: string | null
          risk_appetite?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          annual_income?: string | null
          bank_account_number?: string | null
          bank_name?: string | null
          broker_name?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          demat_account_number?: string | null
          email?: string
          id?: string
          ifsc_code?: string | null
          investment_experience?: string | null
          mobile?: string | null
          name?: string
          occupation?: string | null
          pan_card?: string | null
          pincode?: string | null
          risk_appetite?: string | null
          state?: string | null
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
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          email: string | null
          id: string
          message: string
          name: string | null
          phone: string | null
          priority: string | null
          resolution: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message: string
          name?: string | null
          phone?: string | null
          priority?: string | null
          resolution?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          message?: string
          name?: string | null
          phone?: string | null
          priority?: string | null
          resolution?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string | null
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
      user_nfo_applications: {
        Row: {
          amount: string | null
          applied_at: string
          id: string
          nfo_id: string | null
          status: string | null
          units: string | null
          user_id: string
        }
        Insert: {
          amount?: string | null
          applied_at?: string
          id?: string
          nfo_id?: string | null
          status?: string | null
          units?: string | null
          user_id: string
        }
        Update: {
          amount?: string | null
          applied_at?: string
          id?: string
          nfo_id?: string | null
          status?: string | null
          units?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_nfo_applications_nfo_id_fkey"
            columns: ["nfo_id"]
            isOneToOne: false
            referencedRelation: "nfos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notifications: {
        Row: {
          created_at: string
          id: string
          notification_id: string | null
          read_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          notification_id?: string | null
          read_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          notification_id?: string | null
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_notifications_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          city: string | null
          created_at: string
          email: string
          id: string
          is_admin: boolean | null
          mobile: string | null
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          email: string
          id?: string
          is_admin?: boolean | null
          mobile?: string | null
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          city?: string | null
          created_at?: string
          email?: string
          id?: string
          is_admin?: boolean | null
          mobile?: string | null
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
