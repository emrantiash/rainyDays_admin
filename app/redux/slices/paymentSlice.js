import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '@/app/utils/path/Path';
import { get,customget } from '@/app/utils/query/Query';

export const getMerchantGroup = createAsyncThunk('payment', async () => {
  try {
    const response = await get(Endpoint.mechantGroupForPayment)
    return response.data
  }
  catch (error) {
    return error.response.data
  }}
)

export const getThisMerchant = createAsyncThunk('payment-merchant', async (data) => {
    try {
      const response = await customget(Endpoint.individualMerchantDetails, data)
      return response.data
    }
    catch (error) {
      return error.response.data
    }}
  )

const initialStateValues = {
  login:  false,
  isLoading: false,
  data: [],
  isError: false
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialStateValues,
//   reducers: {
//     signout: (state, action) => {
//       state.login = false,
//       state.sidebar = false,
//       cookieCutter.set('auth-x-mit-Deliver-20', false, { expires: new Date(0) })
//       cookieCutter.set('login', false, { expires: new Date(0) })
//       cookieCutter.set('%%xxx%%%', null, { expires: new Date(0) })
//     }
//   },
  extraReducers: (builder) => {
    builder.addCase(getMerchantGroup.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(getMerchantGroup.fulfilled, (state, action) => {
        state.isLoading = false,
        state.data = action.payload.data
    });

    builder.addCase(getMerchantGroup.rejected, (state, action) => {
      state.isError = true,
      state.isLoading = false,
      state.msg = "Network Error"
    });

  }
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

// export const { signout } = loginSlice.actions

export default paymentSlice.reducer