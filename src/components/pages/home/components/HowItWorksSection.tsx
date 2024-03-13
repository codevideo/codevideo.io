import * as React from "react";
import { Box, Card, Code, Flex, Grid, Heading, Link, Text } from "@radix-ui/themes";

export interface IHowItWorksSectionProps {}

const howItWorksConfig = [
  {
    
    description: "1. We take your code snippet and put it on a canvas.",
  },
  {
    
    description:
      "2. A simulation is made of typing your code, and we stream the canvas the whole time.",
  },
  {
    
    description:
      "3. In the case of the frontend engine, a WebAssembly port of ffmpeg is used to capture the stream. (Less performant, but more cool.)",
  },
  {
    
    description:
      "4. In the case of the backend engine, a Node.js with a subprocess call to ffmpeg is used to capture the stream. (More performant, but less cool.)",
  },
  {
    
    description: "5. The captured stream is converted to an mp4. The mp4 is downloadable from your browser.",
  }
  
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
        md: "9",
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
              return <Text size="5" my="3">{item.description}</Text>;
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
            Every part of the CodeVideo ecosystem is open source and is distributed across a variety of repositories:
            <ul>
            <li><Box my="3"><Link href="https://github.com/codevideo/codevideo-ai"><Code>codevideo-ai</Code></Link> - The ai-assisted code video creation tool</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/codevideo-desktop"><Code>codevideo-desktop</Code></Link> - The Electron powered desktop app for creating automated videos</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/codevideo-frontend"><Code>codevideo-frontend</Code></Link> - The simple WASM based frontend engine that you see working on this page</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/codevideo-backend"><Code>codevideo-backend</Code></Link> - The Node.js based backend engine that will (soon) be working on this page</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/virtual-code-block"><Code>virtual-code-block</Code></Link> - TypeScript class that simulates a code editor environment</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/speech-shield"><Code>speech-shield</Code></Link> - Evaluates the quality and accuracy of text-to-speech AI-generated audio</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/syntax-spy"><Code>syntax-spy</Code></Link> - Simultaneously detect and syntax check any code snippet with ease</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/pontificator"><Code>pontificator</Code></Link> - Generate studio quality dictated audio files from books articles, and blog posts</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/typoer"><Code>typoer</Code></Link> - Generate human-like typos for a given text</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/robotts"><Code>robotts</Code></Link> - Node.js desktop automation for 2024.</Box></li>
            <li><Box my="3"><Link href="https://github.com/codevideo/codevideo.io"><Code>codevideo.io</Code></Link> - This website 😄</Box></li>
            </ul>
          </Text>
        </Card>
      </Flex>
    </Grid>
  );
}
