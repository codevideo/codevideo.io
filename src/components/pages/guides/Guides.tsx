import React from 'react';
import { Link } from 'gatsby';
import { Container, Flex, Grid, Heading, Text, Button, Box, Link as RadixLink } from '@radix-ui/themes';
import { Logo } from '../../shared/Logo';

const Guides = ({ guides }: any) => {
    return (
        <Container size="3" py="9" mt="9" style={{ minHeight: '70vh' }}>
            <Flex direction="column" align="center" mb="6">
                <Heading size="8" mb="3"><Logo fontSize="40" /> CodeVideo Guides</Heading>
                <Text size="5" mb="4">
                    Step-by-step tutorials and comprehensive guides to help you master CodeVideo and create amazing educational content. From beginner basics to advanced techniques.
                </Text>
            </Flex>

            <Flex direction="column" gap="8">
                {guides.map(({ node }: any) => {
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
                                        Read Guide
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

export default Guides;
