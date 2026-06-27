import * as React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/SEO";
import { SpeechShield } from "../components/pages/speech-shield/SpeechShield";

export default function SpeechShieldPage() {
  return (
    <Layout>
      <SEO title="Speech Shield — CodeVideo" description="CodeVideo Speech Shield: Evaluate the quality and accuracy of text-to-speech generated audio." pathname="/speech-shield" />
      <SpeechShield />
    </Layout>
  );
}
