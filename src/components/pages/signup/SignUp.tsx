import * as React from "react";
import { supabase } from "../../../services/supabaseClient";
import { useState } from "react";
import * as EmailValidator from "email-validator";
import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { CalloutHint } from "../../shared/CalloutHint";
import mixpanel from "mixpanel-browser";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState<
    "no-email" | "invalid-email" | "none" | "success" | "unknown-error"
  >("none");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    mixpanel.track("Sign Up", { email });
    e.preventDefault();

    if (!email) {
      setInfo("no-email");
      return;
    }

    if (!EmailValidator.validate(email)) {
      setInfo("invalid-email");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://codevideo.io/signup/success",
        },
      });
      if (error) throw error;
      setInfo("success");
    } catch (error: any) {
      setInfo("unknown-error");
    } finally {
      setLoading(false);
    }
  };

  const renderInfo = () => {
    switch (info) {
      case "no-email":
        return <CalloutHint color="crimson" text="Please enter your email!" />;
      case "invalid-email":
        return (
          <CalloutHint color="crimson" text="Please enter a valid email!" />
        );
      case "success":
        return (
          <CalloutHint
            color="mint"
            text="Successfully sent! Check your email for the magic link!"
          />
        );
      case "unknown-error":
        return (
          <CalloutHint
            color="crimson"
            text="Unknown error. Please try again later."
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading>Sign Up</Heading>
        <Text>Get early access by confirming your email via magic link.</Text>
        <form onSubmit={handleLogin}>
          <Flex gap="3" direction="column" justify="center" align="center">
            <Text htmlFor="email">Email</Text>
            <TextField.Root>
              <TextField.Input
                id="email"
                type="email"
                placeholder="you@yours.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </TextField.Root>
            <Button type="submit" disabled={info === "success" || loading}>
              {loading
                ? "Sending..."
                : info === "success"
                ? "Sent"
                : "Send magic link"}
            </Button>
          </Flex>
        </form>
        {renderInfo()}
        <Text color="mint">We'll never spam you.</Text>
      </Flex>
    </Container>
  );
}
