import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug logging to check environment variables
if (!import.meta.env.PROD) {
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Anon Key exists:", !!supabaseAnonKey);
}

if (!supabaseUrl || !supabaseAnonKey) {
  if (!import.meta.env.PROD) {
    console.error("Missing environment variables:", {
      VITE_SUPABASE_URL: supabaseUrl,
      VITE_SUPABASE_ANON_KEY: supabaseAnonKey ? "[PRESENT]" : "[MISSING]",
    });
  }

  console.warn(
    "Supabase credentials not configured. Authentication features will be disabled.",
  );
}

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Auth helper functions
export const authHelpers = {
  signUp: async (
    email: string,
    password: string,
    userMetadata?: { firstName: string; lastName: string },
  ) => {
    if (!supabase) {
      return {
        data: { user: null, session: null },
        error: {
          message:
            "Authentication is currently unavailable. Please try again later or contact support.",
          name: "ServiceUnavailable",
        },
      };
    }

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
    if (!supabase) {
      return {
        data: { user: null, session: null },
        error: {
          message:
            "Authentication is currently unavailable. Please try again later or contact support.",
          name: "ServiceUnavailable",
        },
      };
    }

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
        data: { user: null, session: null },
        error: {
          message:
            "Unable to connect to authentication service. Please check your internet connection and try again.",
          name: "NetworkError",
        },
      };
    }
  },

  signOut: async () => {
    if (!supabase) {
      return { error: null };
    }
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getCurrentUser: async () => {
    if (!supabase) {
      return { user: null, error: null };
    }
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      return { user, error };
    } catch (err) {
      console.error("Error getting current user:", err);
      return { user: null, error: null };
    }
  },

  getSession: async () => {
    if (!supabase) {
      return { session: null, error: null };
    }
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      return { session, error };
    } catch (err) {
      console.error("Error getting session:", err);
      return { session: null, error: null };
    }
  },
};
