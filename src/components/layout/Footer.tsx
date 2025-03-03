import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import * as React from "react";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export function Footer() {
  const isDesktop = useIsDesktop();
  return (
    <Card>
      <Flex m="3" direction="row" align="center" wrap="wrap" justify="center">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
        <Link href="https://fullstackcraft.com" target="_blank"> Full Stack Craft</Link>
        <Text size="1" ml="auto" mt={isDesktop ? "0" : "2"} color="gray" align="center"><i>"Any sufficiently advanced technology is indistinguishable from magic."</i></Text>
      </Flex>
    </Card>
  );
}
