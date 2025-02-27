import * as React from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const pricingTiers = [
    {
        name: "Starter",
        price: "49",
        tokens: "500",
        features: [
            "All export formats",
            "Basic integrations",
            "Email support"
        ]
    },
    {
        name: "Creator",
        price: "99",
        tokens: "1,200",
        features: [
            "All export formats",
            "Advanced integrations",
            "Email support"
        ],
        featured: true
    },
    {
        name: "Professional",
        price: "199",
        tokens: "3,000",
        features: [
            "All export formats",
            "Custom integrations",
            "Email support"
        ]
    },
    {
        name: "Enterprise",
        price: "499",
        period: "/ mo.",
        tokens: "10,000",
        features: [
            "All export formats",
            "Custom solutions",
            "Priority support"
        ]
    }
];

const tokenCosts = {
    markdown: 1,
    html: 2,
    pdf: 5,
    video: 10
};

export function PricingSection() {
    const calculateUsage = (tokens: any) => {
        const numTokens = parseInt(tokens.replace(',', ''));
        return {
            markdown: Math.floor(numTokens / tokenCosts.markdown),
            html: Math.floor(numTokens / tokenCosts.html),
            pdf: Math.floor(numTokens / tokenCosts.pdf),
            video: Math.floor(numTokens / tokenCosts.video)
        };
    };

    return (
        <Grid columns={{ initial: "1", md: "2", lg: "4" }} gap="6">
            {pricingTiers.map(tier => {
                const usage = calculateUsage(tier.tokens);
                return (
                    <Card key={tier.name}>
                        <Flex direction="column" gap="4" p="6">
                            <Box>
                                <Heading size="2" mb="2">{tier.name}</Heading>
                                <Flex align="baseline" gap="1">
                                    <Heading size="6">${tier.price}</Heading>
                                    {tier.period && <Text size="2" color="gray">{tier.period}</Text>}
                                </Flex>
                                <Text size="2" color="gray">{tier.tokens} tokens</Text>

                                <Flex direction="column" mt="2">
                                    <Text size="1" color="gray">~{usage.markdown} Markdown exports</Text>
                                    <Text size="1" color="gray">~{usage.html} HTML exports</Text>
                                    <Text size="1" color="gray">~{usage.pdf} PDF exports</Text>
                                    <Text size="1" color="gray">~{usage.video} Video exports</Text>
                                </Flex>
                            </Box>

                            <Flex direction="column" gap="3">
                                {tier.features.map(feature => (
                                    <Flex key={feature} gap="2" align="center">
                                        <CheckCircledIcon />
                                        <Text size="2">{feature}</Text>
                                    </Flex>
                                ))}
                            </Flex>

                            <Button size="3" variant={tier.featured ? "solid" : "soft"}>
                                Get {tier.name}
                            </Button>
                        </Flex>
                    </Card>
                );
            })}
        </Grid>
    );
}
