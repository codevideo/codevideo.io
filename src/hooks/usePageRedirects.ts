import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";

export const usePageRedirects = () => {
  // On mount, Check if the access_token is in the URL

  const checkForAccessToken = async () => {
    if (typeof window !== "undefined") {
      const parts = window.location.href.split("#");
      console.log(parts);
      if (parts.length > 1) {
        const params = new URLSearchParams(parts[1]);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        if (accessToken && refreshToken) {
          // If the access_token is in the URL, save it to localStorage
          localStorage.setItem("access_token", accessToken);
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) {
            console.log(error);
          }

          // Redirect the user to the /signup/success page
          window.location.href = "/signup/success";
        }
      }
    }
  };

  useEffect(() => {
    checkForAccessToken();
  }, []);
};
