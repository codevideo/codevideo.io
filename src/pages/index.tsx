import * as React from "react";
import Layout from "../components/layout/Layout";
import { Home } from "../components/pages/home/Home";
import SEO from "../components/SEO";
import { JsonLd } from "../components/JsonLd";

const siteUrl = "https://codevideo.io"

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}#organization`,
  name: "Full Stack Craft LLC",
  url: "https://fullstackcraft.com",
  logo: `${siteUrl}/icons/icon-512x512.png`,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "hi@fullstackcraft.com",
  },
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}#website`,
  name: "CodeVideo",
  url: siteUrl,
  description:
    "Create educational software videos 1000x faster. Transform JSON actions into professional tutorials, documentation, and multi-format exports without screen recording.",
  publisher: {
    "@id": `${siteUrl}#organization`,
  },
}

const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodeVideo",
  url: siteUrl,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  description:
    "A declarative, action-based video creation platform for developers. Build educational programming content by defining sequences of actions rather than manually recording.",
  publisher: {
    "@id": `${siteUrl}#organization`,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free Trial",
      price: "0",
      priceCurrency: "USD",
      description: "50 free tokens to try CodeVideo Studio",
    },
    {
      "@type": "Offer",
      name: "Pay As You Go",
      price: "2",
      priceCurrency: "USD",
      description: "10 tokens",
    },
    {
      "@type": "Offer",
      name: "Creator",
      price: "49",
      priceCurrency: "USD",
      description: "500 tokens per month",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        billingDuration: "P1M",
      },
    },
    {
      "@type": "Offer",
      name: "Lifetime",
      price: "499",
      priceCurrency: "USD",
      description: "One-time purchase, unlimited access",
    },
  ],
}

export default function HomePage() {
  return (
    <Layout>
      <SEO
        title="CodeVideo — Declarative Video Creation for Developers"
        description="Create educational software videos 1000x faster. Transform JSON actions into professional tutorials, documentation, and multi-format exports without screen recording."
        pathname="/"
      />
      <JsonLd schema={[organizationSchema, webSiteSchema, softwareAppSchema]} />
      <Home />
    </Layout>
  );
}
