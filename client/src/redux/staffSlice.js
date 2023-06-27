import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  staff: {},
}

export const counterSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    storeStaffDetails: (state, action) => {
      state.staff = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeStaffDetails } = counterSlice.actions

export default counterSlice.reducer