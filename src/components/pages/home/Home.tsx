import * as React from "react";
import { EditorWidgetHomePage } from "../../shared/EditorWidgetHomePage";
import { HiddenCanvas } from "../../shared/HiddenCanvas";
import { ArrowRightIcon, CodeIcon, UploadIcon, VideoIcon, MagicWandIcon, Share2Icon, LaptopIcon, TimerIcon, CheckCircledIcon, LightningBoltIcon, GearIcon, FileIcon, } from "@radix-ui/react-icons";
import { Box, Button, Card, Container, Flex, Grid, Heading, Link, Section, Text } from "@radix-ui/themes";
import { CodecademyLogo, UdemyLogo, YouTubeLogo } from "./components/Logos";
import { PricingSection } from "./components/PricingSection";
import mixpanel from "mixpanel-browser";

export function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Section size="3" mt="9" pt="9">
        <Container>
          <Flex direction="column" align="center" justify="center" gap="4">
            <Box
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'var(--radius-4)',
                padding: 'var(--space-2) var(--space-4)'
              }}>
              <Flex>
                <Text size="2" align="center" weight="bold">🚀 Create professional educational content 1000x faster. (Seriously - read our white paper!)</Text>
              </Flex>
            </Box>
            <Heading size="9" align="center">
              Create Educational Software Content in{" "}
              <Text color="mint">Minutes</Text>, Not Hours
            </Heading>
            <Text size="4" color="gray" align="center" style={{ maxWidth: '700px' }}>
              Stop wasting time with video retakes and editing. Our deterministic recording system ensures perfect tutorials every time. Export your course to video, markdown, PDF, web, and more in literal seconds.
            </Text>
            <Flex gap="4" wrap="wrap" align="center" justify="center">
              <Link href="https://studio.codevideo.io" target="_blank" >
                <Button size="4" style={{ cursor: 'pointer' }} onClick={() => mixpanel.track("Get Started Free Clicked Homepage")}>
                  Start Creating Free
                  <ArrowRightIcon />
                </Button>
              </Link>
              <Link href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank">
                <Button size="4" variant="soft" style={{ cursor: 'pointer' }} onClick={() => mixpanel.track("Watch Demo Clicked Homepage")}>
                  Watch Demo
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Container>
      </Section>

      {/* Social Proof */}
      <Section py="6">
        <Container>
          <Flex direction="column" align="center">
            <Text size="2" align="center" style={{ color: 'var(--gray-8)' }} mb="6">TRUSTED BY LEADING EDUCATORS AND COMPANIES</Text>
          </Flex>
          <Flex wrap="wrap" justify="center" align="center" gap="8" style={{ opacity: 0.7 }}>
            <Box style={{ color: 'var(--gray-8)' }}>
              <UdemyLogo />
            </Box>
            <Box style={{ color: 'var(--gray-8)' }}>
              <YouTubeLogo />
            </Box>
            <Box style={{ color: 'var(--gray-8)' }}>
              <CodecademyLogo />
            </Box>
          </Flex>
        </Container>
      </Section>


      {/* Interactive Preview */}
      <Section size="3">
        <Container>
          <EditorWidgetHomePage />
          <Flex direction="column" align="center" justify="center" gap="4" mt="4">
            <Box
              style={{
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 'var(--radius-4)',
                padding: 'var(--space-2) var(--space-4)'
              }}>
                <Flex>
              <Text align="center" size="2" weight="bold">👆 The editor in <Link href="https://studio.codevideo.io" target="_blank">CodeVideo Studio</Link> is far more powerful than this example and supports file explorer, terminal, and even mouse actions.</Text>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Section>

      {/* Key Stats */}
      <Section>
        <Container>
          <Grid columns="3" gap="8">
            <Flex direction="column" align="center">
              <Heading size="8" color="mint" mb="2">1000x</Heading>
              <Text color="gray" align="center">Faster Content Creation</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Heading size="8" color="mint" mb="2">100%</Heading>
              <Text color="gray" align="center">Reduction in Retakes</Text>
            </Flex>
            <Flex direction="column" align="center">
              <Heading size="8" color="mint" mb="2">2k+</Heading>
              <Text color="gray" align="center">Tutorials Created</Text>
            </Flex>
          </Grid>
        </Container>
      </Section>

      {/* Hidden link for scroll */}
      <span id="benefits" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* Benefits */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="8">Why Creators Love Us</Heading>
          <Grid columns={{ initial: "1", md: "2" }} gap="6">
            {benefits.map(benefit => (
              <Card key={benefit.title}>
                <Flex direction="column" gap="3" p="4">
                  {<benefit.icon width="24" height="24" />}
                  <Heading size="4">{benefit.title}</Heading>
                  <Text color="gray">{benefit.description}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Hidden link for scroll */}
      <span id="features" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* Features */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="8">Key Features</Heading>
          <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="6">
            {features.map(feature => (
              <Card key={feature.title}>
                <Flex direction="column" gap="3" p="4">
                  {<feature.icon width="24" height="24" />}
                  <Heading size="4">{feature.title}</Heading>
                  <Text color="gray">{feature.description}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Hidden link for scroll */}
      <span id="how-it-works" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* How It Works */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="8">How It Works</Heading>
          <Grid columns={{ initial: "1", md: "3" }} gap="8">
            {steps.map((step, index) => (
              <Flex key={step.title} direction="column" align="center" gap="3">
                <Box
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--mint-11)'
                  }}
                >
                  <Text size="5" weight="bold" color="gray">{index + 1}</Text>
                </Box>
                <Heading size="4">{step.title}</Heading>
                <Text align="center" color="gray">{step.description}</Text>
              </Flex>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Hidden link for scroll */}
      <span id="integrations" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* Integrations Section */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="8">Seamless Integrations</Heading>
          <Grid
            columns={{ initial: "1", sm: "2" }}
            gap="6">
            {integrations.map(integration => (
              <Card key={integration.title}>
                <Flex direction="column" gap="3" p="4">
                  {<integration.icon width="24" height="24" />}
                  <Heading size="4">{integration.title}</Heading>
                  <Text color="gray">{integration.description}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Hidden link for scroll */}
      <span id="pricing" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* Pricing Section */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="8">Simple, Token-Based Pricing</Heading>
          <Flex direction="column" align="center" gap="4">
            <Text size="4" color="gray" align="center" mb="8">
              Purchase tokens and use them for any type of export. The more intensive the output, the more tokens required.
            </Text>
          </Flex>

          <PricingSection />

          <Flex direction="column" align="center" gap="4">
            <Text size="4" weight="bold" align="center" my="8">
              Need a custom pricing solution with custom export options or formats? We're happy to help - <Link color="mint" href="mailto:hi@fullstackcraft.com">contact us!
              </Link>
            </Text>
          </Flex>

          <Box>
            <Heading size="4" align="center" mb="4">Token Usage Per Export</Heading>
            <Grid columns={{ initial: "1", sm: "2", md: "3" }} gap="6" width="100%">
              {tokenCosts.map(cost => (
                <Card key={cost.format}>
                  <Flex direction="column" align="center" gap="2" p="4">
                    <Text weight="bold">{cost.format}</Text>
                    <Text color="mint" size="6" weight="bold">{cost.tokens}</Text>
                    <Text size="2" color="gray">token{cost.tokens === "1" ? '' : 's'} per export</Text>
                  </Flex>
                </Card>
              ))}
            </Grid>
          </Box>
        </Container>
      </Section>

      {/* Hidden canvas for the video recorder */}
      <HiddenCanvas />
    </Box>
  );
}

const benefits = [
  {
    title: "Save Hours of Time",
    description: "Create once, generate multiple formats. No more endless retakes or tedious manual video editing.",
    icon: TimerIcon,
  },
  {
    title: "Guaranteed Accuracy",
    description: "Every step is captured. No more mistakes or missing steps in your tutorials.",
    icon: CheckCircledIcon,
  },
  {
    title: "Instant Multi-Format Export",
    description: "Generate videos, blog posts, and entire web pages with one click.",
    icon: LightningBoltIcon,
  },
  {
    title: "AI-Powered Insights",
    description: "Get smart suggestions for improvements and optimal tutorial structure.",
    icon: GearIcon,
  },
];

const features = [
  {
    title: "Multi-Format Export",
    description: "Convert actions into video, blog posts, or PDFs with one click.",
    icon: FileIcon,
  },
  {
    title: "Event Sourced",
    description: "Create every action in a fully deterministic timeline. No more missed steps.",
    icon: CodeIcon,
  },
  {
    title: "Instant Replays",
    description: "Scrub through your coding session like a video timeline—jump back and forth.",
    icon: VideoIcon,
  },
  {
    title: "Deterministic Accuracy",
    description: "Every step is guaranteed correct. No need to ever re-record.",
    icon: MagicWandIcon,
  },
  {
    title: "Collaborative Editing",
    description: "Invite students or team members to review or learn from tutorials in real-time.",
    icon: Share2Icon,
  },
  {
    title: "Easy Integration",
    description: "Works directly on the web with any browser of your choice.",
    icon: LaptopIcon,
  },
];

const steps = [
  {
    title: "Create",
    description: <>Start building your course step by step in the  <Link color="mint" href="https://studio.codevideo.io" target="_blank">CodeVideo Studio</Link>.</>,
  },
  {
    title: "Edit Actions",
    description: "Need to fix a mistake? Add something you forgot? Edit, insert, or remove actions in the timeline instantly.",
  },
  {
    title: "Export, Share, and Sell",
    description: "Generate a polished video, PDF, or website showcasing your course or lesson. Any content you create belongs 100% to you.",
  },
];

const integrations = [
  {
    title: "Custom API",
    description: <>Build custom integrations with the <Link color="mint" href="https://api.codevideo.io/swagger" target="_blank">CodeVideo API</Link>. Send the actions in JSON format and get a link to an mp4, markdown, html, or any other export formats of your content.</>,
    icon: MagicWandIcon,
  },
  {
    title: "Team Collaboration",
    description: <>Share your account in the  <Link color="mint" href="https://studio.codevideo.io" target="_blank">CodeVideo Studio</Link> with as many collaborators as you'd like - create multiple versions and styles of a course or lesson as you'd like.</>,
    icon: Share2Icon,
  },
  {
    title: "Frontend Framework Integration",
    description: "Go beyond raw HTML and export your tutorial or course directly to popular frontend frameworks like React, Angular, and Vue.",
    icon: LaptopIcon,
  },
  {
    title: "Cloud Integration",
    description: "Integrate your AWS bucket or server for uploads or let us spool up a dedicated server for resource-intensive exports like video generation.",
    icon: UploadIcon,
  },
];

const tokenCosts = [
  {
    format: "Markdown",
    tokens: "1"
  },
  {
    format: "HTML",
    tokens: "2"
  },
  {
    format: "React",
    tokens: "3"
  },
  {
    format: "PDF",
    tokens: "5"
  },
  {
    format: "PPTX",
    tokens: "5"
  },
  {
    format: "Video",
    tokens: "10"
  }
]