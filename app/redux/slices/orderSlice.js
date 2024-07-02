import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { get,post,customget } from "@/app/utils/query/Query";

export const orderToWay = createAsyncThunk('order', async (data) => {
    const response = await post( Endpoint.assignOrderToPickUp,data);
    return response.data
}

)

export const fetchOrder = createAsyncThunk('order', async (data) => {
        const response = await customget( Endpoint.orderListZoneWise,data);
        return response.data
    }

)

export const fetchBulkOrder = createAsyncThunk('bulk-order', async (data) => {
    const response = await customget( Endpoint.bulkOrderListZoneWise,data);
    return response.data
}

)


export const receiveOrder = createAsyncThunk('receive', async (data) => {
    const response = await customget( Endpoint.orderReceive,data);
    return response.data
})


export const receiveBulkOrder = createAsyncThunk('bulk-receive', async (data) => {
    const response = await customget( Endpoint.bulkOrderReceive,data);
    return response.data
})

export const createBulkOrder = createAsyncThunk('bulk-order', async (data) => {
    try {  
     
      const response = await post(Endpoint.postBulkOrder, data)
      return response.data
    }
    catch (error) {
      return error 
    } 
  })


  export const getAllBulkOrder = createAsyncThunk('get-bulk-order', async () => {
    try {  
     
      const response = await get(Endpoint.allBulkOrder)
      console.log(response.data)
      return response.data
    }
    catch (error) {
      return error 
    } 
  })

const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        isError: false,
        data: [],
        bulkdata : [],
        bulk : []
    },
    reducers: {
        setData : (state, action) => {
          state.data = action.payload
        }
      },
    extraReducers: (builder) => {
        builder.addCase(fetchOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        });

        builder.addCase(fetchOrder.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(fetchBulkOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(fetchBulkOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.bulkdata = action.payload
        });

        builder.addCase(fetchBulkOrder.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(receiveOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(receiveOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((item)=>item.id !== action.payload.data.id)   // data.filter((item) => item.id !== thisdata.id)
        });

        builder.addCase(receiveOrder.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(receiveBulkOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(receiveBulkOrder.fulfilled, (state, action) => {
            // console.log(action.payload.data.id)
            state.isLoading = false
            state.data = state.data.filter((item)=>item.id !== action.payload.data.id)   // data.filter((item) => item.id !== thisdata.id)
        });

        builder.addCase(receiveBulkOrder.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(getAllBulkOrder.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getAllBulkOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.bulk = action.payload.bulk_orders
        });

        builder.addCase(getAllBulkOrder.rejected, (state, action) => {
            state.isLoading = false

        });

    }
})

export const { setData } = orderSlice.actions


export default orderSlice.reducer;


