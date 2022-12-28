import * as React from "react";
import Layout from "../components/layout/Layout";
import { SignUp } from "../components/pages/signup/SignUp";
import SEO from "../components/SEO";

export default function HomePage() {
  return (
    <Layout>
      <SEO title="CodeVideo" />
      <SignUp />
    </Layout>
  );
}
