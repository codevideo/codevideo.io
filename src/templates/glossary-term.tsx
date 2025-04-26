import React from "react";
import { graphql, Link } from "gatsby";
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, Separator, Card } from '@radix-ui/themes'
import SEO from '../components/SEO'

export const Head = ({ data }: any) => {
  const { markdownRemark } = data;
  return <SEO title={markdownRemark.frontmatter.title} description={markdownRemark.frontmatter.description} />
}

export default function GlossaryTermTemplate({ data }: any) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  
  return (
    <Layout opacity='0.05'>
      <Container size="3" py="9" mt="9">
        <Flex direction="column" align="center" justify="center">
          <Box style={{ maxWidth: '750px' }} width="100%">
            <Heading size="9" mb="2" color='mint'>{frontmatter.title}</Heading>
            <Heading size="6" color="gray" mb="4">{frontmatter.description}</Heading>
            
            <Section 
              className='glossary-term-content'
              style={{ fontSize: '1.3rem' }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            
            {frontmatter.relatedTerms && frontmatter.relatedTerms.length > 0 && (
              <Box mt="8">
                <Heading size="5" mb="4">Related Terms</Heading>
                <Separator size="4" mb="4" />
                
                <Flex direction="column" gap="2">
                  {frontmatter.relatedTerms.map((term: any, index: any) => (
                    <Box key={index}>
                      <Link to={`/glossary/${term.slug}/`} style={{ textDecoration: 'none' }}>
                        <Text size="3" color="mint">{term.title}</Text>
                      </Link>
                    </Box>
                  ))}
                </Flex>
              </Box>
            )}
            
            <Box mt="8">
              <Link to="/glossary/" style={{ textDecoration: 'none' }}>
                <Text size="3" color="mint">← Back to Glossary</Text>
              </Link>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        relatedTerms {
          title
          slug
        }
      }
    }
  }
`;