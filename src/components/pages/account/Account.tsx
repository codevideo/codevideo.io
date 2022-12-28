import * as React from "react";
import { supabase } from "../../../services/supabaseClient";
import { useEffect, useState } from "react";
import { useSupabaseSession } from "../../../hooks/useSupabaseSession";
import { Session } from "@supabase/supabase-js";

export function Account() {
  const session = useSupabaseSession();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      // ge profile
      getProfile(session);
      return;
    }

    if (typeof window !== "undefined") {
      // redirect to HomePage
      window.location.replace("/");
      return;
    }
  }, [session]);

  const getProfile = async (session: Session) => {
    try {
      setLoading(true);
      const { user } = session;

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    e: React.FormEvent<HTMLFormElement>,
    session: Session
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { user } = session;

      const updates = {
        id: user.id,
        username,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div aria-live="polite">
      {loading ? (
        "Saving ..."
      ) : (
        <form
          onSubmit={(e) => updateProfile(e, session)}
          className="form-widget"
        >
          <div>Email: {session.user.email}</div>
          <div>
            <label htmlFor="username">Name</label>
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button className="button primary block" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
      )}
      <button
        type="button"
        className="button block"
        onClick={() => supabase.auth.signOut()}
      >
        Sign Out
      </button>
    </div>
  );
}
