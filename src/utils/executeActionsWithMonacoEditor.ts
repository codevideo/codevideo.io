import { IAction } from "@fullstackcraftllc/codevideo-types";
import * as monaco from "monaco-editor";
import { speakText } from "../components/pages/ai/components/SideBySideEditors";

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
    if (action.name === "type-editor") {
      // for typing, add 100ms delay between each character
      const text = action.value;
      for (let i = 0; i < text.length; i++) {
        editorInstance.trigger("keyboard", "type", { text: text[i] });

        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } else if (action.name === "backspace") {
      // for backspace, add 100ms delay between each backspace
      const count = parseInt(action.value);
      for (let i = 0; i < count; i++) {
        editorInstance.trigger(monaco.KeyCode.Backspace.toString(), 'deleteLeft', null);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } else if (action.name === "speak-before") {
      await speakText(action.value);
    } else if (action.name === "arrow-up") {
      editorInstance.trigger("keyboard", "type", {
        text: String.fromCharCode(38),
      });
    } else if (action.name === "arrow-down") {
      editorInstance.trigger("keyboard", "type", {
        text: String.fromCharCode(40),
      });
    } else if (action.name === "arrow-left") {
      editorInstance.trigger("keyboard", "type", {
        text: String.fromCharCode(37),
      });
    } else if (action.name === "arrow-right") {
      editorInstance.trigger("keyboard", "type", {
        text: String.fromCharCode(39),
      });
    } else if (action.name === "enter") {
      editorInstance.trigger("keyboard", "type", {
        text: String.fromCharCode(13),
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
};
