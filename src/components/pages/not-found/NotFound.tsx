import { Text, Heading, Link, Flex, Container } from "@radix-ui/themes";
import * as React from "react";

export function NotFound() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">Woops, that's a 404!</Heading>
        <Text>
          CodeVideo is revolutionizing the way software creators make video
          content.
        </Text>
        <Text>Get back to the homepage and see!</Text>
        <Link href="/">Return Home</Link>
      </Flex>
    </Container>
  );
}
