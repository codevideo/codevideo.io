import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArrayOfTwoOrMore } from "../types/ArrayOfTwoOrMore";
import Engine from "../enums/Engine";
import { MimicTypos } from "@fullstackcraftllc/codevideo-frontend";

interface VideoState {
  height: number;
  width: number;
  gradientColors: ArrayOfTwoOrMore<string>;
  mimicTypos: MimicTypos
  engine: Engine
}

const initialState: VideoState = {
  width: 1920,
  height: 1080,
  gradientColors: ["#91ffd9", "#f5ff97"],
  mimicTypos: MimicTypos.SOMETIMES,
  engine: Engine.FRONTEND
};

export const videoSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setDimensions: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setGradientColors: (
      state,
      action: PayloadAction<ArrayOfTwoOrMore<string>>
    ) => {
      state.gradientColors = action.payload;
    },
    setMimicTypos: (
      state,
      action: PayloadAction<any>
    ) => {
      state.mimicTypos = action.payload;
    },
    setEngine: (
      state,
      action: PayloadAction<Engine>
    ) => {
      state.engine = action.payload;
    },
    resetVideoSettings: () => initialState,
  },
});

export const { setDimensions, setGradientColors, setMimicTypos, setEngine, resetVideoSettings } = videoSlice.actions;

export default videoSlice.reducer;
