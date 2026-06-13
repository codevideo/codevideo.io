import * as React from "react";
import Layout from "../components/layout/Layout";
import { Pontificator } from "../components/pages/pontificator/Pontificator";
import SEO from "../components/SEO";

export default function PontificatorPage() {
  return (
    <Layout>
      <SEO title="Pontificator — CodeVideo" description="The CodeVideo Pontificator: an experimental tool for generating educational content and presentations." pathname="/pontificator" />
      <Pontificator />
    </Layout>
  );
}
