import * as React from "react";
import Layout from "../components/layout/Layout";
import { Pontificator } from "../components/pages/pontificator/Pontificator";
import SEO from "../components/SEO";

export default function PontificatorPage() {
  return (
    <Layout>
      <SEO title="pontificator" />
      <Pontificator />
    </Layout>
  );
}
