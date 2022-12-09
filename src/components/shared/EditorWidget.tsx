import * as React from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as styles from "../../styles/modules/editor-widget.module.scss";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { codeEdited, fileLabelEdited } from "../../store/editorSlice";
import { EditorOverlay } from "./EditorOverlay";
import { editorLoaderSlidesConfig } from "../../config/editorOverlaySlidesConfig";
import { codeToVideo } from "../../utils/video/codeToVideo";
import { useState } from "react";
import { sleep } from "../../utils/sleep";
import { toast } from "react-toastify";

export function EditorWidget() {
  const { fileLabel, code, language } = useAppSelector(
    (state) => state.editor.editorSetting
  );
  const dispatch = useAppDispatch();
  const [isTabInEditMode, setIsTabInEditMode] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const abortController = new AbortController();

  const [editorWidth, setEditorWidth] = useState(0);

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
    console.log("value is: ", value);
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
    monaco.editor.defineTheme(
      "Monokai",
      Monokai as monaco.editor.IStandaloneThemeData
    );
    monaco.editor.setTheme("Monokai");
  };

  const onClickGenerate = async () => {
    // get width of editor so loader looks nice
    const editor = document.querySelector(".monaco-editor");
    if (editor) {
      setEditorWidth(editor.clientWidth);
    }
    setIsGeneratingVideo(true);
    console.log("generating video with", fileLabel, code);
    const calculatedTimeBasedOnCodeLength = Math.floor(code.length * 0.2);
    toast(
      <div>
        🕒🕒🕒
        <br />
        You've got <b>{code.length} characters</b> in your snippet. Using our
        extremely powerful ML assisted prediction model, it will take about{" "}
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
    await codeToVideo(fileLabel, code, setVideoUrl);
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

  console.log("rerendering with", fileLabel);
  const className = isTabInEditMode
    ? "nav-link active font-monospace"
    : "nav-link font-monospace";
  return (
    <>
      <div
        // @ts-ignore
        className={`container d-flex flex-column justify-content-center align-items-center m-3`}
      >
        <div
          className="container"
          style={{
            position: "relative",
          }}
        >
          <div className="row justify-content-center align-items-center">
            <div className="col-12 col-md-8">
              <ul className="nav nav-tabs">
                <li className="nav-item border-start border-top border-end">
                  {isTabInEditMode && (
                    <input
                      className="form-control"
                      value={fileLabel}
                      onChange={onChangeFileLabel}
                      onBlur={() => setIsTabInEditMode(false)}
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
              {videoUrl === "" && (
                <Editor
                  path={fileLabel}
                  height="300px"
                  width="100%"
                  defaultLanguage="typescript"
                  language={language}
                  value={code}
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontFamily: "Fira Code",
                    fontSize: 13,
                    fontLigatures: true,
                  }}
                  onMount={handleOnMount}
                  onChange={onChangeCode}
                />
              )}
              {videoUrl !== "" && (
                <video
                  crossOrigin="anonymous"
                  src={videoUrl}
                  controls
                  style={{ width: "100%", height: "100%" }}
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
      <div
        // @ts-ignore
        className={`d-flex justify-content-center align-items-center`}
      >
        {videoUrl === "" && (
          <>
            <button
              className="btn btn-primary"
              onClick={onClickGenerate}
              disabled={isGeneratingVideo}
            >
              {isGeneratingVideo ? "Generating..." : "Generate a video!"}
            </button>
            <span className="text-primary ms-1">*</span>
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
    </>
  );
}
