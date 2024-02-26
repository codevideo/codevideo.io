import { Box, Card, Flex, Link } from "@radix-ui/themes";
import * as React from "react";

export function Footer() {
  return (
    <Card>
      <Flex py="3">
        © {new Date().getFullYear()} 👨‍💻 with ❤️ by&nbsp;
        <Link href="https://fullstackcraft.com"> Full Stack Craft</Link>
        <Box ml="auto">🎉 Proudly built as a part of the 2024 cohort of <Link href="https://backdropbuild.com/"> Backdrop Build</Link></Box>
      </Flex>
    </Card>
  );
}
