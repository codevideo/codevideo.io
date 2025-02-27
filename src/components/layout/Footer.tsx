import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import * as React from "react";

export function Footer() {
  return (
    <Card>
      <Flex m="3" direction="row" align="center">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
        <Link href="https://fullstackcraft.com" target="_blank"> Full Stack Craft</Link>
        <Text size="1" ml="auto" color="gray"><i>"Any sufficiently advanced technology is indistinguishable from magic."</i></Text>
      </Flex>
    </Card>
  );
}
