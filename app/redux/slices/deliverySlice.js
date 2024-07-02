import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { post,get,customget } from "@/app/utils/query/Query";


export const getDeliveryEmployee = createAsyncThunk('delivery-get', async () => {

    try {
        const response = await get(Endpoint.getDeliveryMan)
        return response.data
    }
    catch (error) {
       return error
    }
}
)



const deliverySlice = createSlice({
    name: "deloveryEmployee",
    initialState: {
        isLoading: false,
        isError: false,
        success : false ,
        data: [],
        error : "",
       
    },
    reducers: {
        appendAreaObject: (state, action) => {
          state.makeAreaObj = [...state.makeAreaObj ,action.payload]
        },
        appendArea: (state, action) => {
            state.area = [...state.area ,action.payload]
          },
          setThisPickUpEmployee : (state,action)=>{
            state.pickupman = action.payload 
          }
      },
    
    extraReducers: (builder) => {
        builder.addCase(getDeliveryEmployee.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getDeliveryEmployee.fulfilled, (state, action) => {
            state.isLoading = true,
            state.success =  true ,
            state.data = makeTheData(action.payload.data)

        });

        builder.addCase(getDeliveryEmployee.rejected, (state, action) => {
            state.isError = true
        });

      
    }

    
})

//  export const { appendArea,appendAreaObject,setThisPickUpEmployee } = pickupSlice.actions
export default deliverySlice.reducer;



function makeTheData(data){
    let arr = []
    data.map((data, index) =>
        arr.push(
            {
                id: data.id,
                name: data.name


            }
        )
    )


    return arr;
}
