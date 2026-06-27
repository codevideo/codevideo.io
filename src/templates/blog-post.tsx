import React, { useEffect, useRef } from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, Separator } from '@radix-ui/themes'
import SEO from '../components/SEO'
import { JsonLd } from '../components/JsonLd'
import { processActionNames } from '../utils/processActionNames'

const siteUrl = "https://codevideo.io"

export const Head = ({ data }: any) => {
    const post = data.markdownRemark
    const slug = post.fields?.slug || ''
    return (
        <>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                pathname={slug}
                ogType="article"
            />
            <JsonLd schema={[
                {
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.frontmatter.title,
                    description: post.frontmatter.description || post.excerpt,
                    url: `${siteUrl}${slug}`,
                    datePublished: post.frontmatter.rawDate || undefined,
                    image: [`${siteUrl}/og.png`],
                    mainEntityOfPage: {
                        "@type": "WebPage",
                        "@id": `${siteUrl}${slug}`,
                    },
                    author: {
                        "@type": "Person",
                        name: post.frontmatter.author || "Chris Frewin",
                    },
                    publisher: {
                        "@type": "Organization",
                        name: "CodeVideo",
                        url: siteUrl,
                    },
                },
                {
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: siteUrl,
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Blog",
                            item: `${siteUrl}/blog`,
                        },
                        {
                            "@type": "ListItem",
                            position: 3,
                            name: post.frontmatter.title,
                            item: `${siteUrl}${slug}`,
                        },
                    ],
                },
            ]} />
        </>
    )
}

const BlogPostTemplate = ({ data, pageContext }: any) => {
    const post = data.markdownRemark
    const { previous, next } = pageContext
    const contentRef = useRef<HTMLDivElement>(null);

    // Process action names after render - convert them to badges from our codevideo-react-components library
    useEffect(() => {
        if (!contentRef.current) return;

        // Call the helper function to replace action names with badges
        const cleanup = processActionNames(contentRef.current, {
            size: 'sm',
            variant: 'soft',
        });

        // Clean up when component unmounts
        return cleanup;
    }, [post.html]);

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
                        <Section
                            ref={contentRef}
                            className='blog'
                            style={{ fontSize: '1.3rem', maxWidth: '750px' }}
                            dangerouslySetInnerHTML={{ __html: post.html }} />
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
      fields {
        slug
      }
      frontmatter {
        title
        author
        description
        date(formatString: "MMMM DD, YYYY")
        rawDate: date
      }
    }
  }
`