import * as React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/SEO";
import { RobotTs } from "../components/pages/robotts/RobotTs";

export default function RobotTsPage() {
  return (
    <Layout>
      <SEO title="robotts" />
      <RobotTs />
    </Layout>
  );
}
