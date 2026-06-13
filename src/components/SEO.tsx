import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

export interface ISEOProps {
  title: string
  description?: string
  pathname?: string
  ogType?: string
  ogImage?: string
  noIndex?: boolean
}

function SEO(props: ISEOProps) {
  const { description, title, pathname, ogType, ogImage, noIndex } = props

  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const siteUrl = site.siteMetadata.siteUrl
  const defaultDescription = site.siteMetadata.description
  const metaDescription = description || defaultDescription || ""
  const canonical = pathname ? `${siteUrl}${pathname}` : siteUrl
  const defaultOgImage = `${siteUrl}/og.png`
  const image = ogImage || defaultOgImage
  const type = ogType || "website"

  return (
    <Helmet htmlAttributes={{ lang: "en" }}>
      {/* General tags */}
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* OpenGraph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content="CodeVideo" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

export default SEO
