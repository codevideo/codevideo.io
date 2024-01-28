import { GitHubLogoIcon, HomeIcon } from "@radix-ui/react-icons";
import { Card, Code, Flex, Link } from "@radix-ui/themes";
import * as React from "react";

export interface INavProps {
  siteTitle: string;
}

export function Nav(props: INavProps) {
  const { siteTitle } = props;
  return (
    <Card>
      <Flex gap="5" p="3" justify="center">
        <Link href="/">
          <HomeIcon />
        </Link>
        <Link mr="auto" href="/ai">
          Coming Soon: {"/> "}
          {siteTitle} AI™
        </Link>
        <Link href="https://github.com/codevideo/codevideo-frontend">
          <Flex gap="3" justify="center" align="center">
          <Code>give us a star -{'>'}</Code>
          <GitHubLogoIcon />
          </Flex>
        </Link>
      </Flex>
    </Card>
  );
}
