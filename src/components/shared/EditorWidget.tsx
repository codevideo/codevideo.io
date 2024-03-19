import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { codeEdited, fileLabelEdited } from "../../store/editorSlice";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { useEffect, useRef, useState } from "react";
import { codeToVideo } from "../../utils/video/codeToVideo";
import { AdvancedVideoOptionsDialog } from "./AdvancedVideoOptionsDialog";
import { Box, Button, Card, Code, Flex, TextField } from "@radix-ui/themes";

// use local static files
loader.config({ paths: { vs: "/vs" } });
export function EditorWidget() {
  const { fileLabel, code, language } = useAppSelector(
    (state) => state.editor.editorSetting
  );
  const { width, height, gradientColors, mimicTypos, engine } = useAppSelector(
    (state) => state.video
  );
  const dispatch = useAppDispatch();
  const [isTabInEditMode, setIsTabInEditMode] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [showFileLabelHint, setShowFileLabelHint] = useState(true);
  const [showGenerateButtonHint, setShowGenerateButtonHint] = useState(true);
  const [showAdvancedOptionsHint, setShowAdvancedOptionsHint] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");
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

    // focus on input
    if (inputRef.current) {
      inputRef.current.focus();
    }
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

    monaco.editor.defineTheme(
      "Monokai",
      Monokai as monaco.editor.IStandaloneThemeData
    );
    monaco.editor.setTheme("Monokai");

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
  };

  const onClickGenerate = async () => {
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

  return (
    <Flex gap="1" direction="column">
      <Card>
        {isTabInEditMode && (
          <TextField.Root>
            <TextField.Input
              ref={inputRef}
              className="form-control"
              value={fileLabel}
              onChange={onChangeFileLabel}
              onBlur={() => setIsTabInEditMode(false)}
              onFocus={(e) => {
                if (inputRef.current) {
                  inputRef.current.focus();
                }
                e.target.select();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsTabInEditMode(false);
                }
                if (e.key === "Enter") {
                  setIsTabInEditMode(false);
                }
              }}
            />
          </TextField.Root>
        )}
        {!isTabInEditMode && (
          <Flex gap="3" direction="row" align="center">
            <Button
              onClick={onClickFileLabel}
              style={{ fontFamily: "Fira Code" }}
            >
              {fileLabel}
            </Button>
            {showFileLabelHint && (
              <Code>{"<"}- you can change the file name and extension</Code>
            )}
          </Flex>
        )}
      </Card>
      <Card>
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
                {isGeneratingVideo ? "Generating..." : "Generate"}
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
          {/* right side is always the advanced options button */}
          <Flex gap="3" direction="row" align="center">
            {showAdvancedOptionsHint && (
              <Code>advanced options for connoisseurs -{">"}</Code>
            )}
            <AdvancedVideoOptionsDialog onClicked={onClickAdvanced} />
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
