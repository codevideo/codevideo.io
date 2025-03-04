import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import mixpanel from "mixpanel-browser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useEffect, useRef, useState } from "react";
import { codeToVideo } from "../../utils/video/codeToVideo";
import { AdvancedVideoOptionsDialog } from "./AdvancedVideoOptionsDialog";
import { Badge, Box, Button, Card, Code, Flex, Heading, Text, Tooltip } from "@radix-ui/themes";
import { IAction, isAuthorAction } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownFromActions, generateHtmlFromActions, generatePdfFromActions, generateJsonFromActions } from '@fullstackcraftllc/codevideo-doc-gen';
import { VirtualEditor } from "@fullstackcraftllc/codevideo-virtual-editor";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { useIsDesktop } from "../../hooks/useIsDesktop";

// use local static files for vscode monaco editor
loader.config({ paths: { vs: "/vs" } });

export function EditorWidgetHomePage() {
  const { theme } = useAppSelector((state) => state.editor);
  const { width, height, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const isDesktop = useIsDesktop();
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  // actions just a const since the homepage example is a readonly example
  const actions: IAction[] = [
    {
      name: "author-speak-before",
      value: "Right now, we're just looking at a blank editor. We don't even have a file open yet! Let's begin by creating a TypeScript file for our 'areEqual' function."
    },
    {
      name: "file-explorer-create-file",
      value: "areEqual.ts"
    },
    {
      name: "file-explorer-open-file",
      value: "areEqual.ts"
    },
    // shim to get the editor to "activate" - but just an empty string
    {
      name: "editor-type",
      value: `// areEqual.ts
`
    },
    {
      name: "author-speak-before",
      value: "Let's first write a JS doc comment for our function:"
    },
    {
      name: "editor-type",
      value: `/**
* Compares two numbers for strict equality.
* 
* @param a - The first number to compare
* @param b - The second number to compare
* @returns True if the numbers are strictly equal, false otherwise
*/`
    },
    {
      name: "author-speak-before",
      value: "Now let's implement the actual function:"
    },
    {
      name: "editor-type",
      value: `
export const areEqual = (a: number, b: number): boolean => {
    return a === b;
}`
    },
    {
      name: "author-speak-before",
      value: "That should be all we need to do for this 'isEqual' function. I hope you enjoyed the lesson!"
    }
  ];

  // hints should be same length as actions, we show a hint for each action
  const hints = [
    "In the CodeVideo ecosystem, everything is controlled by 'actions'. Each 'action' is a simple name and value object and represents a change in the editor, file explorer, or author speaking.",
    "You can navigate through the actions using the 'Previous' and 'Next' buttons.",
    "There are author actions, file explorer actions, and editor actions, and more. As always, each action has a name and a value.",
    "Ah yes, the coveted 'editor-type' action. This is where the magic begins to happen. We're typing in the editor!",
    "Note that author actions are typical speak actions, and for the purposes of preview show up as captions. In video exports however, these are auto generated via text-to-speech models.",
    "Multiline editing is of course also supported.",
    "The editor is readonly in this example; we're working on a direct record that you can edit actions in-place.",
    "Code highlighting here is powered by Monaco Editor, the same editor that powers VS Code.",
    "We hope you enjoyed this example. Don't forget to check out all our export options below!"
  ]

  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [isGeneratingMarkdown, setIsGeneratingMarkdown] = useState(false);
  const [markdownGenerated, setMarkdownGenerated] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [isGeneratingHTML, setIsGeneratingHTML] = useState(false);
  const [htmlGenerated, setHtmlGenerated] = useState(false);
  const [isGeneratingJson, setIsGeneratingJson] = useState(false);
  const [jsonGenerated, setJsonGenerated] = useState(false);
  const [showAdvancedOptionsHint, setShowAdvancedOptionsHint] = useState(true);
  const abortController = new AbortController();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const handleOnMount = (
    _editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = _editor;

    monaco.editor.defineTheme("Monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        // Keywords and operators
        { token: 'keyword', foreground: 'F92672' },         // export, const, return
        { token: 'type', foreground: '66D9EF' },           // boolean, number, string
        { token: 'identifier', foreground: 'F8F8F2' },     // variable names
        { token: 'delimiter', foreground: 'F8F8F2' },      // brackets, parentheses
        { token: 'string', foreground: 'E6DB74' },         // string literals
        { token: 'number', foreground: 'AE81FF' },         // numeric literals
        { token: 'comment', foreground: '88846F' },        // comments

        // TypeScript specific
        { token: 'delimiter.parenthesis', foreground: 'F8F8F2' },
        { token: 'delimiter.bracket', foreground: 'F8F8F2' },
        { token: 'delimiter.array', foreground: 'F8F8F2' },
        { token: 'operator', foreground: 'F92672' },       // =>, ===
        { token: 'function', foreground: '66D9EF' },       // function names

        // JSDoc
        { token: 'comment.doc', foreground: '88846F' },
        { token: 'comment.doc.tag', foreground: '66D9EF' },
        { token: 'comment.doc.param', foreground: 'FD971F' },
      ],
      colors: {
        'editor.background': '#272822',
        'editor.foreground': '#F8F8F2',
        'editorLineNumber.foreground': '#88846F',
        'editor.selectionBackground': '#49483E',
        'editor.wordHighlightBackground': '#49483E',
      }
    });

    monaco.editor.setTheme("Monokai");

    // Configure TypeScript options
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.Latest,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      jsx: monaco.languages.typescript.JsxEmit.React,
    });

    // also run the tokenizer once because it doesn't work the first time
    // (this is a hacky solution - note that we need to access the window version of monaco
    // AND we need the timeout!!!! otherwise the tokenizer won't work at all!
    // IN OTHER WORDS DO NOT DELETE THIS BLOCK:
    if (typeof window !== "undefined") {
      setTimeout(() => {
        (window as any).monaco.editor.tokenize(
          `export const dummyFunction = () => {
        console.log('hello world')
      }`,
          "typescript"
        );
      }, 1000);
    }

    // Force tokenization refresh
    if (typeof window !== "undefined") {
      setTimeout(() => {
        _editor.trigger('source', 'editor.action.forceRetokenize', {});
      }, 100);
    }
  };

  const onClickGenerateVideo = async () => {
    setVideoGenerated(false);
    const virtualEditor = new VirtualEditor([])
    virtualEditor.applyActions(actions)
    const finalCodeForVideo = virtualEditor.getCode()
    mixpanel.track("Generate Video Homepage");
    setIsGeneratingVideo(true);

    await codeToVideo(
      width,
      height,
      "areEqual.ts",
      finalCodeForVideo,
      gradientColors,
      mimicTypos,
      setVideoUrl,
      engine
    );
    setIsGeneratingVideo(false);
    setVideoGenerated(true);
  };

  const onClickGenerateMarkdown = async () => {
    mixpanel.track("Generate Markdown Homepage");
    setMarkdownGenerated(false);
    setIsGeneratingMarkdown(true);

    // generate markdown using codevideo-doc-gen
    await generateMarkdownFromActions(actions);

    setIsGeneratingMarkdown(false);
    setMarkdownGenerated(true);
  }

  const onClickGeneratePDF = async () => {
    mixpanel.track("Generate PDF Homepage");
    setPdfGenerated(false);
    setIsGeneratingPDF(true);

    // generate pdf using codevideo-doc-gen
    await generatePdfFromActions(actions);

    setIsGeneratingPDF(false);
    setPdfGenerated(true);
  }

  const onClickGenerateHTML = async () => {
    mixpanel.track("Generate HTML Homepage");
    setHtmlGenerated(false);
    setIsGeneratingHTML(true);

    // generate html using codevideo-doc-gen
    await generateHtmlFromActions(actions);

    setIsGeneratingHTML(false);
    setHtmlGenerated(true);
  }

  const onClickGenerateJSON = async () => {
    mixpanel.track("Generate JSON Homepage");
    setJsonGenerated(false);
    setIsGeneratingJson(true);

    // generate json using codevideo-doc-gen
    await generateJsonFromActions(actions);

    setIsGeneratingJson(false);
    setJsonGenerated(true);
  }

  const onClickAdvanced = () => {
    setShowAdvancedOptionsHint(false);
  };

  const onClickCancel = () => {
    setVideoUrl("");
    setIsGeneratingVideo(false);
    abortController.abort();
  };

  const getOrientation = () => {
    if (width === height) {
      return "square";
    }
    if (width / height < 1.5) {
      return "portrait";
    }
    return "landscape";
  };
  const orientation = getOrientation();

  const getWidth = () => {
    if (orientation === "square") {
      return "300px";
    }
    if (orientation === "portrait") {
      return "300px";
    }
    return "100%";
  };

  const getHeight = () => {
    if (orientation === "square") {
      return "300px";
    }
    if (orientation === "portrait") {
      return "533px";
    }
    return "300px";
  };

  const editorElementWidth = getWidth();
  const editorElementHeight = getHeight();

  // useEffect - every time height or width changes, call editor.layout()
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout({ width, height });
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  }, [width, height]);

  const virtualEditor = new VirtualEditor([])
  const actionsToApply = actions.slice(0, currentActionIndex + 1)
  virtualEditor.applyActions(actionsToApply)
  const code = virtualEditor.getCode()

  // get nameBadge component based on name
  const nameBadge = () => {
    const name = actions[currentActionIndex].name;

    switch (true) {
      case name.startsWith('author'):
        return <Badge style={{ fontFamily: 'Fira Code, monospace' }} size="1" color="blue">{name}</Badge>
      case name.startsWith('file-explorer'):
        return <Badge style={{ fontFamily: 'Fira Code, monospace' }} size="1" color="green">{name}</Badge>
      case name.startsWith('editor'):
        return <Badge style={{ fontFamily: 'Fira Code, monospace' }} size="1" color="purple">{name}</Badge>
      case name.startsWith('external'):
        return <Badge style={{ fontFamily: 'Fira Code, monospace' }} size="1" color="orange">{name}</Badge>
      default:
        return ""
    }
  }

  // Helper function to format value with preserved newlines
  const formatValue = (val: string) => {
    return <Text size="1">{val.replace(/\\n/g, '\n')}</Text>
  };

  const hintText = currentActionIndex < hints.length ? hints[currentActionIndex] : "";

  return (
    <Flex gap="1" direction="column">
      <Heading size="8" my="3" align="center" color="mint">Explore this {actions.length} step example:</Heading>
      {/* Desktop view - side by side layout */}
      <Flex
        direction="row"
        gap="3"
        display={{ initial: 'none', sm: 'flex' }}
        style={{ width: '100%' }}
        wrap={isDesktop ? 'nowrap' : 'wrap-reverse'}
      >
        {/* Left side - Navigation and Step Info - hidden on small screens */}
        <Card style={{ width: isDesktop ? '40%' : '100%' }} >
          <Flex direction="column" gap="3" >
            <Flex direction="row" justify="center" align="center">
              <Text size="1" color="gray">Action Editor</Text>
            </Flex>
            <Flex direction="row" justify="between" align="center" style={{ display: isDesktop ? 'flex' : 'none' }}>
              <Tooltip content="You can also travel BACK in time!" color="mint" open={currentActionIndex === 2} style={{
                  backgroundColor: 'mint',
                  // hide on mobile
                  display: isDesktop ? 'block' : 'none'
                }}>
                <Button
                  variant="soft"
                  disabled={currentActionIndex === 0}
                  onClick={() => setCurrentActionIndex(currentActionIndex - 1)}
                >
                  Previous
                </Button>
              </Tooltip>
              <Text>Action <Text color="mint" weight="bold">{currentActionIndex + 1}</Text> of {actions.length}</Text>
              <Tooltip content="Click me to get started!" color="mint" open={currentActionIndex === 0} style={{
                  backgroundColor: 'mint',
                  // hide on mobile
                  display: isDesktop ? 'block' : 'none'
                }}>
                <Button
                  size={currentActionIndex === 0 ? "4" : "2"}
                  variant={currentActionIndex === 0 ? "solid" : "soft"}
                  disabled={currentActionIndex === actions.length - 1}
                  onClick={() => setCurrentActionIndex(currentActionIndex + 1)}
                >
                  Next
                </Button>
              </Tooltip>
            </Flex>

            <Box
              style={{
                padding: '12px',
                borderRadius: '4px',

                overflowX: 'auto',
                height: '100%'
              }}
            >
              <Flex my="3" gap="3" direction="row" justify="start" align="center">
                <Text size="1">
                  Name:
                </Text>
                {nameBadge()}
              </Flex>
              <Flex my="3" gap="3" direction="row" justify="start" align="center" mb="9">
                <Text size="1">
                  Value:
                </Text>
                {actions[currentActionIndex].name.startsWith("editor-") ? (
                  <Badge size="1" color="gray" style={{ whiteSpace: 'pre-wrap' }}>
                    <Box mt="1" style={{ fontFamily: 'monospace' }}>
                      {formatValue(actions[currentActionIndex].value)}
                    </Box>
                  </Badge>
                ) :
                  (
                    <Code size="2" color="gray">{actions[currentActionIndex].value}</Code>
                  )}
              </Flex>
              <Flex my="3" gap="3" direction="row" justify="start" align="center" mt="9">
                <Text size="1">
                  <InfoCircledIcon />
                </Text>
                <Tooltip content="These notes also provide useful information" color="mint" open={currentActionIndex === 4} style={{
                    backgroundColor: 'mint',
                    // hide on mobile
                    display: isDesktop ? 'block' : 'none'
                  }}>                  
                  <Text size="1">
                    {hintText}
                  </Text>
                </Tooltip>
              </Flex>
            </Box>
          </Flex>
        </Card>

        {/* Right side - Editor */}
        <Card style={{ width: isDesktop ? '60%' : '100%' }}>
        <Tooltip content="Perfect! Your video is ready!" color="mint" open={videoUrl !== ""} style={{ backgroundColor: 'mint' }}>
          <Box>
            <Flex mb="3" direction="row" justify="center" align="center">
              <Text size="1" color="gray">{videoUrl === "" ? 'Lesson' : 'Video'} Preview</Text>
            </Flex>
            <Tooltip content="Nice, we've now added our comment in the editor!" color="mint" open={currentActionIndex === 3} style={{ backgroundColor: 'mint' }}>
              <Card>
                {videoUrl === "" ? (
                  <>
                    <Flex gap="3" direction="row" align="center">
                      <Tooltip content="Nice, we've just changed the filename." color="mint" open={currentActionIndex === 1} style={{ backgroundColor: 'mint' }}>
                        <Box
                          style={{
                            backgroundColor: "mint",
                            fontFamily: "Fira Code"
                          }}
                        >
                          {currentActionIndex === 0 ? '<editor tab>' : "areEqual.ts"}
                        </Box>
                      </Tooltip>
                    </Flex>
                    {/* Add YouTube style comment overlay */}
                    {isAuthorAction(actions[currentActionIndex]) && (
                      <Box
                        style={{
                          position: 'absolute',
                          bottom: '24px',
                          left: '24px',
                          right: '24px',
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          color: 'white',
                          fontFamily: 'system-ui',
                          fontSize: '14px',
                          zIndex: 10,
                        }}
                      >
                        <Text style={{ margin: 0 }}>
                          {actions[currentActionIndex].value}
                        </Text>
                      </Box>
                    )}

                    <Editor
                      theme={theme === "light" ? "vs" : "vs-dark"}
                      path="areEqual.ts"
                      width={videoUrl !== "" ? 0 : "100%"}
                      height={videoUrl !== "" ? 0 : editorElementHeight}
                      defaultLanguage="typescript"
                      language="typescript"
                      value={code}
                      options={{
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontFamily: "Fira Code",
                        fontSize: 13,
                        fontLigatures: true,
                        lineNumbers: "off",
                        folding: true,
                        automaticLayout: true,
                        autoIndent: "full",
                        readOnly: true
                      }}
                      onMount={handleOnMount}
                    />
                  </>
                ) : (
                  <video
                    crossOrigin="anonymous"
                    src={videoUrl}
                    controls
                    style={{
                      width: editorElementWidth,
                      height: editorElementHeight,
                    }}
                  />
                )}
                <EditorOverlay
                  isActive={isGeneratingVideo}
                  slides={editorLoaderSlidesConfig}
                />
              </Card>
            </Tooltip>
          </Box>
          </Tooltip>
        </Card>

      </Flex>
      <Card>
        <Tooltip content="Even though we're not fully through the example, we can still export the full lesson in any format since CodeVideo actions are totally time-travellable. Give it a try!" color="mint" open={currentActionIndex === 5} style={{ backgroundColor: 'mint' }}>

          <Flex mt="3" direction="row" justify="between" align="center">
            <Flex gap="3" direction="row" align="center">
              <Tooltip content="Yes, our coveted 'export to video' option" color="mint" open={currentActionIndex === 8} style={{ backgroundColor: 'mint' }}>
                <Button onClick={onClickGenerateVideo} disabled={isGeneratingVideo || videoGenerated}>
                  {isGeneratingVideo ? "Generating..." : videoGenerated ? "Generated!" : "Generate Video"}
                </Button>
              </Tooltip>
              <Code>{"<"}- get your video!</Code>
              {videoUrl === "" && isGeneratingVideo && (
                <Button color="crimson" variant="soft" onClick={onClickCancel}>
                  Cancel
                </Button>
              )}
            </Flex>
            {/* right side is always the advanced options button, doesn't show on mobile */}
            <Flex display={{ initial: 'none', sm: 'flex' }} gap="3" direction="row" align="center">
              {showAdvancedOptionsHint && (
                <Code>advanced video options for connoisseurs -{">"}</Code>
              )}
              <AdvancedVideoOptionsDialog onClicked={onClickAdvanced} />
            </Flex>
          </Flex>
        </Tooltip>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            <Button onClick={onClickGenerateMarkdown} disabled={isGeneratingMarkdown || markdownGenerated}>
              {isGeneratingMarkdown ? "Generating..." : markdownGenerated ? "Generated!" : "Generate Markdown"}
            </Button>
            <Code>{"<"}- get markdown!</Code>
            {!markdownGenerated && isGeneratingMarkdown && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            <Button onClick={onClickGeneratePDF} disabled={isGeneratingPDF || pdfGenerated}>
              {isGeneratingPDF ? "Generating..." : pdfGenerated ? "Generated!" : "Generate PDF"}
            </Button>
            <Code>{"<"}- get a PDF!</Code>
            {!pdfGenerated && isGeneratingPDF && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            <Button onClick={onClickGenerateHTML} disabled={isGeneratingHTML || htmlGenerated}>
              {isGeneratingHTML ? "Generating..." : htmlGenerated ? "Generated!" : "Generate Webpage"}
            </Button>
            <Code>{"<"}- get a webpage!</Code>
            {!htmlGenerated && isGeneratingHTML && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            <Button onClick={onClickGenerateJSON} disabled={isGeneratingJson || jsonGenerated}>
              {isGeneratingJson ? "Generating..." : jsonGenerated ? "Generated!" : "Generate JSON"}
            </Button>
            <Code>{"<"}- get JSON!</Code>
            {!jsonGenerated && isGeneratingJson && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
