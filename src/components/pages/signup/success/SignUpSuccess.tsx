import { Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import * as React from "react";

export function SignUpSuccess() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading>Thank You!</Heading>
        <Text>Thanks a lot for signing up for the <Text color="mint">{'/>'} CodeVideo AI™</Text> beta.</Text>
        <Text>We'll email you as soon as it's out.</Text>
        <Link href="/">
          Back to Home
        </Link>
      </Flex>
    </Container>
  );
}
