import {
  Container,
  Flex,
  Heading,
  Link,
  Text,
  Code,
  Grid,
  Dialog,
  Button,
} from "@radix-ui/themes";
import * as React from "react";

export function AI() {
  const code = `[
    {
      "action": "speak-before",
      "value": "In this quick tutorial, we'll walk through the creation of a Fibonacci calculation function in TypeScript."
    },
    {
      "action": "type",
      "value": "// fibonacci.ts\n"
    },
    {
      "action": "speak-before",
      "value": "We'll just leave a comment hear to signify that this file is called fibonacci.ts."
    },
    {
      "action": "speak-before",
      "value": "Now, let's define the function signature. We want our function to calculate the nth Fibonacci number, so our function will take a single parameter 'n' of type 'number', which represents the position in the Fibonacci sequence, and also return a number."
    },
    {
      "action": "type",
      "value": "const fibonacci = (n: number): number => {\n\n}"
    },
    {
      "action": "speak-before",
      "value": "To help others understand our code, let's add a brief JS Doc comment explaining the purpose of the function and the meaning of the 'n' parameter."
    },
    {
      "name": "arrow-up",
      "value": "2"
    },
    {
      "action": "type",
      "value": "/**\n * Calculates the nth Fibonacci number.\n * @param n The position in the Fibonacci sequence.\n */\n"
    },
    {
      "action": "speak-before",
      "value": "Now, let's implement the Fibonacci logic inside our function."
    },
    {
      "action": "arrow-down",
      "value": "1"
    },
    {
      "action": "type",
      "value": "  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);"
    },
    {
      "action": "speak-before",
      "value": "This is a recursive implementation of the Fibonacci sequence. If 'n' is '0' or '1', we return 'n'. Otherwise, we recursively call the Fibonacci function for n minus 1 and n minus 2, then add them together."
    },
    {
      "action": "speak-before",
      "value": "Now, this function would work, but it's not very performant. We can use memoization to optimize the performance of our Fibonacci function."
    },
    {
      "action": "delete-line",
      "value": "1"
    },
    {
      "action": "arrow-up",
      "value": "1"
    },
    {
      "action": "left",
      "value": "1"
    },
    {
      "action": "type",
      "code": "  const memo: Record<number, number> = {};\n  if (n <= 1) return n;\n  if (memo[n]) return memo[n];\n  return memo[n] = fibonacci(n - 1) + fibonacci(n - 2);"
    },
    {
      "action": "speak-before",
      "value": "Here, we've introduced a 'memo' object to store previously calculated Fibonacci values. This reduces redundant calculations and improves the efficiency of our function. Great! We've successfully created a Fibonacci calculation function in TypeScript using a recursive approach with memoization. Until next time - cheers!"
    }
  ]`;

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="3" direction="column" justify="center" align="center">
        <Heading size="9">{"/>"} CodeVideo AI™</Heading>
        <Heading size="7">
          Generate step by step, dictated software lessons from articles, blog
          posts, or a prompt.
        </Heading>
        <Text color="mint">
          Check out this example of how to write a Fibonacci function in
          TypeScript:
        </Text>
        <video width="960" height="540" controls>
          <source src="/videos/fibonacci.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Dialog.Root>
          <Dialog.Trigger>
            <Button>Show JSON</Button>
          </Dialog.Trigger>
          <Dialog.Content style={{ maxWidth: 450 }}>
            <Dialog.Title>JSON Steps Behind Fibonacci Example</Dialog.Title>
            <Dialog.Description size="2" mb="4">
              These JSON steps are executed in CodeVideo's automation tool and are what produced
              the example video.
            </Dialog.Description>
            <Code>
              <pre
                style={{
                  wordWrap: "break-word",
                  overflowX: "auto",
                  whiteSpace: "pre-wrap",
                }}
              >
                {code}
              </pre>
            </Code>
          </Dialog.Content>
        </Dialog.Root>
        <Heading size="7" color="mint">
          Coming Q1 2024.
        </Heading>
        <Link underline="always" href="/signup">
          Join the wait list.
        </Link>
      </Flex>
    </Container>
  );
}
