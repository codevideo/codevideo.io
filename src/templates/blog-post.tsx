import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, Separator } from '@radix-ui/themes'
import SEO from '../components/SEO'

export const Head = ({ data }: any) => {
    const post = data.markdownRemark
    return <SEO title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt} />
}

const BlogPostTemplate = ({ data, pageContext }: any) => {
    const post = data.markdownRemark
    const { previous, next } = pageContext

    return (
        <Layout opacity='0.05'>
            <Container size="3" py="9" mt="9">
                <Flex direction="column" align="center" justify="center">

                    <Box style={{ maxWidth: '750px' }}>
                        <Heading size="9" mb="2" color='mint'>{post.frontmatter.title}</Heading>
                        <Heading size="6" color="gray" mb="2">{post.frontmatter.description}</Heading>
                        <Text size="3" color="gray">
                            <Text><i>Written by Chris {new Date(post.frontmatter.date).toLocaleDateString()}</i></Text>
                        </Text>
                    </Box>

                    <Flex direction="column" justify="center" align="center">
                        <Section className='blog' style={{ fontSize: '1.3rem', maxWidth: '750px' }} dangerouslySetInnerHTML={{ __html: post.html }} />
                    </Flex>

                    <Heading size="5" mt="8" mb="4">More posts:</Heading>
                    <Separator size="4" mb="5" />

                    <Flex className='blog' direction="column" gap="4">
                        {previous && (
                            <Box>
                                <Link to={previous.fields.slug} rel="prev">
                                    <Text size="3">← {previous.frontmatter.title}</Text>
                                </Link>
                            </Box>
                        )}

                        {next && (
                            <Box>
                                <Link to={next.fields.slug} rel="next">
                                    <Text size="3">{next.frontmatter.title} →</Text>
                                </Link>
                            </Box>
                        )}
                    </Flex>

                </Flex>
            </Container>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author
        description
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`