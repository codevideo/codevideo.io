import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import * as React from "react";

export function Hero() {
  return (
    <Flex gap="3" p="3" direction="column" justify="center" align="start">
      <Box><Heading size="9">Code in,</Heading></Box>
      <Box><Heading size="9" color="mint">Video out.</Heading></Box>
      <Box><Heading size="9">That simple.</Heading></Box>
      <Box><Heading size="7">
        Convert code snippets to videos with a single click, <Text color="mint">directly in the browser</Text>.
      </Heading></Box>
    </Flex>
  );
}
