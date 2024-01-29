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
          width="560"
          height="315"
          src="https://www.youtube.com/embed/h1g-ZAl3kVU?si=L7ueCaSpZ_daYeyL"
          title="CodeVideo AI™ at work."
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={true}
        ></iframe>
        <Heading size="7" color="mint">
          Coming Q1 2024.
        </Heading>
        <Link underline="always" href="/signup">
          Join the wait list.
        </Link>
      </Flex>
    </Container>
  );
}
