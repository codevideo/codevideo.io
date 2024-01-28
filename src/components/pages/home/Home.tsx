import * as React from "react";
import { EditorWidget } from "../../shared/EditorWidget";
import { HiddenCanvas } from "../../shared/HiddenCanvas";
import { Hero } from "./components/Hero";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { Box, Container, Flex, Grid } from "@radix-ui/themes";

export function Home() {
  return (
    <>
      <Grid columns={
        {
          initial:"1",
          md: "2",
        }
      }>
        <Box>
          <Hero />
        </Box>
        <Box width="auto">
          <EditorWidget />
        </Box>
      </Grid>
      <Container py="9">
        <HowItWorksSection />
        <HiddenCanvas />
      </Container>
    </>
  );
}
