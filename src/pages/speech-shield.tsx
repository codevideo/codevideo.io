import * as React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/SEO";
import { SpeechShield } from "../components/pages/speech-shield/SpeechShield";

export default function SpeechShieldPage() {
  return (
    <Layout>
      <SEO title="speech-shield" />
      <SpeechShield />
    </Layout>
  );
}
