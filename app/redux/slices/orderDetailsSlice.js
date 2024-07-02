import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { get,post,customget } from "@/app/utils/query/Query";



export const orderDetails = createAsyncThunk('basic-order-details', async (data) => {
    const response = await customget( Endpoint.orderDetais,data);
    return response.data
}
)

export const orderDetailsBranchStore = createAsyncThunk('basic-order-details-status', async (data) => {
    const response = await customget( Endpoint.orderDetais,data);
    return response.data
}

)

export const orderDetailsDataGeneral = createAsyncThunk('basic-order-details-status-general', async (data) => {
    const response = await customget( Endpoint.orderDetais,data);
    return response.data
}

)

export const receiveOrderUpcoming = createAsyncThunk('receive-upcoming', async (data) => {
    const response = await customget( Endpoint.orderReceive,data);
    return response.data
})

export const storeOrderBranchWise = createAsyncThunk('order-details', async (data) => {
    const response = await customget( Endpoint.orderListDetailsBranchWise,data);
    return response.data
}

)

export const sendToHold = createAsyncThunk('send', async (data) => {
    const response = await customget( Endpoint.orderReceive,data);
    return response.data
})

export const assignToDeliveryMan = createAsyncThunk('slice', async (data) => { 
     const response = await post( Endpoint.assignOrderToDeleveryMan,data);
    return response.data
})



const orderDetailsSlice = createSlice({
    name: "order-details",
    initialState: {
        isLoading: false,
        isError: false,
        data: [],
        orderData : [],
        assignToDeliveryMan : [],
        storeOrderData : [],
        thisdata : [],
        msg : "",
        assign2DeleveryData : [],receivedByDeleveruManData : []
       
    },
    reducers: {
        setData : (state, action) => {
          state.data = []
        },
        sliceStoreData : (state,action)=>{
            state.thisdata = action.payload
        },
        assign2DeleveryData : (state,action)=>{
            state.assign2DeleveryData = action.payload
        },
        receivedByDeleveruManData : (state,action)=>{
            state.receivedByDeleveruManData = action.payload
        }
      },
    extraReducers: (builder) => {
        builder.addCase(assignToDeliveryMan.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(assignToDeliveryMan.fulfilled, (state, action) => {
            state.isLoading = false

        });

        builder.addCase(assignToDeliveryMan.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(receiveOrderUpcoming.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(receiveOrderUpcoming.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderData = state.orderData.filter((item)=>item.id !== action.payload.data.id)   // data.filter((item) => item.id !== thisdata.id)
        });

        builder.addCase(receiveOrderUpcoming.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(orderDetailsBranchStore.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(orderDetailsBranchStore.fulfilled, (state, action) => {
            state.isLoading = false
            state.storeOrderData = action.payload.data
        });

        builder.addCase(orderDetailsBranchStore.rejected, (state, action) => {
            state.isError = true

        }); 

        builder.addCase(orderDetails.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(orderDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.orderData = action.payload.data
        });

        builder.addCase(orderDetails.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(storeOrderBranchWise.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(storeOrderBranchWise.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload.data
        });

        builder.addCase(storeOrderBranchWise.rejected, (state, action) => {
            state.isError = true

        });

        builder.addCase(sendToHold.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(sendToHold.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = state.data.filter((item)=>item.id !== action.payload.data.id)   // data.filter((item) => item.id !== thisdata.id)
        });

        builder.addCase(sendToHold.rejected, (state, action) => {
            state.isError = true
            state.msg = action

        });

      

    }
})

 export const { setData,sliceStoreData,assign2DeleveryData,receivedByDeleveruManData } = orderDetailsSlice.actions


export default orderDetailsSlice.reducer;