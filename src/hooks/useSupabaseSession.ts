import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { Session } from "@supabase/supabase-js";

export const useSupabaseSession = (): Session | null => {
  const [session, setSession] = useState<Session | null>(null);

  // on mount, try to get session and also set up auth state change listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session
};
