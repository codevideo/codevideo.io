import * as React from "react";
import { Box, Card, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";

export interface IHowItWorksSectionProps {}

const howItWorksConfig = [
  {
    emoji: "🤖",
    description: "1. We take your code snippet and put it on a canvas.",
  },
  {
    emoji: "⚙️",
    description:
      "2. A simulation is made of typing your code, and we stream the canvas the whole time.",
  },
  {
    emoji: "📹",
    description:
      "3. The captured stream is converted to an mp4. The mp4 is downloadable from your browser.",
  },
];

export function HowItWorksSection(props: IHowItWorksSectionProps) {
  return (
    <Grid
      columns={{
        initial: "1",
        md: "2",
      }}
      gap={{
        initial: "5",
        md: "1",
      }}
      width="auto"
    >
      <Flex direction="column" gap="1">
        <Card>
          <Heading size="7">How it Works</Heading>
        </Card>
        <Card>
          <Flex direction="column">
            {howItWorksConfig.map((item) => {
              return <Text size="5">{item.description}</Text>;
            })}
          </Flex>
        </Card>
      </Flex>
      <Flex direction="column" gap="1">
        <Card>
          <Heading size="7">We're 100% Open Source</Heading>
        </Card>
        <Card>
          <Text size="5">
            Both the backend (Docker container) and the frontend (JavaScript
            function) engines that power CodeVideo are open source and can be
            found on{" "}
            <Link
              href="https://github.com/codevideo"
              target="_blank"
              rel="noreferrer"
              type="button"
            >
              GitHub
            </Link>
            .
          </Text>
        </Card>
      </Flex>
    </Grid>
  );
}
