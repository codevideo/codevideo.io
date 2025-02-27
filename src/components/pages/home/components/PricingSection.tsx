import * as React from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CouponDialog } from '../../../shared/CouponDialog';
import mixpanel from 'mixpanel-browser';

const pricingTiers = [
    {
        name: "QA Tester",
        price: "0",
        actionsLimit: "Max 50 actions per export",
        tokens: "0",
        features: [
            "Markdown export only",
            "Maximum 50 actions",
            "Upgrade any time"
        ],
        actionButtonText: "Get Started Free"
    },
    {
        name: "Fledgling Creator",
        featured: true,
        price: "49",
        actionsLimit: "Max 250 actions per export",
        tokens: "500",
        features: [
            "All export formats",
            "Basic integrations",
            "Email support"
        ],
        actionButtonText: "Get Starter"
    },
    {
        name: "YouTube Influencer",
        price: "499",
        actionsLimit: "No action limit",
        period: "/ mo.",
        tokens: "10,000",
        features: [
            "All export formats",
            "Custom solutions",
            "Priority support"
        ],
        actionButtonText: "Get Enterprise"
    },
    {
        name: "Pay As You Go",
        price: "10 tokens / $1",
        tokens: "Any number of tokens",
        actionsLimit: "Reasonable max action limit",
        features: [
            "Top up as needed",
            "No commitment",
            "Tokens never expire"
        ],
        actionButtonText: "Buy Tokens"
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

    const handleOnClickTier = (pricingTierName: string) => {
        mixpanel.track("Pricing Tier Clicked", { pricingTierName });
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
                                    <Heading size="6">{tier.name !== "Pay As You Go" && <>$</>}{tier.price}</Heading>
                                    {tier.period && <Text size="2" color="gray">{tier.period}</Text>}
                                </Flex>
                                <Flex direction="column">
                                    <Text size="1" color="gray">{tier.tokens} {tier.name !== "Pay As You Go" && <>tokens</>}</Text>
                                    <Text size="1" color="gray">{tier.actionsLimit}</Text>
                                </Flex>

                                {tier.name === "Pay As You Go" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">~10 Markdown exports / $1</Text>
                                        <Text size="1" color="gray">~5 HTML exports / $1</Text>
                                        <Text size="1" color="gray">~2 PDF exports / $1</Text>
                                        <Text size="1" color="gray">~1 Video export / $1</Text>
                                    </Flex>
                                )}
                                {tier.name === "Free" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">As many markdown exports as you need</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                    </Flex>
                                )}
                                {tier.name !== "Pay As You Go" && tier.name !== "Free" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">~{usage.markdown} Markdown exports</Text>
                                        <Text size="1" color="gray">~{usage.html} HTML exports</Text>
                                        <Text size="1" color="gray">~{usage.pdf} PDF exports</Text>
                                        <Text size="1" color="gray">~{usage.video} Video exports</Text>
                                    </Flex>)}
                            </Box>

                            <Flex direction="column" gap="3">
                                {tier.features.map(feature => (
                                    <Flex key={feature} gap="2" align="center">
                                        <CheckCircledIcon />
                                        <Text size="2">{feature}</Text>
                                    </Flex>
                                ))}
                            </Flex>

                            <CouponDialog>
                                <Button onClick={() => handleOnClickTier(tier.name)} size="3" variant={tier.featured ? "solid" : "soft"}>
                                    {tier.actionButtonText}
                                </Button>
                            </CouponDialog>
                        </Flex>
                    </Card>
                );
            })}
        </Grid>
    );
}
