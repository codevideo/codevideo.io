import * as React from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { useRef } from "react";

export interface IReadOnlyEditorProps {
  value: string;
}

// use local static files
loader.config({ paths: { vs: "/vs" } });
export function ReadOnlyEditor(props: IReadOnlyEditorProps) {
  const { value } = props;
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
        (window as any).monaco.editor.tokenize("console.log('hello world');", "javascript");
      }, 1000);
    }
  };

  return (
      <Editor
        width="700px"
        height="500px"
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
