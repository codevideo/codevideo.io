import React from 'react';
import { Link } from 'gatsby';
import { Container, Flex, Grid, Heading, Text, Button, Box, Link as RadixLink } from '@radix-ui/themes';
import { Logo } from '../../shared/Logo';

const Features = ({ features }: any) => {
    return (
        <Container size="3" py="9" mt="9" style={{ minHeight: '70vh' }}>
            <Flex direction="column" align="center" mb="6">
                <Heading size="8" mb="3"><Logo fontSize="40" /> CodeVideo Features</Heading>
                <Text size="5" mb="4">
                    Discover the powerful features that make CodeVideo the ultimate tool for creating educational programming content. Learn about each capability and how it can enhance your workflow.
                </Text>
            </Flex>

            <Flex direction="column" gap="8">
                {features.map(({ node }: any) => {
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
                                        Learn More
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

export default Features;
