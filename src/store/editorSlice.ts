import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEditorSettings from "../interfaces/IEditorSettings";

interface EditorState {
  editorSetting: IEditorSettings;
}

const initialState: EditorState = {
  editorSetting: {
    fileLabel: "areEqual.ts",
    code: `/**
* Compares two numbers for strict equality.
* 
* @param a - The first number to compare
* @param b - The second number to compare
* @returns True if the numbers are strictly equal, false otherwise
*/
export const areEqual = (a: number, b: number): boolean => {
    return a === b;
}`,
    isActive: true,
    language: "typescript",
  },
};

const extractLanguageFromFileLabel = (fileLabel: string): "javascript" | "typescript" | "python" | "css" | "html" => {
  const fileLabelSplit = fileLabel.split(".");
  const fileExtension = fileLabelSplit[fileLabelSplit.length - 1];
  switch (fileExtension) {
    // case "sh":
    //   return "bash";
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "py":
      return "python";
    // case "rb":
    //   return "ruby";
    // case "go":
    //   return "go";
    // case "java":
    //   return "java";
    // case "c":
    //   return "c";
    // case "cpp":
    //   return "cpp";
    // case "cs":
    //   return "csharp";
    // case "swift":
    //   return "swift";
    // case "php":
    //   return "php";
    case "html":
      return "html";
    case "css":
      return "css";
    // case "json":
    //   return "json";
    // case "md":
    //   return "markdown";
    // default:
    //   return ""
  }
  return "javascript";
}

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    fileLabelEdited: (state, action: PayloadAction<{ fileLabel: string }>) => {
      const { fileLabel } = action.payload;
      const language = extractLanguageFromFileLabel(fileLabel);
      state.editorSetting = {
        ...state.editorSetting,
        fileLabel,
        language
      };
    },
    codeEdited: (state, action: PayloadAction<{ code: string }>) => {
      const { code } = action.payload;
      state.editorSetting = {
        ...state.editorSetting,
        code,
      };
    },
    setLanguage: (state, action: PayloadAction<{ language: "javascript" | "typescript" | "python" | "css" | "html" }>) => {
      const { language } = action.payload;
      state.editorSetting = {
        ...state.editorSetting,
        language,
      };
    },
  },
});

export const { fileLabelEdited, codeEdited, setLanguage } = editorSlice.actions;

export default editorSlice.reducer;
