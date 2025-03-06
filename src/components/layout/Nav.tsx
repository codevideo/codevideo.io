import { Box, Button, Card, Container, Flex, Heading, Link } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../shared/Logo";
import { ThemeToggle } from "./ThemeToggle";
import mixpanel from "mixpanel-browser";

export function Nav() {
  return (
    <Box position="fixed" left="0" right="0" style={{ zIndex: 10000000000, backdropFilter: 'blur(8px)' }} className="z-40" mx="3">
      <Card>
        <Container size="4">
          <Flex py="4" justify="between" align="center">
            <Heading size="4" style={{cursor: 'default'}}><Logo />CodeVideo</Heading>
            <Flex display={{ initial: 'none', md: 'flex' }} gap="6">
              <Link href="/#features">Features</Link>
              <Link href="/#benefits">Benefits</Link>
              <Link href="/#how-it-works">How it Works</Link>
              <Link href="/#integrations">Integrations</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="https://github.com/orgs/codevideo/repositories" target="_blank">GitHub</Link>
            </Flex>
            <Flex gap="4" align="center">
              <Box display={{ initial: 'none', sm: 'block' }}>
                <Link href="https://studio.codevideo.io/pdf/CodeVideo_Framework_White_Paper.pdf" target="_blank" onClick={() => mixpanel.track("Read White Paper Clicked Homepage")}>
                  <Button color="gray" style={{cursor: 'pointer'}}>Read White Paper</Button>
                </Link>
              </Box>
              <Link href="https://studio.codevideo.io" target="_blank" onClick={() => mixpanel.track("Get Started Free Clicked Homepage")}>
                <Button style={{cursor: 'pointer'}}>Get Started Free</Button>
              </Link>
              <ThemeToggle/>
            </Flex>
          </Flex>
        </Container>
      </Card>
    </Box>
  );
}
