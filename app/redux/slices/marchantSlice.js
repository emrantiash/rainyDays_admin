import cookieCutter from 'cookie-cutter';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '@/app/utils/path/Path';
import { get ,post,customget ,put } from '@/app/utils/query/Query';

export const getWaightRange = createAsyncThunk('waight', async (token) => {
  try {
    const response = await get(Endpoint.weightRanges, token)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const getMarchant = createAsyncThunk('marchantSlice', async (data) => {
  try {
    const response = await customget(Endpoint.appliedMarchant, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const getAllMarchant = createAsyncThunk('all- marchant', async (data) => {
  try {
    const response = await get(Endpoint.getAllMerchant, data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }
})

export const approveMarchant = createAsyncThunk('marchantSlice', async (data) => {

    try {
      const response = await put(Endpoint.approveMarchant, data)
      return response.data
    }
    catch (error) {
      return error.response.data
    }
  })

  

  export const findMarchantID = createAsyncThunk('find', async (data) => {
    try {  
     
      const response = await customget(Endpoint.findMarchantId, data)
      console.log(response.data)
      return response.data
    }
    catch (error) {
      return error 
    }
  
  })

  export const createOrder = createAsyncThunk('create-order', async (data) => {
    try {  
     
      const response = await post(Endpoint.createOrder, data)
      console.log(response.data)
      return response.data
    }
    catch (error) {
      return error 
    }
  
  })

const initialStateValues = {
  isLoading: false,

}

export const marchantSlice = createSlice({
  name: 'marchant',
  initialState: initialStateValues,

  extraReducers: (builder) => {
    builder.addCase(getMarchant.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getMarchant.fulfilled, (state, action) => {
        state.isLoading = false

    });

    builder.addCase(getMarchant.rejected, (state, action) => {
      state.isLoading = false
    });

  }
})



// export const { signout } = loginSlice.actions

export default marchantSlice.reducer