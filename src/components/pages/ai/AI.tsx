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
        <video width="960" height="540" controls>
        <source src="https://codevideo.io/videos/fibonacci.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
          </video>
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
