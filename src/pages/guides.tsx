import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import Guides from '../components/pages/guides/Guides'
import SEO from '../components/SEO'

const GuidesPage = ({ data }: any) => {
  const guides = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Guides — CodeVideo" description="Guides for creating code tutorials, translating educational videos, and building web projects with CodeVideo." pathname="/guides" />
      <Guides guides={guides} />
    </Layout>
  )
}

export default GuidesPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { contentType: { eq: "guide" } } }
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
