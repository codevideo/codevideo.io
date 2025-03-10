import * as React from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Link, Text, Link as RadixLink } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CouponDialog } from '../../../shared/CouponDialog';
import mixpanel from 'mixpanel-browser';
import { useIsDesktop } from '../../../../hooks/useIsDesktop';

const pricingTiers = [
    // {
    //     name: "Free",
    //     price: "0",
    //     tokens: "0",
    //     actionsLimit: "Max 50 actions per export",
    //     features: [
    //         "JSON or basic markdown export only",
    //         "Maximum 50 actions",
    //         "Upgrade any time"
    //     ],
    //     actionButtonText: "Get Started Free"
    // },
    // {
    //     name: "Starter",
    //     price: "10",
    //     period: "/ mo.",
    //     actionsLimit: "Max 250 actions per export",
    //     tokens: "50",
    //     features: [
    //         "All export formats",
    //         "Basic integrations",
    //         "Email support"
    //     ],
    //     actionButtonText: "Get Starter",
    //     stripePaymentLink: process.env.GATSBY_STRIPE_STARTER_PAYMENT_LINK
    // },

    // {
    //     name: "Enterprise",
    //     price: "499",
    //     period: "/ mo.",
    //     tokens: "10000",
    //     actionsLimit: "No action limit",
    //     features: [
    //         "All export formats",
    //         "Custom solutions",
    //         "Priority support"
    //     ],
    //     actionButtonText: "Get Enterprise",
    //     stripePaymentLink: process.env.GATSBY_STRIPE_ENTERPRISE_PAYMENT_LINK
    // },
    {
        name: "Pay As You Go",
        price: "$2 for 10 tokens",
        tokens: "Any number of tokens",
        actionsLimit: "Max 250 actions per export",
        features: [
            "Top up as needed",
            "No commitment",
            "Tokens never expire"
        ],
        actionButtonText: "Buy Tokens",
        stripePaymentLink: process.env.GATSBY_STRIPE_TOPUP_PAYMENT_LINK
    },
    {
        name: "Creator",
        featured: true,
        price: "49",
        period: "/ mo.",
        tokens: "500",
        actionsLimit: "No action limit",
        features: [
            "All export formats",
            "Basic integrations",
            "Email support"
        ],
        actionButtonText: "Get Creator",
        stripePaymentLink: process.env.GATSBY_STRIPE_CREATOR_PAYMENT_LINK
    },
    {
        name: "CodeVideo Lifetime",
        price: "2000",
        tokens: "Infinite generations",
        actionsLimit: "No action limit",
        features: [
            "Guaranteed lifetime access",
            "All export formats",
            "No hassle with subscriptions"
        ],
        actionButtonText: "Buy Lifetime",
        stripePaymentLink: process.env.GATSBY_STRIPE_LIFETIME_PAYMENT_LINK
    }
];

const tokenCosts = {
    markdown: 1,
    html: 2,
    react: 3,
    pdf: 5,
    pptx: 5,
    video: 10
};

export function PricingSection() {
    const isDesktop = useIsDesktop();
    const calculateUsage = (tokens: any) => {
        const numTokens = parseInt(tokens.replace(',', ''));
        return {
            markdown: Math.floor(numTokens / tokenCosts.markdown) || 'Infinite',
            html: Math.floor(numTokens / tokenCosts.html) || 'Infinite',
            react: Math.floor(numTokens / tokenCosts.react) || 'Infinite',
            pdf: Math.floor(numTokens / tokenCosts.pdf) || 'Infinite',
            pptx: Math.floor(numTokens / tokenCosts.pptx) || 'Infinite',
            video: Math.floor(numTokens / tokenCosts.video) || 'Infinite'
        };
    };

    const handleOnClickTier = (pricingTierName: string) => {
        mixpanel.track("Pricing Tier Clicked", { pricingTierName });
    };

    // on mobile show the creator as the first option - swapp index 0 and 1
    if (!isDesktop) {
        const temp = pricingTiers[0];
        pricingTiers[0] = pricingTiers[1];
        pricingTiers[1] = temp;
    }

    return (
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6" width="100%">
            {pricingTiers.map(tier => {
                const usage = calculateUsage(tier.tokens);
                return (
                    <Card key={tier.name} style={{
                        backgroundColor: tier.featured ? 'var(--mint-4)' : 'var(--mint-1)',
                    }}>
                        <Flex direction="column" justify="center" align="center" gap="4" p="6">
                            <Box>
                                <Heading size="2" mb="2">{tier.name}{tier.name === "CodeVideo Lifetime" && <sup style={{ fontSize: '1.2rem', color: 'var(--amber-9)' }}>*</sup>}</Heading>
                                <Flex align="baseline" gap="1">
                                    <Heading size="6">{tier.name !== "Pay As You Go" && <>$</>}{tier.price}</Heading>
                                    {tier.period && <Text size="2" color="gray">{tier.period}</Text>}
                                </Flex>
                                <Flex direction="column">
                                    <Text size="1" color="gray">{tier.tokens} {tier.name !== "Pay As You Go" && tier.name !== "CodeVideo Lifetime" && <>tokens</>}</Text>
                                    <Text size="1" color="gray">{tier.actionsLimit}</Text>
                                </Flex>

                                {tier.name === "Pay As You Go" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">~10 Markdown exports</Text>
                                        <Text size="1" color="gray">~5 HTML exports</Text>
                                        <Text size="1" color="gray">~3 React exports</Text>
                                        <Text size="1" color="gray">~2 PDF exports</Text>
                                        <Text size="1" color="gray">~2 PPTX exports</Text>
                                        <Text size="1" color="gray">~1 Video export</Text>
                                    </Flex>
                                )}
                                {tier.name === "Free" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">As many JSON exports as you want</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                        <Text size="1" color="gray">&nbsp;</Text>
                                    </Flex>
                                )}
                                {tier.name !== "Pay As You Go" && tier.name !== "Free" && (
                                    <Flex direction="column" mt="2">
                                        <Text size="1" color="gray">~{usage.markdown} Markdown exports</Text>
                                        <Text size="1" color="gray">~{usage.html} HTML exports</Text>
                                        <Text size="1" color="gray">~{usage.react} React exports</Text>
                                        <Text size="1" color="gray">~{usage.pdf} PDF exports</Text>
                                        <Text size="1" color="gray">~{usage.pptx} PPTX exports</Text>
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



                            {tier.stripePaymentLink ? (
                                <Link href={tier.stripePaymentLink} target='_blank'>
                                    <Button onClick={() => handleOnClickTier(tier.name)} size="3" variant={tier.featured ? "solid" : "soft"} color={tier.name === "CodeVideo Lifetime" ? "amber" : "mint"}>
                                        {tier.actionButtonText}
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    {tier.actionButtonText === "Get Started Free" ? (
                                        <Link href="https://studio.codevideo.io" target='_blank'>
                                            <Button

                                                size="3"
                                                variant="soft"
                                                color="mint"
                                            >
                                                {tier.actionButtonText}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <CouponDialog>
                                            <Button onClick={() => handleOnClickTier(tier.name)} size="3" variant={tier.featured ? "solid" : "soft"} color={tier.name === "CodeVideo Lifetime" ? "amber" : "mint"}>
                                                {tier.actionButtonText}
                                            </Button>
                                        </CouponDialog>
                                    )}
                                </>
                            )}
                            <Flex direction="column" gap="3">
                                {tier.name === "CodeVideo Lifetime" && (
                                    <Text size="1" color="gray" align="center">
                                        <sup style={{ fontSize: '1.2rem', color: 'var(--amber-9)' }}>*</sup>Social experiment: for every lifetime license purchased, <RadixLink href="https://chrisfrew.in" target="_blank">Chris</RadixLink> will take a month off his day job to work on CodeVideo!
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                    </Card>
                );
            })}
        </Grid>
    );
}