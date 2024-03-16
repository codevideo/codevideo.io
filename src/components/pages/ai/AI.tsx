import {
  Code,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from "@radix-ui/themes";
import * as React from "react";
import { ExampleVideo } from "./components/ExampleVideo";
import { Logo } from "../../shared/Logo";
import { SideBySideEditors } from "./components/SideBySideEditors";

export function AI() {
  const fibonacciCode = `[
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

  const consoleLogCode = `[
    {
      action: "move-mouse-to-center-of-screen",
      value: ""
    },
    {
      action: "speak-before",
      value: "Today, we're going to learn about how to use the console.log function in JavaScript."
    },
    {
      action: "speak-before",
      value: "I've already got a hello-world.js file prepared here - let's open it up."
    },
    {
      action: "click-vs-code-file-by-name",
      value: "hello-world.js"
    },
    {
      action: "move-mouse-upper-third-center",
      value: ""
    },
    {
      action: "click",
      value: ""
    },
    {
      action: "speak-before",
      value: "Now, to log things to your console, simply make a call to the console.log function, passing in the text you want to log."
    },
    {
      action: "type",
      value: "console.log('hello world!');"
    },
    {
      action: "speak-before",
      value: "And let's save this file..."
    },
    {
      action: "save-file",
      value: ""
    },
    {
      action: "speak-before",
      value: "Now we'll open up a terminal and run this file."
    },
    {
      action: "move-mouse-bottom-third-center",
      value: ""
    },
    {
      action: "click",
      value: ""
    },
    {
      action: "type",
      value: "node hello-world.js"
    },
    {
      action: "speak-before",
      value: "And of course we get the expected output - 'hello world!' printed to the console."
    },
    {
      action: "speak-before",
      value: "And that's about it! You now know how to log things to your console in JavaScript!"
    },

  ]`;


  return (
    <Container style={{ minHeight: "100vh" }}>
      <Flex gap="5" direction="column" justify="center" align="center">
        <Heading size="9"><Code><Logo/>codevideo-ai</Code></Heading>
        <Heading size="7">
          Generate step by step, dictated software lessons from articles, blog
          posts, or a prompt. 
        </Heading>
        <SideBySideEditors/>
        <Text>The following examples below are from <Link href="https://github.com/codevideo/codevideo-ai"><Code>codevideo-ai</Code></Link> which has no UI yet and is still in active development. These examples are 100% declarative - meaning you only need to define the steps, and the rest is 100% taken over by automation, using a combination of a cloned voice, screen capture, and GUI automation tools.</Text>
        <ExampleVideo
          jsonCode={fibonacciCode}
          title="Intermediate / Advanced Lesson: Fibonacci Function in TypeScript"
          videoPath="/videos/fibonacci.mp4"
        />
        <ExampleVideo
          jsonCode={consoleLogCode}
          title="Beginner's Lesson: Introduction to the console.log() Function in JavaScript"
          videoPath="/videos/consolelog.mov"
        />
        <Text>As a comparison to a real video with Chris, here's Chris on Full Stack Craft's YouTube talking about building cron jobs with Go:</Text>
        <ExampleVideo
          title="Go Applications - Lesson 7: Building the Cron Job"
          videoPath="https://www.youtube.com/embed/yUFotBOL52M?si=EMctAua5UUeRqSdf"
        />
        <Text>Those AI versions are <i>eerily close</i> to the real thing, eh? 😄</Text>
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
