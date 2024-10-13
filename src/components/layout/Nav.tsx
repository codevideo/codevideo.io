import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Box, Card, Code, Flex, Link } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../shared/Logo";

export function Nav() {
  return (
    <Card>
      <Flex gap="5" p="3" justify="start">
        <Link href="/">
          <Flex gap="3" justify="center" align="center">
            <Box mt="1">
              <HomeIcon />
            </Box>
          </Flex>
        </Link>
        <Link href="/ai">
          <Code>
            <Logo />
            codevideo-ai
          </Code>
        </Link>
        <Link href="/pontificator">
          <Code>
            <Logo />
            pontificator
          </Code>
        </Link>
        <Link href="/speech-shield">
          <Code>
            <Logo />
            speech-shield
          </Code>
        </Link>
        <Link ml="auto" href="https://github.com/orgs/codevideo/repositories">
          <Box mt="1">
            <GitHubLogoIcon />
          </Box>
        </Link>
      </Flex>
    </Card>
  );
}
