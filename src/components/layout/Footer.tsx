import { Card, Flex, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export function Footer() {
  const isDesktop = useIsDesktop();
  return (
    <Card>
      <Flex m="3" direction="row" align="center" wrap={isDesktop ? "nowrap" : "wrap"}>
        {/* Left section */}
        <Flex 
          grow="1" 
          shrink="0" 
          align="center"
          justify={isDesktop ? "start" : "center"}
          width={isDesktop ? "auto" : "100%"}
          mb={isDesktop ? "0" : "2"}
        >
          <Text align={isDesktop ? "left" : "center"}>
            © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
            <Link href="https://fullstackcraft.com" target="_blank">Full Stack Craft</Link>
          </Text>
        </Flex>

        {/* Center section - only visible on desktop */}
        {isDesktop && (
          <Flex grow="1" shrink="0" justify="center" align="center">
            <Link mx="2" href="https://studio.codevideo.io" target="_blank">Studio</Link>
            <Link mx="2" href="https://github.com/codevideo" target="_blank">GitHub</Link>
            <Link mx="2" href="https://codevideo.substack.com" target="_blank">Substack</Link>
            <Link mx="2" href="https://medium.com/codevideo" target="_blank">Medium</Link>
            <Link mx="2" href="/blog">Blog</Link>
            <Link mx="2" href="/guides">Guides</Link>
            <Link mx="2" href="/features">Features</Link>
            <Link mx="2" href="/multilingual">Multilingual</Link>
            <Link mx="2" href="/actions">Actions</Link>
            <Link mx="2" href="/glossary">Glossary</Link>
          </Flex>
        )}

        {/* Mobile links section */}
        {!isDesktop && (
          <Flex 
            width="100%" 
            justify="center" 
            align="center" 
            wrap="wrap" 
            gap="3"
            mb="2"
          >
            <Link href="https://studio.codevideo.io" target="_blank">Studio</Link>
            <Link href="https://github.com/codevideo" target="_blank">GitHub</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/features">Features</Link>
            <Link href="/multilingual">Multilingual</Link>
            <Link href="/actions">Actions</Link>
            <Link href="/glossary">Glossary</Link>
          </Flex>
        )}

        {/* Right section */}
        <Flex 
          grow="1" 
          shrink="0" 
          justify={isDesktop ? "end" : "center"} 
          align="center"
          width={isDesktop ? "auto" : "100%"}
          mt={isDesktop ? "0" : "2"}
        >
          <Text size="1" color="gray" align="center" style={{ maxWidth: "100%", wordWrap: "break-word" }}>
            <i>"Any sufficiently advanced technology is indistinguishable from magic."</i>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}