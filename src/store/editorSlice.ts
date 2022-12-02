import React, { ReactNode } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEditorSettings from "../interfaces/IEditorSettings";

interface EditorState {
  editorSetting: IEditorSettings;
}

const initialState: EditorState = {
  editorSetting: {
    fileLabel: "state.ts",
    code: `// My awesome TypeScript function!
export const myFunction = (a: number, b: number) => {
    return a + b;
}`,
    isActive: true,
  },
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    tabClicked: (state, action: PayloadAction<{ fileLabel: string }>) => {
      const { fileLabel } = action.payload;
      state.editorSetting = {
        ...state.editorSetting,
        fileLabel,
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

export const { tabClicked, codeEdited } = editorSlice.actions;

export default editorSlice.reducer;
