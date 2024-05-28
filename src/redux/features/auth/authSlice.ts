import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
   id: string;
   username: string;
   iat: number;
   exp: number;
   role: string;
};

type TAuthState = {
   user: null | TUser;
   token: null | string;
};

const initialState: TAuthState = {
   user: null,
   token: null,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setUser: (state, action) => {
         const { user, token } = action.payload;
         state.user = user;
         state.token = token;
      },

      logout: (state) => {
         state.user = null;
         state.token = null;
      },
   },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
