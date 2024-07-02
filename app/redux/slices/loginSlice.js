import cookieCutter from 'cookie-cutter';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Endpoint from '@/app/utils/path/Path';
import { post } from '@/app/utils/query/Query';
const CryptoJS = require("crypto-js");

export const setLogin = createAsyncThunk('login', async (data) => {
  try {
    const response = await post(Endpoint.adminLogin, data)
    return response.data
  }
  catch (error) {
    console.log("=====",error)
    return error.response.data
  }

}

)

const initialStateValues = {
  login:  false,
  success: false,
  isLoading: false,
  data: [],
  isError: false,
  token: "",
  msg : "Network Error"
}

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialStateValues,
  reducers: {
    signout: (state, action) => {
      state.login = false,
      state.sidebar = false,
      cookieCutter.set('auth-x-mit-Deliver-20', false, { expires: new Date(0) })
      cookieCutter.set('login', false, { expires: new Date(0) })
      cookieCutter.set('%%xxx%%%', null, { expires: new Date(0) })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setLogin.pending, (state, action) => {
      state.isLoading = true
    });

    builder.addCase(setLogin.fulfilled, (state, action) => {
        state.isLoading = false,
        state.login = action.payload.success,
        state.data = action.payload,
        state.token = CryptoJS.AES.encrypt(action.payload.token, process.env.NEXT_PUBLIC_TITLE).toString();
    });

    builder.addCase(setLogin.rejected, (state, action) => {
      state.isError = true,
      state.isLoading = false,
      state.msg = "Network Error"
    });

  }
})

// Action creators are generated for each case reducer function
// export const { setlogin } = loginSlice.actions

export const { signout } = loginSlice.actions

export default loginSlice.reducer