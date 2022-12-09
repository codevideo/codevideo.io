import * as React from "react";
import Layout from "../components/layout/Layout";
import { NotFound } from "../components/pages/not-found/NotFound";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="CodeVideo" />
      <NotFound />
    </Layout>
  );
}
