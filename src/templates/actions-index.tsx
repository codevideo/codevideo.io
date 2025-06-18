import React, { useState } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from '../components/layout/Layout'
import { Container, Flex, Heading, Text, Box, Section, TextField, Grid, Link as RadixLink, Button, Badge, Code } from '@radix-ui/themes'
import SEO from '../components/SEO'
import { ActionBadge } from "@fullstackcraftllc/codevideo-react-components";
import { domainColors } from "../constants/domainColors";

export const Head = () => {
    return <SEO title="CodeVideo Actions Reference" description="Complete reference guide for all CodeVideo actions - from editor and terminal commands to file operations and mouse interactions." />
}

const ActionsIndex = () => {
    const data = useStaticQuery(graphql`
        query {
            allActionData {
                nodes {
                    name
                    description
                    valueDescription
                }
            }
        }
    `);

    const { allActionData } = data;
    const [filter, setFilter] = useState("");
    const [domainFilter, setDomainFilter] = useState("");

    // Extract unique domains and create color mapping
    const domains = Array.from(new Set(allActionData.nodes.map((action: any) => action.name.split('-')[0]))).sort() as any;

    // Group actions by first letter
    const groupedActions = allActionData.nodes.reduce((acc: any, action: any) => {
        const firstLetter = action.name.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
            acc[firstLetter] = [];
        }
        acc[firstLetter].push(action);
        return acc;
    }, {});

    // Sort letters
    const sortedLetters = Object.keys(groupedActions).sort();

    // Filter actions
    const filteredGroups = Object.keys(groupedActions).reduce((acc: any, letter: string) => {
        const filteredActions = groupedActions[letter].filter((action: any) => {
            const matchesTextFilter = action.name.toLowerCase().includes(filter.toLowerCase()) ||
                action.description.toLowerCase().includes(filter.toLowerCase());

            const actionDomain = action.name.split('-')[0];
            const matchesDomainFilter = !domainFilter || actionDomain === domainFilter;

            return matchesTextFilter && matchesDomainFilter;
        });

        if (filteredActions.length > 0) {
            acc[letter] = filteredActions;
        }
        return acc;
    }, {});

    const filteredLetters = Object.keys(filteredGroups).sort();

    return (

        <Container size="4" py="9" mt="9">
            <Flex direction="column" align="center">

                {/* Header */}
                <Box mb="8" style={{ textAlign: 'center' }}>
                    <Heading size="8" mb="4">CodeVideo Actions Reference</Heading>
                    <Text size="4" color="gray" style={{ maxWidth: '600px' }}>
                        Complete documentation for all CodeVideo actions. Use these action names in your lesson steps to control editors, terminals, file explorers, and more.
                    </Text>
                </Box>

                {/* Filters */}
                <Flex direction="column" gap="4" mb="6" style={{ width: '100%', maxWidth: '600px' }}>

                    {/* Text Filter */}
                    <TextField.Root
                        size="3"
                    >
                        <TextField.Input
                            placeholder="Search actions by name or description..."
                            value={filter}
                            onChange={(e: any) => setFilter(e.target.value)}
                        />
                    </TextField.Root>

                    {/* Domain Filter Buttons */}
                    <Box>
                        <Text size="2" color="gray" mb="3" style={{ display: 'block' }}>Filter by domain:</Text>
                        <Flex wrap="wrap" gap="2">
                            <Button
                                variant={domainFilter === "" ? "solid" : "soft"}
                                color="gray"
                                size="2"
                                onClick={() => setDomainFilter("")}
                            >
                                All ({allActionData.nodes.length})
                            </Button>
                            {domains.map((domain: any) => {
                                const count = allActionData.nodes.filter((action: any) =>
                                    action.name.split('-')[0] === domain
                                ).length;

                                return (
                                    <Button
                                        key={domain}
                                        variant={domainFilter === domain ? "solid" : "soft"}
                                        color={domainColors[domain] || 'gray'}
                                        size="2"
                                        onClick={() => setDomainFilter(domain)}
                                    >
                                        {domain} ({count})
                                    </Button>
                                );
                            })}
                        </Flex>
                    </Box>
                </Flex>

                {/* Alphabet Navigation */}
                {filteredLetters.length > 0 && (
                    <Flex wrap="wrap" gap="2" justify="center" mb="6">
                        {sortedLetters.map(letter => (
                            <RadixLink
                                key={letter}
                                href={`#${letter}`}
                                style={{
                                    opacity: filteredLetters.includes(letter) ? 1 : 0.3,
                                    pointerEvents: filteredLetters.includes(letter) ? 'auto' : 'none'
                                }}
                            >
                                <Button variant="ghost" size="1">
                                    {letter}
                                </Button>
                            </RadixLink>
                        ))}
                    </Flex>
                )}

                {/* Actions List */}
                <Box style={{ width: '100%', maxWidth: '800px' }}>
                    <Section>
                        {filteredLetters.map(letter => (
                            <Box key={letter} mb="6" id={letter}>
                                <Heading size="6" mb="4">{letter}</Heading>
                                <Grid gap="4">
                                    {filteredGroups[letter].map((action: any) => {
                                        const domain = action.name.split('-')[0];
                                        const actionSlug = `/actions/${action.name}`;

                                        return (
                                            <Box key={action.name} p="4" style={{
                                                borderRadius: '8px',
                                                border: '1px solid var(--gray-6)',
                                                backgroundColor: 'var(--gray-2)'
                                            }}>
                                                <Link to={actionSlug} style={{ textDecoration: 'none' }}>
                                                    <Flex direction="column" gap="2">

                                                        {/* Action name and domain */}
                                                        <Flex align="center" gap="2" mb="2">
                                                            <Badge color={domainColors[domain] || 'gray'} size="1">
                                                                {domain}
                                                            </Badge>
                                                            {/*<Code style={{ fontSize: '14px' }}>
                                                                    {action.name}
                                                                </Code> */}
                                                            <ActionBadge actionName={action.name} />
                                                        </Flex>

                                                        {/* Description */}
                                                        <Text size="3" color="gray" style={{ lineHeight: '1.4' }}>
                                                            {action.description}
                                                        </Text>

                                                        {/* Value description */}
                                                        <Text size="2" color="gray" style={{
                                                            fontStyle: 'italic',
                                                            lineHeight: '1.3'
                                                        }}>
                                                            Value: {action.valueDescription}
                                                        </Text>

                                                    </Flex>
                                                </Link>
                                            </Box>
                                        );
                                    })}
                                </Grid>
                            </Box>
                        ))}

                        {filteredLetters.length === 0 && (
                            <Box p="6">
                                <Text size="4" color="gray" align="center">
                                    No actions found matching "{filter}"
                                    {domainFilter && ` in domain "${domainFilter}"`}
                                </Text>
                            </Box>
                        )}
                    </Section>
                </Box>
            </Flex>
        </Container>
    );
};

export default ActionsIndex;
