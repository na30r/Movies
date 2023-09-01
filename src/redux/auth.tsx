import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: authstate = {
  isAuthenticated: false,
  user: null,
};
interface authstate {
  isAuthenticated: boolean;
  user: User | null;
}
export interface User {
  fullname: string;
  email: string;
  phone: string;
  location: string;
  description: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: any, action: PayloadAction<User>) => {
      console.log(action, "asd");
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state: any) => {
      console.log("first");
      state.isAuthenticated = false;
      state.user = null;
    },
    setProfileInfo: (state: any, action: any) => {
      state.user = action.payload;
    },
  },
});

export const selectIsAuthenticated = (state: any) => state.auth.isAuthenticated;

export const { login, logout, setProfileInfo } = authSlice.actions;

export default authSlice.reducer;
