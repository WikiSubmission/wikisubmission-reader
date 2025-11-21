export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.0.2 (a4e00ff)"
  }
  public: {
    Tables: {
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
      DataQuranWordByWordMeanings: {
        Row: {
          meanings: string
          root_word: string
        }
        Insert: {
          meanings: string
          root_word: string
        }
        Update: {
          meanings?: string
          root_word?: string
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
        Relationships: []
      }
      DiscordScheduleMessageDeletion: {
        Row: {
          channel_id: string
          created_at: string
          execute_at: string
          id: number
          is_executed: boolean
          message_ids: string[]
          request_by_id: string
        }
        Insert: {
          channel_id: string
          created_at?: string
          execute_at: string
          id?: number
          is_executed?: boolean
          message_ids: string[]
          request_by_id: string
        }
        Update: {
          channel_id?: string
          created_at?: string
          execute_at?: string
          id?: number
          is_executed?: boolean
          message_ids?: string[]
          request_by_id?: string
        }
        Relationships: []
      }
      DiscordSecrets: {
        Row: {
          key: string
          value: string
        }
        Insert: {
          key: string
          value?: string
        }
        Update: {
          key?: string
          value?: string
        }
        Relationships: []
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
      "ws-bookmarks": {
        Row: {
          category: string | null
          created_at: string
          id: string
          key: string
          notes: string | null
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: string
          key: string
          notes?: string | null
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: string
          key?: string
          notes?: string | null
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      "ws-chapter-of-the-day": {
        Row: {
          chapter_number: number
          day: number
          id: string | null
          month: number
          year: number
        }
        Insert: {
          chapter_number: number
          day: number
          id?: string | null
          month: number
          year: number
        }
        Update: {
          chapter_number?: number
          day?: number
          id?: string | null
          month?: number
          year?: number
        }
        Relationships: []
      }
      "ws-ios-updates": {
        Row: {
          created_at: string
          id: string
          ios_version: string
          ios_version_notes: string
        }
        Insert: {
          created_at?: string
          id?: string
          ios_version: string
          ios_version_notes: string
        }
        Update: {
          created_at?: string
          id?: string
          ios_version?: string
          ios_version_notes?: string
        }
        Relationships: []
      }
      "ws-notifications": {
        Row: {
          created_at: string
          daily_chapter_last_delivery_at: string | null
          daily_chapter_notifications: Json | null
          daily_verse_last_delivery_at: string | null
          daily_verse_notifications: Json | null
          device_token: string | null
          id: string
          ignore: boolean | null
          last_delivery_at: string | null
          platform: string | null
          prayer_time_notifications: Json | null
          prayer_times_last_delivery_at: string | null
        }
        Insert: {
          created_at?: string
          daily_chapter_last_delivery_at?: string | null
          daily_chapter_notifications?: Json | null
          daily_verse_last_delivery_at?: string | null
          daily_verse_notifications?: Json | null
          device_token?: string | null
          id?: string
          ignore?: boolean | null
          last_delivery_at?: string | null
          platform?: string | null
          prayer_time_notifications?: Json | null
          prayer_times_last_delivery_at?: string | null
        }
        Update: {
          created_at?: string
          daily_chapter_last_delivery_at?: string | null
          daily_chapter_notifications?: Json | null
          daily_verse_last_delivery_at?: string | null
          daily_verse_notifications?: Json | null
          device_token?: string | null
          id?: string
          ignore?: boolean | null
          last_delivery_at?: string | null
          platform?: string | null
          prayer_time_notifications?: Json | null
          prayer_times_last_delivery_at?: string | null
        }
        Relationships: []
      }
      "ws-quran": {
        Row: {
          chapter_number: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_english: string
          chapter_title_transliterated: string
          chapter_verses: number | null
          global_index: number
          verse_footnote_english: string | null
          verse_id: string
          verse_id_arabic: string
          verse_index: number
          verse_number: number
          verse_subtitle_english: string | null
          verse_text_arabic: string
          verse_text_arabic_clean: string
          verse_text_english: string
          verse_text_transliterated: string
        }
        Insert: {
          chapter_number: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_english: string
          chapter_title_transliterated: string
          chapter_verses?: number | null
          global_index?: number
          verse_footnote_english?: string | null
          verse_id: string
          verse_id_arabic: string
          verse_index: number
          verse_number: number
          verse_subtitle_english?: string | null
          verse_text_arabic: string
          verse_text_arabic_clean: string
          verse_text_english: string
          verse_text_transliterated: string
        }
        Update: {
          chapter_number?: number
          chapter_revelation_order?: number
          chapter_title_arabic?: string
          chapter_title_english?: string
          chapter_title_transliterated?: string
          chapter_verses?: number | null
          global_index?: number
          verse_footnote_english?: string | null
          verse_id?: string
          verse_id_arabic?: string
          verse_index?: number
          verse_number?: number
          verse_subtitle_english?: string | null
          verse_text_arabic?: string
          verse_text_arabic_clean?: string
          verse_text_english?: string
          verse_text_transliterated?: string
        }
        Relationships: []
      }
      "ws-quran-chapters": {
        Row: {
          chapter_number: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_bengali: string | null
          chapter_title_english: string
          chapter_title_transliterated: string
          chapter_verses: number
        }
        Insert: {
          chapter_number?: number
          chapter_revelation_order: number
          chapter_title_arabic: string
          chapter_title_bengali?: string | null
          chapter_title_english: string
          chapter_title_transliterated: string
          chapter_verses: number
        }
        Update: {
          chapter_number?: number
          chapter_revelation_order?: number
          chapter_title_arabic?: string
          chapter_title_bengali?: string | null
          chapter_title_english?: string
          chapter_title_transliterated?: string
          chapter_verses?: number
        }
        Relationships: []
      }
      "ws-quran-foreign": {
        Row: {
          chapter_title_bahasa: string | null
          chapter_title_bengali: string | null
          chapter_title_french: string | null
          chapter_title_german: string | null
          chapter_title_persian: string | null
          chapter_title_russian: string | null
          chapter_title_swedish: string | null
          chapter_title_tamil: string | null
          chapter_title_turkish: string | null
          verse_footnote_bahasa: string | null
          verse_footnote_bengali: string | null
          verse_footnote_french: string | null
          verse_footnote_german: string | null
          verse_footnote_persian: string | null
          verse_footnote_russian: string | null
          verse_footnote_swedish: string | null
          verse_footnote_tamil: string | null
          verse_footnote_turkish: string | null
          verse_id: string
          verse_subtitle_bahasa: string | null
          verse_subtitle_bengali: string | null
          verse_subtitle_french: string | null
          verse_subtitle_german: string | null
          verse_subtitle_persian: string | null
          verse_subtitle_russian: string | null
          verse_subtitle_swedish: string | null
          verse_subtitle_tamil: string | null
          verse_subtitle_turkish: string | null
          verse_text_bahasa: string | null
          verse_text_bengali: string | null
          verse_text_french: string | null
          verse_text_german: string | null
          verse_text_persian: string | null
          verse_text_russian: string | null
          verse_text_swedish: string | null
          verse_text_tamil: string | null
          verse_text_turkish: string | null
        }
        Insert: {
          chapter_title_bahasa?: string | null
          chapter_title_bengali?: string | null
          chapter_title_french?: string | null
          chapter_title_german?: string | null
          chapter_title_persian?: string | null
          chapter_title_russian?: string | null
          chapter_title_swedish?: string | null
          chapter_title_tamil?: string | null
          chapter_title_turkish?: string | null
          verse_footnote_bahasa?: string | null
          verse_footnote_bengali?: string | null
          verse_footnote_french?: string | null
          verse_footnote_german?: string | null
          verse_footnote_persian?: string | null
          verse_footnote_russian?: string | null
          verse_footnote_swedish?: string | null
          verse_footnote_tamil?: string | null
          verse_footnote_turkish?: string | null
          verse_id: string
          verse_subtitle_bahasa?: string | null
          verse_subtitle_bengali?: string | null
          verse_subtitle_french?: string | null
          verse_subtitle_german?: string | null
          verse_subtitle_persian?: string | null
          verse_subtitle_russian?: string | null
          verse_subtitle_swedish?: string | null
          verse_subtitle_tamil?: string | null
          verse_subtitle_turkish?: string | null
          verse_text_bahasa?: string | null
          verse_text_bengali?: string | null
          verse_text_french?: string | null
          verse_text_german?: string | null
          verse_text_persian?: string | null
          verse_text_russian?: string | null
          verse_text_swedish?: string | null
          verse_text_tamil?: string | null
          verse_text_turkish?: string | null
        }
        Update: {
          chapter_title_bahasa?: string | null
          chapter_title_bengali?: string | null
          chapter_title_french?: string | null
          chapter_title_german?: string | null
          chapter_title_persian?: string | null
          chapter_title_russian?: string | null
          chapter_title_swedish?: string | null
          chapter_title_tamil?: string | null
          chapter_title_turkish?: string | null
          verse_footnote_bahasa?: string | null
          verse_footnote_bengali?: string | null
          verse_footnote_french?: string | null
          verse_footnote_german?: string | null
          verse_footnote_persian?: string | null
          verse_footnote_russian?: string | null
          verse_footnote_swedish?: string | null
          verse_footnote_tamil?: string | null
          verse_footnote_turkish?: string | null
          verse_id?: string
          verse_subtitle_bahasa?: string | null
          verse_subtitle_bengali?: string | null
          verse_subtitle_french?: string | null
          verse_subtitle_german?: string | null
          verse_subtitle_persian?: string | null
          verse_subtitle_russian?: string | null
          verse_subtitle_swedish?: string | null
          verse_subtitle_tamil?: string | null
          verse_subtitle_turkish?: string | null
          verse_text_bahasa?: string | null
          verse_text_bengali?: string | null
          verse_text_french?: string | null
          verse_text_german?: string | null
          verse_text_persian?: string | null
          verse_text_russian?: string | null
          verse_text_swedish?: string | null
          verse_text_tamil?: string | null
          verse_text_turkish?: string | null
        }
        Relationships: []
      }
      "ws-quran-word-by-word": {
        Row: {
          arabic_text: string | null
          chapter_index: number | null
          english_text: string | null
          global_index: number
          root_word: string | null
          transliterated_text: string | null
          verse_id: string | null
          verse_index: number | null
          word_index: number | null
        }
        Insert: {
          arabic_text?: string | null
          chapter_index?: number | null
          english_text?: string | null
          global_index: number
          root_word?: string | null
          transliterated_text?: string | null
          verse_id?: string | null
          verse_index?: number | null
          word_index?: number | null
        }
        Update: {
          arabic_text?: string | null
          chapter_index?: number | null
          english_text?: string | null
          global_index?: number
          root_word?: string | null
          transliterated_text?: string | null
          verse_id?: string | null
          verse_index?: number | null
          word_index?: number | null
        }
        Relationships: []
      }
      "ws-quran-word-by-word_backup": {
        Row: {
          arabic_text: string
          english_text: string
          global_index: number
          root_word: string
          transliterated_text: string
          verse_id: string
          word_index: number
        }
        Insert: {
          arabic_text: string
          english_text: string
          global_index?: number
          root_word: string
          transliterated_text: string
          verse_id: string
          word_index: number
        }
        Update: {
          arabic_text?: string
          english_text?: string
          global_index?: number
          root_word?: string
          transliterated_text?: string
          verse_id?: string
          word_index?: number
        }
        Relationships: []
      }
      "ws-quran-word-by-word-old": {
        Row: {
          arabic_text: string | null
          english_text: string | null
          global_index: number
          root_word: string | null
          transliterated_text: string | null
          verse_id: string | null
          word_index: number | null
        }
        Insert: {
          arabic_text?: string | null
          english_text?: string | null
          global_index: number
          root_word?: string | null
          transliterated_text?: string | null
          verse_id?: string | null
          word_index?: number | null
        }
        Update: {
          arabic_text?: string | null
          english_text?: string | null
          global_index?: number
          root_word?: string | null
          transliterated_text?: string | null
          verse_id?: string | null
          word_index?: number | null
        }
        Relationships: []
      }
      "ws-quran-word-by-word-with-meaning": {
        Row: {
          arabic_text: string | null
          english_text: string | null
          global_index: number
          id: number
          meanings: string | null
          root_word: string | null
          transliterated_text: string | null
          verse_id: string
          word_index: number
        }
        Insert: {
          arabic_text?: string | null
          english_text?: string | null
          global_index: number
          id?: number
          meanings?: string | null
          root_word?: string | null
          transliterated_text?: string | null
          verse_id: string
          word_index: number
        }
        Update: {
          arabic_text?: string | null
          english_text?: string | null
          global_index?: number
          id?: number
          meanings?: string | null
          root_word?: string | null
          transliterated_text?: string | null
          verse_id?: string
          word_index?: number
        }
        Relationships: []
      }
      "ws-user-data": {
        Row: {
          quran_bookmarks: Json | null
          quran_preferences: Json | null
          user_id: string
        }
        Insert: {
          quran_bookmarks?: Json | null
          quran_preferences?: Json | null
          user_id?: string
        }
        Update: {
          quran_bookmarks?: Json | null
          quran_preferences?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      "ws-verse-of-the-day": {
        Row: {
          day: number
          id: string | null
          month: number
          verse_id: string
          year: number
        }
        Insert: {
          day: number
          id?: string | null
          month: number
          verse_id: string
          year: number
        }
        Update: {
          day?: number
          id?: string | null
          month?: number
          verse_id?: string
          year?: number
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
