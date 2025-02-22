import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Code, Container, Flex, Heading, Link } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../shared/Logo";

export function Nav() {
  return (
    <Box position="fixed" left="0" right="0" style={{ zIndex: 10000, backdropFilter: 'blur(8px)' }} className="z-40" mx="3">
      <Card>
        <Container size="4">
          <Flex py="4" justify="between" align="center">
            <Heading size="4"><Logo/>CodeVideo</Heading>
            <Flex display={{ initial: 'none', md: 'flex' }} gap="6">
              <Link href="/#features">Features</Link>
              <Link href="/#benefits">Benefits</Link>
              <Link href="/#how-it-works">How it Works</Link>
              <Link href="/#integrations">Integrations</Link>
              <Link href="/#pricing">Pricing</Link>
            </Flex>
            <Flex gap="4">
            <Box display={{ initial: 'none', sm: 'block' }}>
              <Button color="gray">Read Whitepaper</Button>
              </Box>
              <Button>Get Started Free</Button>
            </Flex>
          </Flex>
        </Container>
      </Card>
    </Box>
  );
}
