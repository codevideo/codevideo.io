import { Code, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../../shared/Logo";

export function Pontificator() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">
          <Code><Logo/>pontificator</Code>
        </Heading>
        <Heading size="7">
          Generate studio quality dictated audio files from books, articles, and
          blog posts.
        </Heading>
        <Text>
          Give us a star{" "}
          <a href="https://github.com/codevideo/pontificator">
            on Github.
          </a>
        </Text>
        <Text>
          See an example of a dictated blog post{" "}
          <a href="https://chrisfrew.in/blog/blazor-on-netlify-with-environment-variables/">
            on one of Chris's blog posts.
          </a>
        </Text>
        <Link underline="always" href="/signup">
          Join the CodeVideo community.
        </Link>
      </Flex>
    </Container>
  );
}
