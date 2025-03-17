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
      ApplePushNotifications: {
        Row: {
          apns_token: string
          created_at: string
          failed_times: number
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          apns_token: string
          created_at?: string
          failed_times?: number
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          apns_token?: string
          created_at?: string
          failed_times?: number
          latitude?: number | null
          longitude?: number | null
        }
        Relationships: []
      }
      DataMocMedia: {
        Row: {
          media_end_seconds: number | null
          media_end_timestamp: string | null
          media_episode: number | null
          media_index: number
          media_length: number | null
          media_markdown: string | null
          media_start_seconds: number | null
          media_start_timestamp: string | null
          media_title: string | null
          media_transcript: string | null
          media_type: string | null
          media_version: string | null
          media_youtube_id: string | null
          media_youtube_thumbnail: string | null
          media_youtube_timestamp: string | null
          media_youtube_title: string | null
        }
        Insert: {
          media_end_seconds?: number | null
          media_end_timestamp?: string | null
          media_episode?: number | null
          media_index?: number
          media_length?: number | null
          media_markdown?: string | null
          media_start_seconds?: number | null
          media_start_timestamp?: string | null
          media_title?: string | null
          media_transcript?: string | null
          media_type?: string | null
          media_version?: string | null
          media_youtube_id?: string | null
          media_youtube_thumbnail?: string | null
          media_youtube_timestamp?: string | null
          media_youtube_title?: string | null
        }
        Update: {
          media_end_seconds?: number | null
          media_end_timestamp?: string | null
          media_episode?: number | null
          media_index?: number
          media_length?: number | null
          media_markdown?: string | null
          media_start_seconds?: number | null
          media_start_timestamp?: string | null
          media_title?: string | null
          media_transcript?: string | null
          media_type?: string | null
          media_version?: string | null
          media_youtube_id?: string | null
          media_youtube_thumbnail?: string | null
          media_youtube_timestamp?: string | null
          media_youtube_title?: string | null
        }
        Relationships: []
      }
      DataNewsletters: {
        Row: {
          sp_content: string | null
          sp_index: number
          sp_month: string
          sp_page: number
          sp_tag: string
          sp_year: number
        }
        Insert: {
          sp_content?: string | null
          sp_index?: number
          sp_month: string
          sp_page: number
          sp_tag: string
          sp_year: number
        }
        Update: {
          sp_content?: string | null
          sp_index?: number
          sp_month?: string
          sp_page?: number
          sp_tag?: string
          sp_year?: number
        }
        Relationships: []
      }
      DataQuran: {
        Row: {
          chapter_god_total: number
          chapter_initials: string
          chapter_number: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_arabic_transliteration: string
          chapter_title_bahasa: string
          chapter_title_english: string
          chapter_title_french: string
          chapter_title_persian: string
          chapter_title_russian: string
          chapter_title_swedish: string
          chapter_title_turkish: string
          chapter_verses: number
          verse_audio_arabic_basit: string
          verse_audio_arabic_minshawi: string
          verse_audio_arabic_mishary: string
          verse_footnote_english: string | null
          verse_footnote_german: string | null
          verse_footnote_tamil: string | null
          verse_footnote_turkish: string | null
          verse_gematrical_value: number
          verse_god_count: number
          verse_id: string
          verse_id_arabic: string
          verse_index: number
          verse_index_initialed: number | null
          verse_index_numbered: number | null
          verse_letter_count: number
          verse_number: number
          verse_raw_image_arabic: string
          verse_subtitle_english: string | null
          verse_subtitle_tamil: string | null
          verse_subtitle_turkish: string | null
          verse_text_arabic: string
          verse_text_arabic_clean: string
          verse_text_arabic_transliteration: string | null
          verse_text_bahasa: string
          verse_text_english: string
          verse_text_french: string
          verse_text_german: string | null
          verse_text_persian: string
          verse_text_russian: string
          verse_text_swedish: string
          verse_text_tamil: string
          verse_text_turkish: string
          verse_word_count: number
        }
        Insert: {
          chapter_god_total: number
          chapter_initials: string
          chapter_number: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_arabic_transliteration: string
          chapter_title_bahasa: string
          chapter_title_english: string
          chapter_title_french: string
          chapter_title_persian: string
          chapter_title_russian: string
          chapter_title_swedish: string
          chapter_title_turkish: string
          chapter_verses: number
          verse_audio_arabic_basit: string
          verse_audio_arabic_minshawi: string
          verse_audio_arabic_mishary: string
          verse_footnote_english?: string | null
          verse_footnote_german?: string | null
          verse_footnote_tamil?: string | null
          verse_footnote_turkish?: string | null
          verse_gematrical_value: number
          verse_god_count: number
          verse_id: string
          verse_id_arabic: string
          verse_index: number
          verse_index_initialed?: number | null
          verse_index_numbered?: number | null
          verse_letter_count: number
          verse_number: number
          verse_raw_image_arabic: string
          verse_subtitle_english?: string | null
          verse_subtitle_tamil?: string | null
          verse_subtitle_turkish?: string | null
          verse_text_arabic: string
          verse_text_arabic_clean: string
          verse_text_arabic_transliteration?: string | null
          verse_text_bahasa: string
          verse_text_english: string
          verse_text_french: string
          verse_text_german?: string | null
          verse_text_persian: string
          verse_text_russian: string
          verse_text_swedish: string
          verse_text_tamil?: string
          verse_text_turkish: string
          verse_word_count: number
        }
        Update: {
          chapter_god_total?: number
          chapter_initials?: string
          chapter_number?: number
          chapter_revelation_order?: number
          chapter_title_arabic?: string
          chapter_title_arabic_transliteration?: string
          chapter_title_bahasa?: string
          chapter_title_english?: string
          chapter_title_french?: string
          chapter_title_persian?: string
          chapter_title_russian?: string
          chapter_title_swedish?: string
          chapter_title_turkish?: string
          chapter_verses?: number
          verse_audio_arabic_basit?: string
          verse_audio_arabic_minshawi?: string
          verse_audio_arabic_mishary?: string
          verse_footnote_english?: string | null
          verse_footnote_german?: string | null
          verse_footnote_tamil?: string | null
          verse_footnote_turkish?: string | null
          verse_gematrical_value?: number
          verse_god_count?: number
          verse_id?: string
          verse_id_arabic?: string
          verse_index?: number
          verse_index_initialed?: number | null
          verse_index_numbered?: number | null
          verse_letter_count?: number
          verse_number?: number
          verse_raw_image_arabic?: string
          verse_subtitle_english?: string | null
          verse_subtitle_tamil?: string | null
          verse_subtitle_turkish?: string | null
          verse_text_arabic?: string
          verse_text_arabic_clean?: string
          verse_text_arabic_transliteration?: string | null
          verse_text_bahasa?: string
          verse_text_english?: string
          verse_text_french?: string
          verse_text_german?: string | null
          verse_text_persian?: string
          verse_text_russian?: string
          verse_text_swedish?: string
          verse_text_tamil?: string
          verse_text_turkish?: string
          verse_word_count?: number
        }
        Relationships: []
      }
      DataQuranWordByWord: {
        Row: {
          arabic_text: string | null
          english_text: string | null
          id: string
          root_word_1: string | null
          root_word_2: string | null
          root_word_3: string | null
          transliterated_text: string | null
          verse_id: string
        }
        Insert: {
          arabic_text?: string | null
          english_text?: string | null
          id?: string
          root_word_1?: string | null
          root_word_2?: string | null
          root_word_3?: string | null
          transliterated_text?: string | null
          verse_id: string
        }
        Update: {
          arabic_text?: string | null
          english_text?: string | null
          id?: string
          root_word_1?: string | null
          root_word_2?: string | null
          root_word_3?: string | null
          transliterated_text?: string | null
          verse_id?: string
        }
        Relationships: []
      }
      DiscordGuilds: {
        Row: {
          guild_id: string
          id: number
          name: string
        }
        Insert: {
          guild_id: string
          id?: number
          name: string
        }
        Update: {
          guild_id?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      DiscordMembers: {
        Row: {
          avatar_url: string
          created_at: string
          created_timestamp: number
          display_name: string
          guild_id: string
          id: string
          joined_timestamp: number
          roles: string
          user_id: string
          user_name: string
        }
        Insert: {
          avatar_url?: string
          created_at?: string
          created_timestamp: number
          display_name: string
          guild_id: string
          id: string
          joined_timestamp: number
          roles?: string
          user_id: string
          user_name: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          created_timestamp?: number
          display_name?: string
          guild_id?: string
          id?: string
          joined_timestamp?: number
          roles?: string
          user_id?: string
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiscordMembers_guild_id_fkey"
            columns: ["guild_id"]
            isOneToOne: false
            referencedRelation: "DiscordGuilds"
            referencedColumns: ["guild_id"]
          },
        ]
      }
      GlobalCache: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
      }
      Secrets: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value: string
        }
        Update: {
          key?: string
          value?: string
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
