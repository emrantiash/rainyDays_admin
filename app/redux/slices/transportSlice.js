import cookieCutter from 'cookie-cutter';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '@/app/utils/path/Path';
import { get , post } from '@/app/utils/query/Query';

export const getTransport = createAsyncThunk('transport', async () => {
  try {
    const response = await get(Endpoint.getVans)
    console.log(response.data)
    return response.data
  }
  catch (error) {
    return error.response.data
  }

}

)

const initialStateValues = {
 
  isLoading: false,
  data: [],
 
}

export const transportSlice = createSlice({
  name: 'transport-slice',
  initialState: initialStateValues,
  
  extraReducers: (builder) => {
    builder.addCase(getTransport.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getTransport.fulfilled, (state, action) => {
        state.isLoading = false,
        state.data = fixTheData(action.payload.data)
    });

    builder.addCase(getTransport.rejected, (state, action) => {
      state.isError = true,
      state.isLoading = false
    });

  }
})



export default transportSlice.reducer

function fixTheData(data){
    let arr = []
    data.map((data, index) =>
        arr.push(
            {
                id: data.id,
                name: data.number


            }
        )
    )


    return arr;
}