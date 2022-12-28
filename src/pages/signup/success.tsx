import * as React from "react";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/SEO";
import { SignUpSuccess } from "../../components/pages/signup/success/SignUpSuccess";

export default function SignUpSuccessPage() {
  return (
    <Layout>
      <SEO title="CodeVideo" />
      <SignUpSuccess />
    </Layout>
  );
}
