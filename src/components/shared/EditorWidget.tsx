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

export function EditorWidget() {
  const { fileLabel, code, language } = useAppSelector(
    (state) => state.editor.editorSetting
  );
  const dispatch = useAppDispatch();
  const [isTabInEditMode, setIsTabInEditMode] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1920_18MG.mp4");
  // const [abortController, setAbortController] = useState(new AbortController())
  const abortController = new AbortController()
  const signal = abortController.signal

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
    setIsGeneratingVideo(true);
    console.log("generating video with", fileLabel, code);
    const videoUrl = await codeToVideo(fileLabel, code, signal);
    setVideoUrl(videoUrl);
    setIsGeneratingVideo(false);
  };

  const onClickCancel = () => {
    setVideoUrl("");
    setIsGeneratingVideo(false);
    abortController.abort()
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
          style={{
            maxWidth: "700px",
            minHeight: "300px",
            aspectRatio: "16 / 9",
            position: "relative",
          }}
        >
          <ul className="nav nav-tabs" style={{ maxWidth: "700px" }}>
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
              height="100%"
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
              src={videoUrl}
              controls
              style={{ width: "100%", height: "100%" }}
            />
          )}
          <EditorOverlay
            isActive={isGeneratingVideo}
            slides={editorLoaderSlidesConfig}
          />
        </div>
      </div>
      <div
        // @ts-ignore
        className={`d-flex justify-content-center align-items-center mt-5`}
      >
        {videoUrl === "" && <button className="btn btn-primary" onClick={onClickGenerate} disabled={isGeneratingVideo}>
          {isGeneratingVideo ? 'Generating...' : 'Generate a video!'}
        </button>}
        {videoUrl !== "" && <button className="btn btn-primary" onClick={onClickMakeAnother}>
          Make another!
        </button>}
        {/* cancel button when isbuildingvideo is true */}
        {isGeneratingVideo && <button className="btn btn-danger ms-5" onClick={onClickCancel}>
          Cancel?
        </button>}
      </div>
    </>
  );
}
