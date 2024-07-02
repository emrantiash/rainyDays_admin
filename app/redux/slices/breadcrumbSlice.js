import { createSlice } from '@reduxjs/toolkit';

const initialStateValues = {
  parent: "Dashboard",
  child: ""
}

export const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState: initialStateValues,
  reducers: {
    setbreadcrumb: (state, action) => {
      state.parent = action.payload[0]
      state.child = action.payload[1]
    }
  },
})

// Action creators are generated for each case reducer function
export const { setbreadcrumb } = breadcrumbSlice.actions

export default breadcrumbSlice.reducer