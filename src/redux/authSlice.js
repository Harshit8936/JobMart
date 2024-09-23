import { createSlice } from "@reduxjs/toolkit";
//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, 
//typically defined together in a single file.

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null
    },
    reducers:{
        // actions
        setLoading:(state,action) =>{
            state.loading = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        }
    }
})


export const {setLoading,setUser} = authSlice.actions;
export default authSlice.reducer;
