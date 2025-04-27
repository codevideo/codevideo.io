import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import Blog from '../components/pages/blog/Blog'
import SEO from '../components/SEO'

const IndexPage = ({ data }: any) => {
  const posts = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="CodeVideo: Blog" />
      <Blog posts={posts} />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { contentType: { eq: "blog" } } }
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
