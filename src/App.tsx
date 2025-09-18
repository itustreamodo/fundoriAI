import { Suspense, useEffect, useState } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LandingPage from "./components/LandingPage";
import { supabase } from "./lib/supabase";
import { User } from "@supabase/supabase-js";
import routes from "tempo-routes";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      console.log("=== INITIAL SESSION CHECK START ===");
      console.log("Supabase client available:", !!supabase);

      try {
        if (!supabase) {
          console.warn("Supabase not initialized, skipping auth check");
          console.log("Environment variables:", {
            url: import.meta.env.VITE_SUPABASE_URL ? "present" : "missing",
            key: import.meta.env.VITE_SUPABASE_ANON_KEY ? "present" : "missing",
          });
          setUser(null);
          setLoading(false);
          return;
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log("Session check result:", {
          hasSession: !!session,
          hasUser: !!session?.user,
          userEmail: session?.user?.email,
        });

        setUser(session?.user ?? null);
        setLoading(false);
      } catch (error: any) {
        console.error("Error getting initial session:", {
          message: error.message,
          name: error.name,
          stack: error.stack,
        });
        setUser(null);
        setLoading(false);
      }

      console.log("=== INITIAL SESSION CHECK END ===");
    };

    getInitialSession();

    // Listen for auth changes only if supabase is available
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  const handleAuthSuccess = () => {
    // This will be handled by the auth state change listener
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Home />
              ) : (
                <LandingPage onAuthSuccess={handleAuthSuccess} />
              )
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
