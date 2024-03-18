import * as React from "react";
import { Card } from "@radix-ui/themes";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import Monokai from "monaco-themes/themes/Monokai.json";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { IAction } from "@fullstackcraftllc/codevideo-types";
import { speakText } from "../../utils/speakText";

export const executeActionsWithMonacoEditor = async (
  editor: React.MutableRefObject<
    monaco.editor.IStandaloneCodeEditor | undefined
  >,
  actions: Array<IAction>
) => {
  if (!editor) {
    return;
  }
  const editorInstance = editor.current;
  if (!editorInstance) {
    return;
  }

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    switch (action.name) {
      case "type-editor":
        // for typing, add 100ms delay between each character
        const text = action.value;
        for (let i = 0; i < text.length; i++) {
          editorInstance.trigger("keyboard", "type", { text: text[i] });

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        break;
      case "backspace":
        // for backspace, add 100ms delay between each backspace
        const count = parseInt(action.value);
        for (let i = 0; i < count; i++) {
          // '1' is monaco.KeyCode.Backspace.toString()
          // TODO: using monaco.KeyCode.Backspace breaks the build... so we use the string value directly
          editorInstance.trigger("1", "deleteLeft", null);
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
        break;
      case "speak-before":
        await speakText(action.value);
        break;
      case "speak-after":
        await speakText(action.value);
        break;
      case "speak-during":
        await speakText(action.value);
        break;
      case "arrow-up":
        editorInstance.trigger("keyboard", "type", {
          text: String.fromCharCode(38),
        });
        break;
      case "arrow-down":
        editorInstance.trigger("keyboard", "type", {
          text: String.fromCharCode(40),
        });
        break;
      case "arrow-left":
        editorInstance.trigger("keyboard", "type", {
          text: String.fromCharCode(37),
        });
        break;
      case "arrow-right":
        editorInstance.trigger("keyboard", "type", {
          text: String.fromCharCode(39),
        });
        break;
      case "enter":
        editorInstance.trigger("keyboard", "type", {
          text: String.fromCharCode(13),
        });
        break;
      default:
        console.log("action not found");
        break;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};

export interface ISimpleEditorProps {
  path: string;
  language: string;
  actions: Array<IAction>;
  tokenizerCode: string;
  focus: boolean;
  onChangeCode?: (code: string | undefined) => void;
  value?: string;
}

// use local static files
loader.config({ paths: { vs: "/vs" } });
export function SimpleEditor(props: ISimpleEditorProps) {
  const { path, language, actions, value, tokenizerCode, focus, onChangeCode } =
    props;
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

  // whenever focus changes and is true, focus on the editor
  useEffect(() => {
    if (focus && editorRef.current) {
      editorRef.current.focus();
    }
  }, [focus]);

  // whenever actions change, execute them
  useEffect(() => {
    if (actions.length > 0 && editorRef.current) {
      console.log("executing actions");
      editorRef.current.focus();
      executeActionsWithMonacoEditor(editorRef, actions);
    }
  }, [actions]);

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
        (window as any).monaco.editor.tokenize(tokenizerCode, language);
      }, 1000);
    }
  };

  return (
    <Card>
      <Editor
        path={path}
        width="700px"
        height="500px"
        defaultLanguage={language}
        language={language}
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
        }}
        onMount={handleOnMount}
        onChange={onChangeCode}
      />
    </Card>
  );
}
