import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '../../utils/path/Path';
import { post,get,customget } from "@/app/utils/query/Query";


export const getPickUpEmployee = createAsyncThunk('pickupget', async () => {

    try {
        const response = await get(Endpoint.pickupEmployee)
        console.log(response.data)
        return response.data
    }
    catch (error) {
       return error
    }
}
)

export const addPickUpEmployee = createAsyncThunk('pickupadd', async (data) => {

    try {
        const response = await post(Endpoint.addPickUpEmployee, data)
        return response.data
    }
    catch (error) {
        return error
    }
}
)

export const getPickUpArea = createAsyncThunk('areaget', async (data) => {
    try {
        const response = await customget(Endpoint.getPickUpEmoloyeeArea, data)
        console.log(response.data)
        return response.data
    }
    catch (error) {
        return error
    }
}
)

export const assignArea = createAsyncThunk('areaassign', async (data) => {
    console.log("action==",data)

    try {
        const response = await post(Endpoint.assignAreaToPickupEmployee, data)
        return response.data
    }
    catch (error) {
        return error
    }
}
)

const pickupSlice = createSlice({
    name: "pickupEmployee",
    initialState: {
        isLoading: false,
        isError: false,
        success : false ,
        data: [],
        error : "",
        makeAreaObj : {},
        area :[],
        pickupman : ""
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
        builder.addCase(getPickUpEmployee.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getPickUpEmployee.fulfilled, (state, action) => {
            state.isLoading = true,
            state.success =  true ,
            state.data = action.payload.data,
            state.error = action.payload

        });

        builder.addCase(getPickUpEmployee.rejected, (state, action) => {
            state.isError = true
            console.log("Error=", action)
        });

        builder.addCase(addPickUpEmployee.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(addPickUpEmployee.fulfilled, (state, action) => {
            state.isLoading = false,
            state.success =  action.payload && action.payload.success 
            

        });

        builder.addCase(addPickUpEmployee.rejected, (state, action) => {
            state.isError = true
        });

        builder.addCase(assignArea.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(assignArea.fulfilled, (state, action) => {
            state.isLoading = false,
            state.success =   action.payload.success 
            

        });

        builder.addCase(assignArea.rejected, (state, action) => {
            state.isError = true
        });

        builder.addCase(getPickUpArea.pending, (state, action) => {
            state.isLoading = true
        });

        builder.addCase(getPickUpArea.fulfilled, (state, action) => {
            state.isLoading = false,
            state.success =   action.payload.success ,
            state.area = makeTheData(action.payload.data[0].areas)
            

        });

        builder.addCase(getPickUpArea.rejected, (state, action) => {
            state.isError = true,
            state.isLoading = false
        });

    },

    
})

 export const { appendArea,appendAreaObject,setThisPickUpEmployee } = pickupSlice.actions
export default pickupSlice.reducer;



function makeTheData(data){
    let arr = []
    data.map((data, index) =>
        arr.push(
            {
                id: data.id,
                name: data.name,
                branch : data.branch.name,
                zone : data.branch.zone.name == 'Dhaka South' ? 'DS' : 'DN'


            }
        )
    )


    return arr;
}
