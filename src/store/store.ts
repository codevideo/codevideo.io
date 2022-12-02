import { configureStore } from "@reduxjs/toolkit"
import editorReducer from './editorSlice'

const createStore = () =>
  configureStore({
    reducer: {
      editor: editorReducer,
    },
  })

type ConfiguredStore = ReturnType<typeof createStore>
type StoreGetState = ConfiguredStore["getState"]
export type RootState = ReturnType<StoreGetState>
export type AppDispatch = ConfiguredStore["dispatch"]

export default createStore
