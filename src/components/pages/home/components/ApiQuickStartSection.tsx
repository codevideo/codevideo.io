import * as React from "react";
import { useState } from "react";
import { Box, Button, Card, Code, Container, Flex, Grid, Heading, Link, Section, Text } from "@radix-ui/themes";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import mixpanel from "mixpanel-browser";

// Same wording and example as docs.codevideo.io (docs/quick-start.md) and
// studio.codevideo.io (src/components/pages/account/components/ApiQuickStart.tsx).
// Keep the three in sync.
const curlExample = `export CODEVIDEO_API_KEY="cvk_your_key_here"

curl -X POST https://api.codevideo.io/create-video-v3 \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $CODEVIDEO_API_KEY" \\
  -d '{
    "project": [
      { "name": "author-speak-before", "value": "Here is how to log a value in JavaScript." },
      { "name": "file-explorer-create-file", "value": "index.js" },
      { "name": "file-explorer-open-file", "value": "index.js" },
      { "name": "editor-type", "value": "console.log(1 + 1);" },
      { "name": "author-speak-before", "value": "Run it and you will see 2 in the console." }
    ]
  }'`;

const quickStartSteps = [
  {
    title: "Get an API key",
    description: <>In <Link color="mint" href="https://studio.codevideo.io/account" target="_blank" rel="noopener">CodeVideo Studio</Link>, open Account → API Access and generate a key. Copy it right away; it's shown once. New accounts get 50 free tokens, and each video costs 10.</>,
  },
  {
    title: "Send your actions",
    description: <>POST them to <Code>https://api.codevideo.io/create-video-v3</Code> with your key in the <Code>x-api-key</Code> header.</>,
  },
  {
    title: "Get your video",
    description: "The API replies once the job is queued, and we email you a link to the MP4 when rendering finishes.",
  },
];

export function ApiQuickStartSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlExample);
    } catch (e) {
      console.error("Error copying the API example:", e);
      return;
    }
    mixpanel.track("API Quick Start Copied Homepage");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hidden link for scroll */}
      <span id="api" style={{
        display: 'block',
        height: '60px',
        marginTop: '-60px',
        visibility: 'hidden',
        pointerEvents: 'none'
      }}></span>

      {/* API Quick Start Section */}
      <Section size="3">
        <Container>
          <Heading size="8" align="center" mb="4">API Quick Start</Heading>
          <Text as="p" size="4" color="gray" align="center" mb="8">
            Turn a JSON list of actions into a narrated coding video with one request.
          </Text>

          <Grid columns={{ initial: "1", md: "3" }} gap="4" mb="5">
            {quickStartSteps.map((step, index) => (
              <Card key={step.title}>
                <Flex direction="column" gap="2" p="2">
                  <Flex gap="2" align="center">
                    <Box
                      style={{
                        width: '28px',
                        height: '28px',
                        flexShrink: 0,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'var(--mint-9)',
                        color: 'var(--mint-9-contrast)'
                      }}
                    >
                      <Text size="2" weight="bold">{index + 1}</Text>
                    </Box>
                    <Heading size="4">{step.title}</Heading>
                  </Flex>
                  <Text color="gray">{step.description}</Text>
                </Flex>
              </Card>
            ))}
          </Grid>

          {/* The background sits on this Box: action-badges.css strips it from every pre and code */}
          <Box
            mb="3"
            style={{
              position: 'relative',
              background: 'var(--gray-a3)',
              border: '1px solid var(--gray-a5)',
              borderRadius: 'var(--radius-4)'
            }}
          >
            <Button
              size="1"
              variant="soft"
              onClick={handleCopy}
              style={{ position: 'absolute', top: 'var(--space-2)', right: 'var(--space-2)', cursor: 'pointer' }}
            >
              {copied ? <CheckIcon /> : <CopyIcon />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <pre
              style={{
                margin: 0,
                padding: 'var(--space-4)',
                overflowX: 'auto',
                fontFamily: 'var(--code-font-family)',
                fontSize: 'var(--font-size-2)',
                lineHeight: 1.6
              }}
            >
              <code>{curlExample}</code>
            </pre>
          </Box>
          <Text as="p" size="2" color="gray" mb="6">
            Response: <Code>{'{"message":"Video generation enqueued successfully"}'}</Code>
          </Text>

          <Flex gap="3" justify="center" wrap="wrap">
            <Link href="https://studio.codevideo.io/account" target="_blank" rel="noopener" onClick={() => mixpanel.track("Get API Key Clicked Homepage")}>
              <Button color="amber" size="3" style={{ cursor: 'pointer' }}>Get an API key</Button>
            </Link>
            <Link href="https://docs.codevideo.io" target="_blank" rel="noopener" onClick={() => mixpanel.track("API Docs Clicked Homepage")}>
              <Button size="3" variant="soft" style={{ cursor: 'pointer' }}>Read the full docs</Button>
            </Link>
            <Link href="/actions" onClick={() => mixpanel.track("Browse Actions Clicked Homepage")}>
              <Button size="3" variant="soft" color="gray" style={{ cursor: 'pointer' }}>Browse all 133 actions</Button>
            </Link>
          </Flex>
        </Container>
      </Section>
    </>
  );
}
