import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import {api} from "./services/api.ts";
import user from "../features/user/userSlice.tsx"
import {listenerMiddleware} from "../middleware/auth.ts";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    user
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware).prepend(listenerMiddleware.middleware)
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
