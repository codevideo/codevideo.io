import React from 'react';
import { Link } from 'gatsby';
import { Container, Flex, Grid, Heading, Text, Button, Box, Link as RadixLink } from '@radix-ui/themes';
import { Logo } from '../../shared/Logo';

const Blog = ({ posts }: any) => {
    return (
        <Container size="3" py="9" mt="9" style={{ minHeight: '70vh' }}>
            <Flex direction="column" align="center" mb="6">
                <Heading size="8" mb="3"><Logo fontSize="40" /> CodeVideo Blog</Heading>
                <Text size="5" mb="4">
                    Our blog is full of new features, updates, and discussion about the CodeVideo framework and ecosystem. All posts here are also posted to our <RadixLink href="https://medium.com/codevideo">Medium</RadixLink> and <RadixLink href="https://codevideo.substack.com">Substack</RadixLink> if you prefer to read on those platforms.
                </Text>
            </Flex>

            <Flex direction="column" gap="8">
                {posts.map(({ node }: any) => {
                    const title = node.frontmatter.title || node.fields.slug;
                    const date = node.frontmatter.date;
                    return (
                        <Flex key={node.fields.slug} direction="column" gap="2">
                            <Link to={node.fields.slug} style={{ textDecoration: 'none', color: 'var(--accent-a11)' }}>
                                <Heading size="8">{title}</Heading>
                            </Link>
                            <Text size="3">
                                <i>{new Date(date).toLocaleDateString()}</i>
                            </Text>
                            <Text
                                size="3"
                                mb="2"
                                dangerouslySetInnerHTML={{
                                    __html: node.frontmatter.description || node.excerpt
                                }}
                            />
                            <Box>
                                <Button asChild variant="solid" size="2" style={{ backgroundColor: 'var(--accent-a11)' }}>
                                    <Link to={node.fields.slug}>
                                        Read More
                                    </Link>
                                </Button>
                            </Box>
                        </Flex>
                    );
                })}
            </Flex>
        </Container>
    );
};

export default Blog;