import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, Code, Container, Flex, Heading, Link } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../shared/Logo";
import { ThemeToggle } from "./ThemeToggle";

export interface INavProps {
  onToggleTheme: (theme: "dark" | "light"
  ) => void;
}

export function Nav(props: INavProps) {
  const { onToggleTheme } = props;
  return (
    <Box position="fixed" left="0" right="0" style={{ zIndex: 10000, backdropFilter: 'blur(8px)' }} className="z-40" mx="3">
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
                <Link href="https://studio.codevideo.io/pdf/CodeVideo_Framework_White_Paper.pdf" target="_blank" >
                  <Button color="gray" style={{cursor: 'pointer'}}>Read White Paper</Button>
                </Link>
              </Box>
              <Link href="https://studio.codevideo.io" target="_blank">
                <Button style={{cursor: 'pointer'}}>Get Started Free</Button>
              </Link>
              <ThemeToggle onToggleTheme={onToggleTheme}/>
            </Flex>
          </Flex>
        </Container>
      </Card>
    </Box>
  );
}
