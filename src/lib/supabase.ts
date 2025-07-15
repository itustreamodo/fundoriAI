import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging to check environment variables
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Anon Key exists:", !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing environment variables:", {
    VITE_SUPABASE_URL: supabaseUrl,
    VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? "[PRESENT]" : "[MISSING]",
  });
  throw new Error(
    "Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helper functions
export const authHelpers = {
  signUp: async (
    email: string,
    password: string,
    userMetadata?: { firstName: string; lastName: string },
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: userMetadata?.firstName || "",
          last_name: userMetadata?.lastName || "",
          full_name: userMetadata
            ? `${userMetadata.firstName} ${userMetadata.lastName}`
            : "",
        },
      },
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    try {
      console.log("Attempting to sign in with email:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Supabase auth error:", error);
      } else {
        console.log("Sign in successful:", data.user?.email);
      }

      return { data, error };
    } catch (err) {
      console.error("Network or other error during sign in:", err);
      return {
        data: null,
        error: {
          message:
            "Network error: Unable to connect to authentication service. Please check your internet connection and try again.",
          name: "NetworkError",
        },
      };
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    return { user, error };
  },

  getSession: async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    return { session, error };
  },
};
