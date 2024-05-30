import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import axios from "axios";

interface UserSliceState {
    isAuth: boolean;
    token: string | null;
    user: AuthUserData | null;
    id: AuthUserData | null;
    isOpenQuick: boolean;
    qCard: QuickCard | null;
}

type AuthUserData = {
    //token: string,
    user_nicename: string,
    userEmail: string,
    user_phone: string,
    id: number
}
type QuickCard = {
  id: number,
  sku: string,
  slug: string,
  name: string,
  img: string,
  description: string,
  ml: string,
  price: number
}
type User = {
    username: string,
    email: string,
    password: string,
    acf: {
        user_phone: string
    }
}

const initialState: UserSliceState = {
    isAuth: false,
    token: '',
    user: null,
    id: null,
    isOpenQuick: false,
    qCard: null
}
export const registerUser = createAsyncThunk("user/registerUser", async (params: User) => {
   
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/customers/registerCustomer`, params);
      return data.response;
    } catch (e: any) {
      console.log(e.message);
    }
  });

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setQcard: (state, action)=>{
      state.qCard = action.payload;
    },
    openQuick: (state) => {
      state.isOpenQuick = true;
    },
    closeQuick: (state) => {
      state.isOpenQuick = false;
    },
    setAuth: (state, action) => {
        state.isAuth = action.payload;
    },
    setUser: (state, action) => {
        state.user = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUserId: (state, action) => {
        state.id = action.payload;
    },
    setUserPhone: (state, action) => {
      if(state.user) state.user.user_phone = action.payload;
    },
    setUserName: (state, action) => {
      if(state.user) state.user.user_nicename = action.payload;
    },
    logout: (state)=>{
        state.isAuth = false;
        state.user = null;
        state.token = null;
        state.id = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user_nicename");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("user_phone");
        
      },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
    })
    builder.addCase(registerUser.fulfilled, (state, action) => {
    })
    builder.addCase(registerUser.rejected, (state) => {
    })
  }
});

export const selectUser = (state: RootState) => state.user;
//export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find((obj: any) => obj.id === id);
export const { setAuth, setUser, logout, setUserId, setToken, setUserPhone, setUserName, openQuick, closeQuick, setQcard } = userSlice.actions;
export default userSlice.reducer;
