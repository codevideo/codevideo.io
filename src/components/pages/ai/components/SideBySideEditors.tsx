import {
  Button,
  Code,
  Flex,
  Heading,
  RadioGroup,
  Select,
  Switch,
  Text,
} from "@radix-ui/themes";
import * as React from "react";
import { SimpleEditor } from "../../../shared/SimpleEditor";
import { useEffect, useState } from "react";
import { ActionEditor } from "../../../shared/ActionEditor";
import { IAction, convertActionsToCodeActions } from "@fullstackcraftllc/codevideo-types";
import {
  cSharpExampleSteps,
  goLangExampleSteps,
  javaScriptExampleSteps,
  pythonExampleSteps,
} from "../examples";
import { VirtualCodeBlock } from "@fullstackcraftllc/virtual-code-block";
import { CodeCheckDialog } from "./CodeCheckDialog";

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
  const [stepsJson, setStepsJson] = useState(javaScriptExampleSteps);
  const [actions, setActions] = useState<Array<IAction>>(
    JSON.parse(javaScriptExampleSteps)
  );
  const [editorActions, setEditorActions] = useState<Array<IAction>>([]);
  const [language, setLanguage] = useState("javascript");
  const [resultCode, setResultCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [editorMode, setEditorMode] = useState(true);
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [focusOnResultEditor, setFocusOnResultEditor] = useState(false);

  // every time actions change, update the JSON string
  useEffect(() => {
    console.log('updating json')
    console.log(actions)
    setStepsJson(JSON.stringify(actions, null, 2));
  }, [actions]);

  // every time stepsJson changes, update the actions
  useEffect(() => {
    setActions(JSON.parse(stepsJson));
  }, [stepsJson]);


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

  const exportCaptionedFrames = () => {
    // TBD
  };

  const handleExampleSelectChange = (e: string) => {
    switch (e) {
      case "javascript":
        setStepsJson(javaScriptExampleSteps);
        setActions(JSON.parse(javaScriptExampleSteps));
        setLanguage("javascript");
        break;
      case "python":
        setStepsJson(pythonExampleSteps);
        setActions(JSON.parse(pythonExampleSteps));
        setLanguage("python");
        break;
      case "csharp":
        setStepsJson(cSharpExampleSteps);
        setActions(JSON.parse(cSharpExampleSteps));
        setLanguage("csharp");
        break;
      case "go":
        setStepsJson(goLangExampleSteps);
        setActions(JSON.parse(goLangExampleSteps));
        setLanguage("go");
        break;
    }
  };

  const runActions = () => {
    clearResultCode();
    setEditorActions(actions);
    setIsRunning(true);

  }

  return (
    <Flex gap="5" direction="row" justify="center" align="start">
      <Flex gap="5" direction="column" justify="center" align="center">
        <Heading color="mint">
          1. Define your <Code>steps.json</Code> (Feel free to edit!)
        </Heading>
        <Flex gap="5" direction="row" justify="center" align="center">
          <Text>Select example:</Text>
          <Select.Root
            defaultValue="javascript"
            value={language}
            onValueChange={(e) => handleExampleSelectChange(e)}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="javascript">JavaScript</Select.Item>
                <Select.Item value="python">Python</Select.Item>
                <Select.Item value="csharp">C#</Select.Item>
                <Select.Item value="go">Go</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Flex>
        <RadioGroup.Root defaultValue="1">
          <Flex gap="2" direction="row">
            <Text as="label" size="2">
              <Flex gap="2">
                <RadioGroup.Item value="1" /> Declarative Mode (Define All Steps
                Before Running)
              </Flex>
            </Text>
            <Text as="label" size="2">
              <Flex gap="2">
                <RadioGroup.Item value="2" disabled={true} /> Interactive Mode
                (Build and refine steps as you write your lesson's code - coming
                soon)
              </Flex>
            </Text>
          </Flex>
        </RadioGroup.Root>
        <Flex gap="5" direction="row" justify="center" align="center">
          <Switch
            defaultChecked
            onCheckedChange={() => setEditorMode(!editorMode)}
          />
          <Text>{editorMode ? "Editor" : "JSON"} Mode</Text>
        </Flex>
        <Flex gap="5" direction="row" justify="center" align="center">
        <Button onClick={() => setEditorActions(actions)}>Run Steps</Button>
        <Button disabled={!isRunning} onClick={reset} color="red">
          Stop / Reset
        </Button>
        <CodeCheckDialog actions={actions} />
      </Flex>
        {editorMode ? (
          <ActionEditor actions={actions} setActions={setActions} />
        ) : (
          <SimpleEditor
            path="json/"
            value={stepsJson}
            actions={[]}
            language="json"
            tokenizerCode={tokenizerCode}
            onChangeCode={(code) => {
              if (code) {
                setStepsJson(code);
              }
            }}
            focus={false}
          />
        )}
        <Flex gap="5" direction="row" justify="center" align="center">
          <Button onClick={() => setEditorActions(actions)}>Run Steps</Button>
          <Button disabled={!isRunning} onClick={reset} color="red">
            Stop / Reset
          </Button>
          <CodeCheckDialog actions={actions} />
        </Flex>
      </Flex>
      <Flex gap="5" direction="column" justify="center" align="center">
        <Heading color="mint">2. Your Resulting Video!</Heading>
        <SimpleEditor
          path="result/"
          actions={editorActions}
          language={language}
          tokenizerCode='console.log("hello world!");'
          focus={focusOnResultEditor}
        />
        <Flex gap="5" direction="row" justify="center" align="center">
          <Button onClick={exportCaptionedFrames}>
            Export Captioned Frames
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
