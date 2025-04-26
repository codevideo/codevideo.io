import React, { useState } from "react";
import { graphql, Link } from "gatsby";
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, TextField, Grid, Link as RadixLink } from '@radix-ui/themes'
import SEO from '../components/SEO'

export const Head = ({ data }: any) => {
    return <SEO title="CodeVideo Glossary" description="Your guide to key concepts in declarative video creation, software education, and coding tutorial development." />
}

const GlossaryIndex = ({ data }: any) => {
    const { allMarkdownRemark } = data;
    const [filter, setFilter] = useState("");

    // Group terms by first letter
    const groupedTerms = allMarkdownRemark.edges.reduce((acc: any, { node }: any) => {
        const firstLetter = node.frontmatter.title.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(node);
        return acc;
    }, {});

    // Sort letters
    const sortedLetters = Object.keys(groupedTerms).sort();

    // Filter terms based on search input
    const filteredGroups = filter
        ? sortedLetters.reduce((acc: any, letter: any) => {
            const filteredTerms = groupedTerms[letter].filter((node: any) =>
                node.frontmatter.title.toLowerCase().includes(filter.toLowerCase()) ||
                node.frontmatter.description.toLowerCase().includes(filter.toLowerCase())
            );
            if (filteredTerms.length > 0) {
                acc[letter] = filteredTerms;
            }
            return acc;
        }, {})
        : groupedTerms;

    const filteredLetters = Object.keys(filteredGroups).sort();

    return (
        <Layout opacity='0.05'>
            <Container size="3" py="9" mt="9">
                <Flex direction="column" align="center" justify="center">
                    <Box style={{ maxWidth: '750px' }} width="100%">
                        <Heading size="9" mb="2" color='mint'>CodeVideo Glossary</Heading>
                        <Text size="4" mb="6" color="gray">
                            Welcome to the CodeVideo glossary, your guide to key concepts in declarative video creation,
                            software education, and coding tutorial development.
                        </Text>

                        <Box mb="6">
                            <TextField.Root size="3">
                                <TextField.Input
                                    placeholder="Search glossary terms..."
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </TextField.Root>
                        </Box>

                        <Flex gap="2" mb="6" wrap="wrap">
                            {sortedLetters.map(letter => (
                                <Box
                                    key={letter}
                                    asChild
                                >
                                    <a
                                        href={`#${letter}`}
                                        style={{
                                            textDecoration: 'none',
                                            opacity: filteredLetters.includes(letter) ? 1 : 0.5
                                        }}
                                    >
                                        <Text
                                            size="4"
                                            weight="bold"
                                            color={filteredLetters.includes(letter) ? "mint" : "gray"}
                                        >
                                            {letter}
                                        </Text>
                                    </a>
                                </Box>
                            ))}
                        </Flex>

                        <Section>
                            {filteredLetters.map(letter => (
                                <Box key={letter} mb="6" id={letter}>
                                    <Heading size="6" mb="3">{letter}</Heading>
                                    <Grid gap="4">
                                        {filteredGroups[letter].map((node: any) => (
                                            <Box key={node.id} p="4" style={{ borderRadius: '8px' }}>
                                                <Link to={node.fields.slug} style={{ textDecoration: 'none' }}>
                                                    <Heading size="4" mb="2" color="mint">{node.frontmatter.title}</Heading>
                                                    <Text size="2" color="gray">{node.frontmatter.description}</Text>
                                                </Link>
                                            </Box>
                                        ))}
                                    </Grid>
                                </Box>
                            ))}

                            {filteredLetters.length === 0 && (
                                <Box p="6">
                                    <Text size="4" color="gray">No glossary terms found matching "{filter}"</Text>
                                </Box>
                            )}
                        </Section>
                    </Box>
                </Flex>
            </Container>
        </Layout>
    );
};

export default GlossaryIndex;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
        filter: {fields: {contentType: {eq: "glossary"}}}
        sort: {frontmatter: {title: ASC}}
    ) {
        edges {
        node {
            id
            fields {
            slug
            }
            frontmatter {
            title
            description
            }
        }
      }
    }
}
`;