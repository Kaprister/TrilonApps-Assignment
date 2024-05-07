import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status : false,
    userInfo : localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setCredentials : (state, action) => {
            state.status = true;
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));

        },
        logout : (state) => {
            state.status = false;
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        }
    }
})

export const {setCredentials, logout} = authSlice.actions;

export default authSlice.reducer;