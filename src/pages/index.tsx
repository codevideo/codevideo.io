import * as React from "react";
import Layout from "../components/layout/Layout";
import { Home } from "../components/pages/home/Home";
import SEO from "../components/Seo";

export default function HomePage() {
  return (
    <Layout>
      <SEO title="CodeVideo" />
      <Home />
    </Layout>
  );
}
