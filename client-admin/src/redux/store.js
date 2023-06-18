import { configureStore } from '@reduxjs/toolkit'
import staffReducer from './staffSlice'


export const store = configureStore({
  reducer: {
    staff: staffReducer,
  },
})