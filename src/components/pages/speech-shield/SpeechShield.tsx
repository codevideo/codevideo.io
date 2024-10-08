import { Code, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../../shared/Logo";

export function SpeechShield() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">
          <Code>
            <Logo />
            speech-shield
          </Code>
        </Heading>
        <Heading size="7">
          Evaluate the quality and accuracy of text-to-speech generated audio. Regenerate when needed.
        </Heading>
        <Text>
          Using OpenAI's text-to-speech Whisper model and an implementation of
          the Levenshtein distance, <Code>speech-shield</Code> can evaluate the
          accuracy of text to speech snippets created.
        </Text>
        <Heading size="7" color="mint">
          Coming Q1 2025.
        </Heading>
        <Link underline="always" href="/signup">
          Join the CodeVideo Community.
        </Link>
      </Flex>
    </Container>
  );
}
