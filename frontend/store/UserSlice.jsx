import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    data: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.data = action.payload;
        }
    }
});
 
export const { login } = authSlice.actions;
export default authSlice.reducer;
