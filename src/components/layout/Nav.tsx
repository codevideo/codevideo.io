import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Card, Code, Flex, Link } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../shared/Logo";

export function Nav() {
  return (
    <Card>
      <Flex gap="5" p="3" justify="start">
        <Link href="/">
          <Flex gap="3" justify="center" align="center">
            <HomeIcon />
            <Code>{"<"}- home</Code>
          </Flex>
        </Link>
        <Link mr="auto" href="/ai">
          <Code>
            <Logo />
            codevideo-ai
          </Code>
        </Link>
        <Link mr="auto" href="/pontificator">
          <Code>
            <Logo />
            pontificator
          </Code>
        </Link>
        <Link mr="auto" href="/speech-shield">
          <Code>
            <Logo />
            speech-shield
          </Code>
        </Link>
        <Link mr="auto" href="/robotts">
          <Code>
            <Logo />
            robotts
          </Code>
        </Link>
        <Link href="https://github.com/codevideo/codevideo-frontend">
          <Flex gap="3" justify="center" align="center">
            <Code>
              <Logo />
              give us a star on GitHub! -{">"}
            </Code>
            <GitHubLogoIcon />
          </Flex>
        </Link>
      </Flex>
    </Card>
  );
}
