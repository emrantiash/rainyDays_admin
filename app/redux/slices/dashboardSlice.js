import cookieCutter from 'cookie-cutter';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '@/app/utils/path/Path';
import { get ,customget } from '@/app/utils/query/Query';

export const getDashboardInfo = createAsyncThunk('dash', async (data) => {
  try {
    const response = await get(Endpoint.dashboard, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const branchDashboard = createAsyncThunk('branch-dashboard', async (data) => {
  const response = await get(Endpoint.branchDashboard);
  return response.data
})


export const branchDashboardScanData = createAsyncThunk('branch-dashboard-scan', async (data) => {
  const response = await customget(Endpoint.receiveInBranch,data);
  return response.data
})



const initialStateValues = {
  isLoading: false,
  condition : "",
  dashboard : [],
  data : [],
  title : ""

}



export const dashboardSlice = createSlice({
  name: 'login',
  initialState: initialStateValues,
  reducers: {
    dashboardData: (state, action) => {
      state.condition = action.payload[0],
      state.data = action.payload[1],
      state.title = action.payload[2]
    },

    fixCount : (state,action) =>{
      state.data.count = state.data.count - 1 
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getDashboardInfo.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getDashboardInfo.fulfilled, (state, action) => {
        state.isLoading = false,
        state.dashboard = action.payload.data

    });

    builder.addCase(getDashboardInfo.rejected, (state, action) => {
      state.isLoading = false
    });

  }
})



 export const { dashboardData ,fixCount} = dashboardSlice.actions

export default dashboardSlice.reducer