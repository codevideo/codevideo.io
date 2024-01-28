import * as React from "react";
import Layout from "../components/layout/Layout";
import { AI } from "../components/pages/ai/AI";
import SEO from "../components/SEO";

export default function AIPage() {
  return (
    <Layout>
      <SEO title="CodeVideo AI™" />
      <AI />
    </Layout>
  );
}
