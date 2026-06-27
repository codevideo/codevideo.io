import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import Features from '../components/pages/features/Features'
import SEO from '../components/SEO'

const FeaturesPage = ({ data }: any) => {
  const features = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Features — CodeVideo" description="Explore CodeVideo's declarative video creation features: multi-format export, action-based editing, virtual IDE, multilingual support, and more." pathname="/features" />
      <Features features={features} />
    </Layout>
  )
}

export default FeaturesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { contentType: { eq: "feature" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
            contentType
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            author
            description
          }
        }
      }
    }
  }
`
