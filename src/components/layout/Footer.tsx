import { Card, Flex, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export function Footer() {
  const isDesktop = useIsDesktop();
  return (
    <Card>
      <Flex m="3" direction="row" align="center" wrap={isDesktop ? "nowrap" : "wrap"}>
        {/* Left section */}
        <Flex grow="1" shrink="0" align="center">
          © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
          <Link href="https://fullstackcraft.com" target="_blank">Full Stack Craft</Link>
        </Flex>

        {/* Center section */}
        <Flex grow="1" shrink="0" justify="center" align="center" my={isDesktop ? "0" : "2"}>
          <Link href="https://studio.codevideo.io" target="_blank">CodeVideo Studio</Link>
          <Text mx="1">|</Text>
          <Link href="https://github.com/codevideo" target="_blank">GitHub</Link>
          <Text mx="1">|</Text>
          <Link href="https://codevideo.substack.com" target="_blank">Substack</Link>
          <Text mx="1">|</Text>
          <Link href="https://medium.com/codevideo" target="_blank">Medium</Link>
          <Text mx="1">|</Text>
          <Link href="/glossary">Glossary</Link>
        </Flex>

        {/* Right section */}
        <Flex grow="1" shrink="0" justify="end" align="center" mt={isDesktop ? "0" : "2"}>
          <Text size="1" color="gray" align="center"><i>"Any sufficiently advanced technology is indistinguishable from magic."</i></Text>
        </Flex>
      </Flex>
    </Card>
  );
}