import * as React from "react";
import Editor, { Monaco, useMonaco } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { codeEdited, fileLabelEdited } from "../../store/editorSlice";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { codeToVideoLocal } from "../../utils/video/codeToVideoLocal";
import Collapsible from "react-collapsible";
import { AdvancedVideoOptions } from "./AdvancedVideoOptions";

export function EditorWidget() {
  const { fileLabel, code, language } = useAppSelector(
    (state) => state.editor.editorSetting
  );
  const { width, height, gradientColors, mimicTypos } = useAppSelector(
    (state) => state.video
  );
  const dispatch = useAppDispatch();
  const [isTabInEditMode, setIsTabInEditMode] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
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

  const onChangeFileLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
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
        const tokens = (window as any).monaco.editor.tokenize(
          `export const dummy = () => {
        console.log('hello world')
      }`,
          "typescript"
        );
      }, 1000);
    }
  };

  const onClickGenerate = async () => {
    // get width of editor so loader looks nice
    const editor = document.querySelector(".monaco-editor");
    if (editor) {
      setEditorWidth(editor.clientWidth);
    }
    setIsGeneratingVideo(true);
    const calculatedTimeBasedOnCodeLength = Math.floor(code.length * 0.2);
    toast(
      <div>
        🕒🕒🕒
        <br />
        You've got <b>{code.length} characters</b> in your snippet. Using our
        extremely powerful ML assisted prediction model, it can take up to{" "}
        <b>{calculatedTimeBasedOnCodeLength} seconds</b> to generate your video.
        <br />
        <br />
        <b>Please be patient!</b>
      </div>,
      {
        position: "top-center",
      }
    );

    // good for testing loader
    // await sleep(20000);
    // await codeToVideo(fileLabel, code, setVideoUrl);
    await codeToVideoLocal(
      width,
      height,
      fileLabel,
      code,
      gradientColors,
      mimicTypos,
      setVideoUrl,
      false
    );
    setIsGeneratingVideo(false);
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
      editorRef.current.getAction("editor.action.formatDocument").run();
    }
  }, [width, height]);

  return (
    <>
      <div
        className={` d-flex flex-column justify-content-center align-items-center m-3`}
      >
        <div
          className="container"
          style={{
            position: "relative",
          }}
        >
          <div className="row justify-content-center align-items-center">
            <div className={wrapperClass}>
              <ul className={videoUrl !== "" ? "d-none" : "nav nav-tabs"}>
                <li className="nav-item border-start border-top border-end">
                  {isTabInEditMode && (
                    <input
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
                    />
                  )}
                  {!isTabInEditMode && (
                    <button
                      className={className}
                      onClick={() => setIsTabInEditMode(!isTabInEditMode)}
                    >
                      {fileLabel}
                    </button>
                  )}
                </li>
              </ul>
              <Editor
                className={videoUrl !== "" ? "d-none" : ""}
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
                  style={{ width: editorElementWidth, height: editorElementHeight }}
                />
              )}
              <EditorOverlay
                isActive={isGeneratingVideo}
                slides={editorLoaderSlidesConfig}
                editorWidth={editorWidth}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`d-flex justify-content-center align-items-center mb-5`}>
        {videoUrl === "" && (
          <>
            <button
              className="btn btn-primary"
              onClick={onClickGenerate}
              disabled={isGeneratingVideo}
            >
              {isGeneratingVideo ? "Generating..." : "Generate! *"}
            </button>
          </>
        )}
        {videoUrl !== "" && (
          <button className="btn btn-primary" onClick={onClickMakeAnother}>
            Make another!
          </button>
        )}
        {/* cancel button when isbuildingvideo is true */}
        {isGeneratingVideo && (
          <button className="btn btn-danger ms-5" onClick={onClickCancel}>
            Cancel
          </button>
        )}
      </div>
      <Collapsible
        disabled={isGeneratingVideo}
        onOpening={() => setIsOpening(true)}
        onClosing={() => setIsOpening(false)}
        open={isOpening}
        trigger={
          <button className="btn btn-primary" disabled={isGeneratingVideo}>
            <span
              style={{
                transform: rotate,
                transition: "transform 0.5s ease",
              }}
            >
              {"/>"}
            </span>
            &nbsp;&nbsp;Advanced Video Options
          </button>
        }
      >
        <AdvancedVideoOptions />
        {videoUrl === "" && (
          <>
            <button
              className="btn btn-primary"
              onClick={onClickGenerate}
              disabled={isGeneratingVideo}
            >
              {isGeneratingVideo ? "Generating..." : "Generate! *"}
            </button>
          </>
        )}
      </Collapsible>
    </>
  );
}
