import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MimicTypos from "../enums/MimicTypos";
import { ArrayOfTwoOrMore } from "../types/ArrayOfTwoOrMore";

interface VideoState {
  height: number;
  width: number;
  gradientColors: ArrayOfTwoOrMore<string>;
  mimicTypos: MimicTypos
}

const initialState: VideoState = {
  width: 960,
  height: 540,
  // width: 1920,
  // height: 1080,
  gradientColors: ["#91ffd9", "#f5ff97"],
  mimicTypos: MimicTypos.NEVER
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
      action: PayloadAction<MimicTypos>
    ) => {
      state.mimicTypos = action.payload;
    }
  },
});

export const { setDimensions, setGradientColors, setMimicTypos } = videoSlice.actions;

export default videoSlice.reducer;
