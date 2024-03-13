import { Button, Code, Flex, Grid, Heading } from "@radix-ui/themes";
import * as React from "react";
import { SimpleEditor } from "../../../shared/SimpleEditor";
import { useState } from "react";

const exampleSteps = `[
    {
      "name": "speak-before",
      "value": "Let's learn how to use the console.log function in JavaScript!"
    },
    {
      "name": "speak-before",
      "value": "First, to make it clear that this is a JavaScript file, I'll just put a comment here"
    },
    {
      "name": "type-editor",
      "value": "// index.js"
    },
    {
      "name": "enter",
      "value": "1"
    },
    {
      "name": "speak-before",
      "value": "For starters, let's just print 'Hello world!' to the console."
    },
    {
      "name": "type-editor",
      "value": "console.log('Hello, world!');"
    },
    {
      "name": "speak-before",
      "value": "and if I wanted to write the value of some variable to the console, I could do that like so:"
    },
    {
      "name": "backspace",
      "value": "29"
    },
    {
      "name": "type-editor",
      "value": "const myVariable = 5;"
    },
    {
      "name": "enter",
      "value": "1"
    },
    {
      "name": "type-editor",
      "value": "console.log(myVariable);"
    },
    {
      "name": "speak-before",
      "value": "Now, when I run this code, I would expect the value of 'myVariable' to be printed to the console. Something like:"
    },
    {
      "name": "enter",
      "value": "1"
    },
    {
      "name": "type-editor",
      "value": "// 5"
    },
    {
      "name": "speak-before",
      "value": "Console logging is simple, yet powerful and very useful!"
    }
]`;

const tokenizerCode = `[
    {
        "name": "speak-before",
        "value": "To represent that this file is 'index.js', I'll just put a comment here"
    },
    {
        "name": "type-editor",
        "value": "// index.js"
    }
]`;

export const speakText = (text: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const speechSynthesis = window.speechSynthesis;

    // Create a new SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(text);

    // Resolve the promise when speech is done
    utterance.onend = () => {
      resolve();
    };

    // Speak the text
    speechSynthesis.speak(utterance);
  });
};

export function SideBySideEditors() {
  const [stepsJson, setStepsJson] = useState(exampleSteps);
  const [resultCode, setResultCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const executeSteps = async () => {
    clearResultCode();
    setIsRunning(true);
    const steps = JSON.parse(stepsJson);
    for (var i = 0; i < steps.length; i++) {
      // TODO: doesn't work, some fancy react closure issue
      // const currentRunSteps = isRunning;
      // if (i !== 0 && !currentRunSteps) {
      //   break;
      // }
      const step = steps[i];
      if (step.name === "speak-before") {
        await speakText(step.value);
      }
      if (step.name === "type-editor") {
        // set result code but with small delays between each character so it looks like it's being typed
        // await each delay so we don't go on ahead until entire code for this step is done being typed
        const value = step.value;
        for (var j = 0; j < value.length; j++) {
          setResultCode((prev) => prev + value[j]);
          await new Promise((resolve) => setTimeout(resolve, 75));
        }
      }
      if (step.name === "backspace") {
        const value = step.value;
        for (var j = 0; j < value; j++) {
          setResultCode((prev) => prev.slice(0, -1));
          await new Promise((resolve) => setTimeout(resolve, 35));
        }
      }
      if (step.name === "enter") {
        setResultCode((prev) => prev + "\n");
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    setIsRunning(false);
  };

  // const stop = () => {
  //   setIsRunning(false);
  // };

  const reset = () => {
    // for now relatively hacky - just refresh the page
    window.location.reload();
  };

  const clearResultCode = () => {
    setResultCode("");
  };

  return (
    <Flex gap="5" direction="row" justify="center" align="start">
      <Flex gap="5" direction="column" justify="center" align="center">
      <Heading color="mint">1. Define your <Code>steps.json</Code> (Feel free to edit!)</Heading>
        <SimpleEditor
          path="json/"
          value={exampleSteps}
          language="json"
          tokenizerCode={tokenizerCode}
          onChangeCode={(code) => {
            if (code) {
              setStepsJson(code);
            }
          }}
        />
        <Flex gap="5" direction="row" justify="center" align="center">
          <Button onClick={executeSteps}>Run Steps</Button>
          <Button disabled={!isRunning} onClick={reset} color="red">
            Stop / Reset
          </Button>
        </Flex>
      </Flex>
      <Flex gap="5" direction="column" justify="center" align="center">
        <Heading color="mint">2. Your Resulting Video!</Heading>
      <SimpleEditor
        path="result/"
        value={resultCode}
        language="javascript"
        tokenizerCode='console.log("hello world!");'
      />
      </Flex>
    </Flex>
  );
}
