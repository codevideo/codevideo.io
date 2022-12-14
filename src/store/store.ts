import { configureStore } from "@reduxjs/toolkit"
import editorReducer from './editorSlice'
import videoReducer from './videoSlice'

const createStore = () =>
  configureStore({
    reducer: {
      editor: editorReducer,
      video: videoReducer,
    },
  })

type ConfiguredStore = ReturnType<typeof createStore>
type StoreGetState = ConfiguredStore["getState"]
export type RootState = ReturnType<StoreGetState>
export type AppDispatch = ConfiguredStore["dispatch"]

export default createStore
