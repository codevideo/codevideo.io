import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import Features from '../components/pages/features/Features'
import SEO from '../components/SEO'

const FeaturesPage = ({ data }: any) => {
  const features = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="CodeVideo: Features" />
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
