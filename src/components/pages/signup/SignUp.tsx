import * as React from "react";
import { supabase } from "../../../services/supabaseClient";
import { useState } from "react";
import { toast } from "react-toastify";
import * as EmailValidator from 'email-validator';

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast("Please enter your email!", {
        position: "top-center",
      });
      return;
    }

    if (!EmailValidator.validate(email)) {
        toast("Please enter a valid email!", {
            position: "top-center",
        });
        return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      toast("Check your email for the login link!");
    } catch (error: any) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center mb-5 vh-100">
      <div className="row d-flex justify-content-center align-items-center">
        <div
          className="col-6 flex-column d-flex justify-content-center align-items-center"
          aria-live="polite"
        >
          <h1 className="header">Sign Up</h1>
          <p className="description">
            Sign in via magic link with your email below
          </p>
          {loading ? (
            "Sending magic link..."
          ) : (
            <form className="form-group" onSubmit={handleLogin}>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="form-control"
                type="email"
                placeholder="you@yours.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-primary m-3"
                aria-live="polite"
              >
                Send magic link
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
