import React, { ReactNode } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEditorSettings from "../interfaces/IEditorSettings";

interface EditorState {
  editorSetting: IEditorSettings;
}

const initialState: EditorState = {
  editorSetting: {
    fileLabel: "snippet.ts",
    code: `// My awesome TypeScript function!
export const areEqual = (a: number, b: number): boolean => {
    return a === b;
}`,
    isActive: true,
    language: "typescript",
  },
};

const extractLanguageFromFileLabel = (fileLabel: string): string => {
  const fileLabelSplit = fileLabel.split(".");
  const fileExtension = fileLabelSplit[fileLabelSplit.length - 1];
  switch (fileExtension) {
    case "ts":
      return "typescript";
    case "js":
      return "javascript";
    case "py":
      return "python";
    case "rb":
      return "ruby";
    case "go":
      return "go";
    case "java":
      return "java";
    case "c":
      return "c";
    case "cpp":
      return "cpp";
    case "cs":
      return "csharp";
    case "swift":
      return "swift";
    case "php":
      return "php";
    case "html":
      return "html";
    case "css":
      return "css";
    case "json":
      return "json";
    case "md":
      return "markdown";
    default:
      return ""
  }
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
  },
});

export const { fileLabelEdited, codeEdited } = editorSlice.actions;

export default editorSlice.reducer;
