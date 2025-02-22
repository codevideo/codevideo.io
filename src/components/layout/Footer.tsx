import { Box, Card, Flex, Link } from "@radix-ui/themes";
import * as React from "react";

export function Footer() {
  return (
    <Card>
      <Flex m="3">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
        <Link href="https://fullstackcraft.com"> Full Stack Craft</Link>
      </Flex>
    </Card>
  );
}
