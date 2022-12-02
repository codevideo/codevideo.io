import * as React from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import * as styles from "../../styles/modules/editor-widget.module.scss";
import GitHub from "monaco-themes/themes/GitHub.json";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { codeEdited } from "../../store/editorSlice";

export function EditorWidget() {
  const { editorSetting } = useAppSelector((state) => state.editor);
  const dispatch = useAppDispatch();

  const onChangeCode = (code: string | undefined) => {
    if (code) {
      dispatch(
        codeEdited({
          code,
        })
      );
    }
  };

  const handleOnMount = (
    _editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    monaco.editor.defineTheme(
      "GitHub",
      GitHub as monaco.editor.IStandaloneThemeData
    );
    monaco.editor.setTheme("GitHub");
  };
  const { code, isActive, fileLabel } = editorSetting;

  return (
    <div
    // @ts-ignore
      className={`d-flex flex-column justify-content-center m-3 ${styles.editorWrapper}`}
    >
      <h3 className="text-primary">
        <u>Code</u>
      </h3>
      <div className={isActive ? "d-block" : "d-none"}>
        <Editor
          path={fileLabel}
          height="500px"
          width="500px"
          defaultLanguage="typescript"
          value={code}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
          }}
          onMount={handleOnMount}
          onChange={onChangeCode}
        />
      </div>
    </div>
  );
}
