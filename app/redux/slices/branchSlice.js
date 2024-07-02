import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { get } from "@/app/utils/query/Query";

export const fetchBranch = createAsyncThunk('fetchbranch', async () => {
        const response = await get( Endpoint.area);
        console.log(response.data)
        return response.data
    }

)

const branchSlice = createSlice({
    name: "area",
    initialState: {
        isLoading: false,
        isError: false,
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBranch.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(fetchBranch.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        });

        builder.addCase(fetchBranch.rejected, (state, action) => {
            state.isError = true
            console.log("Erroe", action.payload)
        });

    }
})


export default branchSlice.reducer;


