import * as React from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { CouponDialog } from '../../../shared/CouponDialog';
import mixpanel from 'mixpanel-browser';
import { useIsDesktop } from '../../../../hooks/useIsDesktop';
import { appendCouponCodeToStripeLink, getDiscountedAmount } from '@fullstackcraftllc/growthkit';
import { CouponBanner, CouponCampaignProvider, useCouponCode } from '@fullstackcraftllc/growthkit/coupons';

const PRODUCT_NAME = 'codevideo.io';
const couponEndpoint = process.env.GATSBY_GROWTHKIT_COUPON_ENDPOINT ||
    'https://bvcarbcmpexuinhatrop.supabase.co/functions/v1/coupons-for-date-range';
const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const formatPrice = (cents: number) => usd.format(cents / 100).replace(/\.00$/, '');

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
        price: 4900,
        campaignEligible: true,
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
        price: 49900,
        campaignEligible: true,
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
    return (
        <CouponCampaignProvider
            productName={PRODUCT_NAME}
            endpoint={couponEndpoint}
            enabled={pricingTiers.some(tier => tier.campaignEligible && Boolean(tier.stripePaymentLink))}
        >
            <PricingPlans />
        </CouponCampaignProvider>
    );
}

function PricingPlans() {
    const isDesktop = useIsDesktop();
    const coupon = useCouponCode(PRODUCT_NAME);
    const orderedTiers = isDesktop ? pricingTiers : [pricingTiers[1], pricingTiers[0], pricingTiers[2]];
    const offers = orderedTiers.map(tier => {
        const regularLink = tier.stripePaymentLink;
        const regularPrice = typeof tier.price === 'number' ? formatPrice(tier.price) : tier.price;
        const checkoutLink = coupon && tier.campaignEligible && regularLink
            ? appendCouponCodeToStripeLink(regularLink, coupon.couponCode)
            : regularLink;
        const salePrice = coupon && typeof tier.price === 'number' && checkoutLink !== regularLink
            ? formatPrice(getDiscountedAmount(tier.price, coupon.discountPercent))
            : null;
        return { tier, regularPrice, salePrice, checkoutLink };
    });
    const discountedOffers = offers.filter(offer => offer.salePrice !== null);
    const discountScope = discountedOffers.length === 2
        ? 'Creator’s first month and CodeVideo Lifetime'
        : discountedOffers[0]?.tier.period ? 'Creator’s first month' : 'CodeVideo Lifetime';
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

    return (
        <>
        <CouponBanner productName={PRODUCT_NAME} enabled={discountedOffers.length > 0}
            plansHref="#pricing" discountScope={discountScope} />
        <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6" width="100%">
            {offers.map(({ tier, regularPrice, salePrice, checkoutLink }) => {
                const usage = calculateUsage(tier.tokens);
                return (
                    <Card key={tier.name} style={{
                        backgroundColor: tier.featured ? 'var(--mint-4)' : 'var(--mint-1)',
                    }}>
                        <Flex direction="column" justify="center" align="center" gap="4" p="6">
                            <Box>
                                <Heading size="2" mb="2">{tier.name}</Heading>
                                <Flex align="baseline" gap="1">
                                    {salePrice && <Text size="2" color="gray"><del>{regularPrice}</del></Text>}
                                    <Heading size="6">{salePrice ?? regularPrice}</Heading>
                                    {tier.period && <Text size="2" color="gray">{salePrice ? 'first month' : tier.period}</Text>}
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



                            {checkoutLink ? (
                                <Link href={checkoutLink} target='_blank'>
                                    <Button 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleOnClickTier(tier.name)} size="3" variant={tier.featured ? "solid" : "soft"} color={tier.name === "CodeVideo Lifetime" ? "amber" : "mint"}>
                                        {tier.actionButtonText}
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    {tier.actionButtonText === "Get Started Free" ? (
                                        <Link href="https://studio.codevideo.io" target='_blank'>
                                            <Button
                                            style={{ cursor: 'pointer' }}
                                                size="3"
                                                variant="soft"
                                                color="mint"
                                            >
                                                {tier.actionButtonText}
                                            </Button>
                                        </Link>
                                    ) : (
                                        <CouponDialog>
                                            <Button 
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleOnClickTier(tier.name)} size="3" variant={tier.featured ? "solid" : "soft"} color={tier.name === "CodeVideo Lifetime" ? "amber" : "mint"}>
                                                {tier.actionButtonText}
                                            </Button>
                                        </CouponDialog>
                                    )}
                                </>
                            )}
                        </Flex>
                    </Card>
                );
            })}
        </Grid>
        </>
    );
}
