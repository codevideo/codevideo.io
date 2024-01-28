import { Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import * as React from "react";

export function AI() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">{"/>"} CodeVideo AI™</Heading>
        <Heading size="7">
          Generate step by step, dictated software lessons from articles, blog
          posts, or a prompt.
        </Heading>
        <iframe
          src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7154561323509469184?compact=1"
          height="399"
          width="710"
          title="Embedded post"
        ></iframe>
        <Heading size="7" color="mint">
          Coming Q1 2024.
        </Heading>
        <Link underline="always" href="/signup">Join the wait list.</Link>
      </Flex>
    </Container>
  );
}
