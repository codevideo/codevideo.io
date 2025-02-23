import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import mixpanel from "mixpanel-browser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { useEffect, useRef, useState } from "react";
import { codeToVideo } from "../../utils/video/codeToVideo";
import { AdvancedVideoOptionsDialog } from "./AdvancedVideoOptionsDialog";
import { Box, Button, Card, Code, Em, Flex, Heading, Text } from "@radix-ui/themes";
import { IAction, isAuthorAction, isEditorAction } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownFromActions, generateHtmlFromActions, generatePdfFromActions } from '@fullstackcraftllc/codevideo-doc-gen';
import { VirtualEditor } from "@fullstackcraftllc/codevideo-virtual-editor";

// use local static files for vscode monaco editor
loader.config({ paths: { vs: "/vs" } });

export function EditorWidgetHomePage() {
  const { width, height, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  // actions just a const since the homepage example is a readonly example
  const actions: IAction[] = [
    {
      name: "author-speak-before",
      value: "Right now, we're just looking at a blank editor. We don't even have a file open! Let's begin by creating a TypeScript file for our 'areEqual' function."
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
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [isGeneratingMarkdown, setIsGeneratingMarkdown] = useState(false);
  const [markdownGenerated, setMarkdownGenerated] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [isGeneratingHTML, setIsGeneratingHTML] = useState(false);
  const [htmlGenerated, setHtmlGenerated] = useState(false);
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

  const onClickGenerate = async () => {
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

  const onClickGenerateMarkdown = () => {
    setMarkdownGenerated(false);
    setIsGeneratingMarkdown(true);
    // generate markdown using codevideo-doc-gen
    const markdown = generateMarkdownFromActions(actions);

    // trigger download
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "codevideo-markdown-export.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    setIsGeneratingMarkdown(false);
    setMarkdownGenerated(true);
  }

  const onClickGeneratePDF = async () => {
    setPdfGenerated(false);
    setIsGeneratingPDF(true);

    // generate pdf using codevideo-doc-gen
    await generatePdfFromActions(actions);

    setIsGeneratingPDF(false);
    setPdfGenerated(true);
  }

  const onClickGenerateHTML = async () => {
    setHtmlGenerated(false);
    setIsGeneratingHTML(true);

    // generate html using codevideo-doc-gen
    await generateHtmlFromActions(actions);

    setIsGeneratingHTML(false);
    setHtmlGenerated(true);
  }

  const onClickAdvanced = () => {
    setShowAdvancedOptionsHint(false);
  };

  const onClickCancel = () => {
    setVideoUrl("");
    setIsGeneratingVideo(false);
    abortController.abort();
  };

  const onClickMakeAnother = () => {
    setVideoUrl("");
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

  return (
    <Flex gap="1" direction="column">
      <Heading size="7" my="3" align="center">Explore this 3 step example:</Heading>
      <Card style={{ minHeight: '300px' }}>
        <Flex direction="column" gap="3">
          <Text color="mint" align="center">
            Action: {currentActionIndex + 1} of {actions.length}
          </Text>
          <Flex direction="row" align="center" justify="between" style={{ minHeight: '200px' }}>
            {/* Previous Button */}
            <Button
              variant="soft"
              disabled={currentActionIndex === 0}
              onClick={() => setCurrentActionIndex(currentActionIndex - 1)}
            >
              Previous
            </Button>

            {/* Main Content - using flex-grow to take up available space */}
            <Flex grow="1" direction="column" align="center" justify="center" mx="4">
              <Box
                mb="2"
                style={{
                  backgroundColor: "var(--mint-a3)",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  fontFamily: "Fira Code"
                }}
              >
                {actions[currentActionIndex].name}
              </Box>

              <Box
                style={{
                  backgroundColor: "var(--mint-a3)",
                  padding: "16px",
                  borderRadius: "4px",
                  width: "100%",
                  maxWidth: "800px"
                }}
              >
                {isEditorAction(actions[currentActionIndex]) ? (
                  <pre style={{
                    fontFamily: "Fira Code",
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word"
                  }}>
                    {actions[currentActionIndex].value}
                  </pre>
                ) : (
                  <Text align="center">{actions[currentActionIndex].value}</Text>
                )}
              </Box>
            </Flex>

            {/* Next Button */}
            <Button
              variant="soft"
              disabled={currentActionIndex === actions.length - 1}
              onClick={() => setCurrentActionIndex(currentActionIndex + 1)}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Card>
      <Card my="3">
        <Flex gap="3" direction="row" align="center" justify="center">
          <Text size="1" style={{
            backgroundColor: "mint",
            fontFamily: "Fira Code"
          }} align="center">
            <Em>{'<'}Editor Preview{'>'}</Em>
          </Text>
        </Flex>
        <Card mb="1">
          <Flex gap="3" direction="row" align="center">
            <Box
              style={{
                backgroundColor: "mint",
                fontFamily: "Fira Code"
              }}
            >
              {currentActionIndex === 0 ? '<editor tab>' : "areEqual.ts"}
            </Box>
          </Flex>
        </Card>
        <Card>
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
            path="areEqual.ts"
            width={videoUrl !== "" ? 0 : editorElementWidth}
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
        </Card>
        {videoUrl !== "" && (
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

      <Card>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center">
            {videoUrl === "" && (
              <Button onClick={onClickGenerate} disabled={isGeneratingVideo || videoGenerated}>
                {isGeneratingVideo ? "Generating..." : videoGenerated ? "Generated!" : "Generate Video"}
              </Button>
            )}
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
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            {videoUrl === "" && (
              <Button onClick={onClickGenerateMarkdown} disabled={isGeneratingMarkdown || markdownGenerated}>
                {isGeneratingMarkdown ? "Generating..." : markdownGenerated ? "Generated!" : "Generate Markdown"}
              </Button>
            )}
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
            {videoUrl === "" && (
              <Button onClick={onClickGeneratePDF} disabled={isGeneratingPDF || pdfGenerated}>
                {isGeneratingPDF ? "Generating..." : pdfGenerated ? "Generated!" : "Generate PDF"}
              </Button>
            )}
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
            {videoUrl === "" && (
              <Button onClick={onClickGenerateHTML} disabled={isGeneratingHTML || htmlGenerated}>
                {isGeneratingHTML ? "Generating..." : htmlGenerated ? "Generated!" : "Generate Webpage"}
              </Button>
            )}
            <Code>{"<"}- get a webpage!</Code>
            {!htmlGenerated && isGeneratingHTML && (
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
