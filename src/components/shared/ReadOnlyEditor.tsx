import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { useRef } from "react";

export interface IReadOnlyEditorProps {
  value: string;
  caretPosition?: {
    row: number;
    col: number;
  };
}

// use local static files
loader.config({ paths: { vs: "/vs" } });
export function ReadOnlyEditor(props: IReadOnlyEditorProps) {
  const { value, caretPosition } = props;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

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
          "console.log('hello world');",
          "javascript"
        );
      }, 1000);
    }
  };

  // TODO, doesn't work, the newlines are not carried in from the 'value' data
  // every time caretPosition changes, focus the editor and update the editor's cursor position
  // useEffect(() => {
  //   // TODO, bad pattern, but we need time for value in the editor to be set
  //   setTimeout(() => {
  //     if (editorRef.current && caretPosition) {
  //       editorRef.current.focus();
  //       editorRef.current.setPosition({
  //         lineNumber: caretPosition.row,
  //         column: caretPosition.col,
  //       });
  //       console.log("setting position", caretPosition);
  //     }
  //   }, 250);
  // }, [caretPosition]);
  // console.log("value", value)

  return (
    <Editor
      width="700px"
      height="250px"
      defaultLanguage="javascript"
      value={value}
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
        readOnly: true,
      }}
      onMount={handleOnMount}
    />
  );
}
