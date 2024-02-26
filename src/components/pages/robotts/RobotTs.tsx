import { Code, Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { Logo } from "../../shared/Logo";
import { StarOnGitHub } from "../../shared/StarOnGithub";

export function RobotTs() {
  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">
          <Code>
            <Logo />
            robotts
          </Code>
        </Heading>
        <Heading size="7">
          Building on the success of <Code>robotjs</Code> with additional advanced features and bug fixes used in <Code>codevideo-ai</Code>.
        </Heading>
        <Text>
          <Code>robotjs</Code> is a native Node.js automation package that allows you to control the mouse, keyboard, and read the screen. We've forked the package to <Code>robotts</Code> and improved it, adding new features and bug fixes.
        </Text>
        <StarOnGitHub repoName="robotts" repoLink="https://github.com/codevideo/robotts"/>
        <Link underline="always" href="/signup">
          Join the CodeVideo Community.
        </Link>
      </Flex>
    </Container>
  );
}
