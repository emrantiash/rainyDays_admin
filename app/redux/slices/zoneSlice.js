import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { get } from "@/app/utils/query/Query";

export const fetchZone = createAsyncThunk('fetchzone', async () => {
        const response = await get( Endpoint.zone);
        return response.data
    }

)

const zoneSlice = createSlice({
    name: "zone",
    initialState: {
        isLoading: false,
        isError: false,
        data: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchZone.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(fetchZone.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        });

        builder.addCase(fetchZone.rejected, (state, action) => {
            state.isError = true

        });

    }
})


export default zoneSlice.reducer;


