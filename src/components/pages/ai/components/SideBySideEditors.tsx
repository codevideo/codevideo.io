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
import { IAction } from "@fullstackcraftllc/codevideo-types";
import {
  cSharpExampleSteps,
  goLangExampleSteps,
  javaScriptExampleSteps,
  pythonExampleSteps,
} from "../examples";
import { CodeCheckDialog } from "./CodeCheckDialog";
// import {
//   MimicTypos,
// } from "@fullstackcraftllc/codevideo-frontend";
import { HiddenCanvas } from "../../../shared/HiddenCanvas";
import { codeToVideo } from "../../../../utils/video/codeToVideo";
import MimicTypos from "../../../../enums/MimicTypos";
import Engine from "../../../../enums/Engine";
import { VirtualCodeBlock } from "@fullstackcraftllc/virtual-code-block";

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
  const [videoGenerating, setVideoGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // every time actions change, update the JSON string
  useEffect(() => {
    console.log("updating json");
    console.log(actions);
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

  const generateVideo = async () => {
    // clear videoUrl
    setVideoUrl("");
    setVideoGenerating(true);
    // define video parameters
    // const fps = 60;
    // const mimeType = "video/webm";
    // const codec = "codecs=vp9";

    // // get canvas and setup media recorder
    // const canvas = document.getElementById("code-canvas") as HTMLCanvasElement;

    // hacky way to determine file extension from language
    let fileExtension = "js";
    switch (language) {
      case "javascript":
        fileExtension = "js";
        break;
      case "python":
        fileExtension = "py";
        break;
      case "csharp":
        fileExtension = "cs";
        break;
      case "go":
        fileExtension = "go";
        break;
    }


    const virtualCodeBlock = new VirtualCodeBlock([])
    virtualCodeBlock.applyActions(actions)
    const code = virtualCodeBlock.getCode()
    await codeToVideo(
      1920,
      1080,
      `example.${fileExtension}`,
      code,
      ["#013E3B", "#57D5BA"],
      MimicTypos.NEVER,
      setVideoUrl,
      Engine.FRONTEND
    );
    setVideoGenerating(false);

    // // No error, so we can do something with videoUrl.

    // // In this example, create a video element, set its source, and append it to a container

    // // Create the video element
    // const video = document.createElement("video");

    // // Set the video's src attribute to the URL of a video file
    // video.src = videoUrl;

    // // Set other useful attributes
    // video.id = "video";
    // video.height = 960;
    // video.width = 540;
    // video.controls = true;

    // // Append the video element to the container div
    // const container = document.getElementById("container");
    // if (container) {
    //   container.appendChild(video);
    // }
    // setVideoUrl(videoUrl);
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
  };

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
          <Button onClick={() => setEditorActions(actions)}>Preview Video</Button>
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
          <Button onClick={() => setEditorActions(actions)}>Preview Video</Button>
          <Button disabled={!isRunning} onClick={reset} color="red">
            Stop / Reset
          </Button>
          <CodeCheckDialog actions={actions} />
        </Flex>
      </Flex>
      <Flex gap="5" direction="column" justify="center" align="center">
        <Heading color="mint">2. Preview Your Video</Heading>
        <SimpleEditor
          path="result/"
          actions={editorActions}
          language={language}
          tokenizerCode='console.log("hello world!");'
          focus={focusOnResultEditor}
        />
        <Flex gap="5" direction="row" justify="center" align="center">
        <Heading color="mint">3. Get Your Resulting Video!</Heading>
        </Flex>
        <Flex gap="5" direction="row" justify="center" align="center">
          <Button onClick={generateVideo} disabled={videoGenerating}>
            {videoGenerating ? "Generating..." : "Generate Video*"}
          </Button>
          <Button onClick={exportCaptionedFrames} disabled={true}>
            Export Frames (Coming Soon)
          </Button>
        </Flex>
        <Flex gap="5" direction="row" justify="center" align="center">
          <Text>
            *Unfortunately, the video won't have sound until we get our act
            together and finish the backend endpoint!
          </Text>
        </Flex>
        <Flex gap="5" direction="column" justify="center" align="center">
          <Text>{videoGenerating ?  "Generating..." : "Satisfied with your steps? Click 'Generate Video' to generate your video!"}</Text>
          {videoUrl !== "" && (
            <video
              crossOrigin="anonymous"
              src={videoUrl}
              controls
              style={{
                width: 960,
                height: 540,
              }}
            />
          )}
        </Flex>
      </Flex>
      <HiddenCanvas />
    </Flex>
  );
}
