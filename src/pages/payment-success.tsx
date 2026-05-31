import * as React from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading, Link, Section, Text } from "@radix-ui/themes";
import Layout from "../components/layout/Layout";
import SEO from "../components/SEO";

export default function PaymentSuccessPage() {
  return (
    <Layout>
      <SEO
        title="CodeVideo: Payment Successful"
        description="Your CodeVideo Lifetime purchase was successful."
      />
      <Section size="3" mt="9" pt="9">
        <Container size="2">
          <Flex direction="column" align="center" gap="5">
            <Box style={{ textAlign: "center", maxWidth: 720 }}>
              <Heading size="8" mb="4">
                Thanks for buying CodeVideo Lifetime
              </Heading>
              <Text size="4" color="gray" as="p">
                Your payment is complete. Stripe will email your receipt, and we will use the purchase email for lifetime access and any follow-up.
              </Text>
            </Box>

            <Flex gap="4" wrap="wrap" justify="center">
              <Link href="https://studio.codevideo.io" target="_blank">
                <Button size="4" color="amber" style={{ cursor: "pointer" }}>
                  Open CodeVideo Studio
                  <ArrowRightIcon />
                </Button>
              </Link>
              <Link href="mailto:hi@fullstackcraft.com">
                <Button size="4" variant="soft" color="mint" style={{ cursor: "pointer" }}>
                  Contact Support
                </Button>
              </Link>
            </Flex>

            <Text size="2" color="gray" align="center">
              If you have questions about your purchase, email us from the address you used at checkout.
            </Text>
          </Flex>
        </Container>
      </Section>
    </Layout>
  );
}
