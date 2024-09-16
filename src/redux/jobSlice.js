import { createSlice } from "@reduxjs/toolkit";

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, 
//typically defined together in a single file.
const jobSlice = createSlice({
    name:"job",
    initialState:{
        jobs:[],
        singleJob:null,
        searchRecruiterJobByText:"",
        recruiterJobs:[],
        appliedJobs:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setJobs:(state,action)=>{
            state.jobs = action.payload
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload
        },
        setSearchRecruiterJobByText:(state,action)=>{
            state.searchRecruiterJobByText = action.payload
        },
        setRecruiterJobs:(state,action)=>{
            state.recruiterJobs = action.payload
        },
        setAppliedJobs:(state,action)=>{
            state.appliedJobs = action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload
        }
    }
})

export const {setJobs,setSingleJob,setSearchRecruiterJobByText,setRecruiterJobs,setAppliedJobs,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;