import * as React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/SEO";
import { Account } from "../components/pages/account/Account";

export default function AccountPage() {
  return (
    <Layout>
      <SEO title="CodeVideo: Account" />
      <Account />
    </Layout>
  );
}
