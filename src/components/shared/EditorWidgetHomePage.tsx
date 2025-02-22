import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import mixpanel from "mixpanel-browser";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { codeEdited, fileLabelEdited } from "../../store/editorSlice";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { useEffect, useRef, useState } from "react";
import { codeToVideo } from "../../utils/video/codeToVideo";
import { AdvancedVideoOptionsDialog } from "./AdvancedVideoOptionsDialog";
import { Box, Button, Card, Code, Em, Flex, Heading, Text } from "@radix-ui/themes";
import { IAction, isAuthorAction, isEditorAction } from "@fullstackcraftllc/codevideo-types";
import { generateMarkdownFromActions } from '@fullstackcraftllc/codevideo-doc-gen';
import { convertToPdf } from "../../utils/generation/convertToPdf";
import { convertToHtml } from "../../utils/generation/convertToHtml";

// use local static files
loader.config({ paths: { vs: "/vs" } });
export function EditorWidgetHomePage() {
  const { fileLabel, code, language } = useAppSelector(
    (state) => state.editor.editorSetting
  );
  const { width, height, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const dispatch = useAppDispatch();
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [actions, setActions] = useState<Array<IAction>>([
    {
      name: "author-speak-before",
      value: "We're going to create a sort of toy function, just for the example of CodeVideo of an 'areEqual' function, which strictly compares two numbers."
    },
    {
      name: "editor-type",
      value: `/**
* Compares two numbers for strict equality.
* 
* @param a - The first number to compare
* @param b - The second number to compare
* @returns True if the numbers are strictly equal, false otherwise
*/
export const areEqual = (a: number, b: number): boolean => {
    return a === b;
}`
    },
    {
      name: "author-speak-before",
      value: "That should be all we need to do for this 'isEqual' function. I hope you enjoyed!"
    }
  ]);
  const [isTabInEditMode, setIsTabInEditMode] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [isGeneratingMarkdown, setIsGeneratingMarkdown] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingHTML, setIsGeneratingHTML] = useState(false);
  const [showFileLabelHint, setShowFileLabelHint] = useState(true);
  const [showGenerateButtonHint, setShowGenerateButtonHint] = useState(true);
  const [showAdvancedOptionsHint, setShowAdvancedOptionsHint] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
  const [markdownUrl, setMarkdownUrls] = useState("");
  const [pdfUrl, setPdfUrls] = useState("");
  const [htmlUrl, setHtmlUrls] = useState("");
  const abortController = new AbortController();
  const [editorWidth, setEditorWidth] = useState(0);
  const [isOpening, setIsOpening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  const onChangeCode = (code: string | undefined) => {
    if (code) {
      dispatch(
        codeEdited({
          code,
        })
      );
    }
  };

  const onClickFileLabel = () => {
    // remove hint
    setShowFileLabelHint(false);

    // activate edit mode
    setIsTabInEditMode(!isTabInEditMode);
  };

  const onChangeFileLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    const key = (e as any).key;
    const { value } = e.target;

    // if enter, then blur
    if (key === "Enter") {
      setIsTabInEditMode(false);
      return;
    }

    dispatch(
      fileLabelEdited({
        fileLabel: value,
      })
    );
  };

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
    mixpanel.track("Generate Video Homepage");
    // hide hints
    setShowGenerateButtonHint(false);

    // get width of editor so loader looks nice
    const editor = document.querySelector(".monaco-editor");
    if (editor) {
      setEditorWidth(editor.clientWidth);
    }
    setIsGeneratingVideo(true);
    const calculatedTimeBasedOnCodeLength = Math.floor(code.length * 0.2);
    // toast(
    //   <div className="text-center">
    //     🕒🕒🕒
    //     <br />
    //     You've got <b>{code.length} characters</b> in your snippet. Using our
    //     extremely powerful ML assisted prediction model, it can take up to{" "}
    //     <b>{calculatedTimeBasedOnCodeLength} seconds</b> to generate your video.
    //     <br />
    //     <br />
    //     <b>Please be patient!</b>
    //   </div>,
    //   {
    //     position: "top-center",
    //   }
    // );

    // good for testing loader
    // await sleep(20000);
    // await codeToVideo(fileLabel, code, setVideoUrl);
    await codeToVideo(
      width,
      height,
      fileLabel,
      code,
      gradientColors,
      mimicTypos,
      setVideoUrl,
      engine
    );
    setIsGeneratingVideo(false);
  };

  const onClickGenerateMarkdown = () => {
    // generate markdown using codevideo-doc-gen
    const markdown = generateMarkdownFromActions(actions);

    // trigger download
    const element = document.createElement("a");
    const file = new Blob([markdown], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "codevideo-markdown-export.md";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  const onClickGeneratePDF = async () => {
    // generate markdown using codevideo-doc-gen
    const markdown = generateMarkdownFromActions(actions);

    // generate pdf
    await convertToPdf(markdown);

  }

  const onClickGenerateHTML = async () => {
    // generate markdown using codevideo-doc-gen
    const markdown = generateMarkdownFromActions(actions);

    // generate html
    await convertToHtml(markdown);
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

  const className = isTabInEditMode
    ? "nav-link active font-monospace"
    : "nav-link font-monospace";

  const rotate = isOpening ? "rotate(90deg)" : "rotate(0deg)";

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
  const wrapperClass =
    orientation === "square" || orientation === "portrait"
      ? "d-flex flex-column justify-content-center align-items-center col-12 col-md-8"
      : "col-12 col-md-8";

  // useEffect - every time height or width changes, call editor.layout()
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.layout({ width, height });
      editorRef.current.getAction("editor.action.formatDocument")?.run();
    }
  }, [width, height]);

  // when focus goes to true, focus on the input
  useEffect(() => {
    if (isTabInEditMode) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isTabInEditMode]);

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
      <Card>
        <Flex gap="3" direction="row" align="center">
          <Box
            style={{
              backgroundColor: "mint",
              fontFamily: "Fira Code"
            }}
          >
            {fileLabel}
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
          path={fileLabel}
          width={videoUrl !== "" ? 0 : editorElementWidth}
          height={videoUrl !== "" ? 0 : editorElementHeight}
          defaultLanguage="typescript"
          language={language}
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
          onChange={onChangeCode}
        />
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
          editorWidth={editorWidth}
        />
        
      </Card>

      <Card>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center">
            {videoUrl === "" && (
              <Button onClick={onClickGenerate} disabled={isGeneratingVideo}>
                {isGeneratingVideo ? "Generating..." : "Generate Video"}
              </Button>
            )}
            {showGenerateButtonHint && (
              <Code>{"<"}- get your video!</Code>
            )}
            {/* cancel button when isbuildingvideo is true */}
            {videoUrl === "" && isGeneratingVideo && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
            {videoUrl !== "" && (
              <Button onClick={onClickMakeAnother}>Make another!</Button>
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
              <Button onClick={onClickGenerateMarkdown} disabled={isGeneratingMarkdown}>
                {isGeneratingMarkdown ? "Generating..." : "Generate Markdown"}
              </Button>
            )}
            {showGenerateButtonHint && (
              <Code>{"<"}- get markdown!</Code>
            )}
            {/* cancel button when isbuildingvideo is true */}
            {markdownUrl === "" && isGeneratingMarkdown && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
            {markdownUrl !== "" && (
              <Button onClick={onClickMakeAnother}>Make another!</Button>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            {videoUrl === "" && (
              <Button onClick={onClickGeneratePDF} disabled={isGeneratingPDF}>
                {isGeneratingPDF ? "Generating..." : "Generate PDF"}
              </Button>
            )}
            {showGenerateButtonHint && (
              <Code>{"<"}- get a PDF!</Code>
            )}
            {/* cancel button when isbuildingvideo is true */}
            {pdfUrl === "" && isGeneratingPDF && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
            {pdfUrl !== "" && (
              <Button onClick={onClickMakeAnother}>Make another!</Button>
            )}
          </Flex>
        </Flex>
        <Flex direction="row" justify="between" align="center">
          <Flex gap="3" direction="row" align="center" mt="3">
            {videoUrl === "" && (
              <Button onClick={onClickGenerateHTML} disabled={isGeneratingHTML}>
                {isGeneratingHTML ? "Generating..." : "Generate Webpage"}
              </Button>
            )}
            {showGenerateButtonHint && (
              <Code>{"<"}- get a webpage!</Code>
            )}
            {/* cancel button when isbuildingvideo is true */}
            {htmlUrl === "" && isGeneratingHTML && (
              <Button color="crimson" variant="soft" onClick={onClickCancel}>
                Cancel
              </Button>
            )}
            {htmlUrl !== "" && (
              <Button onClick={onClickMakeAnother}>Make another!</Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
