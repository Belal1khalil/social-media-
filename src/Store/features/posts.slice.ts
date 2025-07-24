import { postsState } from "@/types/posts.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState:postsState= {
    posts:null,
    postDetails: null,
    userposts: null,

}
import { RootState } from "../store"; // adjust the import path as needed
import axios from "axios";

 export const getposts =createAsyncThunk("posts/getposts", async ( _ , { getState }) => {

   const state = getState() as RootState;
   const token = state.userReducer.token
    const options = {
        url:"https://linked-posts.routemisr.com/posts?limit=50&page=89", 
        method:"GET",
        headers:{
          token,
        }
    }

    const {data} = await axios.request(options)
    return data.posts

})

 export const getpostDetails =createAsyncThunk("posts/getpostDetails", async ( id:string , { getState }) => {

   const state = getState() as RootState;
   const token = state.userReducer.token
    const options = {
        url:`https://linked-posts.routemisr.com/posts/${id}`, 
        method:"GET",
        headers:{
          token,
        }
    }

    const {data} = await axios.request(options)
    return data.post

})

 export const getuserposts = createAsyncThunk("posts/getuserPosts", async ( userId:string , {getState}) => {
       const state = getState() as RootState;
       const token = state.userReducer.token
    
    const options = {
        url:`https://linked-posts.routemisr.com/users/686c1e88fcf033c8b807b02d/posts?limit=2`, 
        method:"GET",
        headers:{
          token,
        }
    }

    const {data} = await axios.request(options)
    
    return data.posts

})
 const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{

    },
    extraReducers: function(builder) {
      builder.addCase(getposts.fulfilled , (state , action)=>{
      state.posts = action.payload 
      });
        builder.addCase(getposts.rejected , (state, action)=>{
         console.log(state, action)
      });

       builder.addCase(getpostDetails.fulfilled , (state , action)=>{
      state.postDetails = action.payload 
      });
        builder.addCase(getpostDetails.rejected , (state, action)=>{
         console.log(state, action)
      });
      builder.addCase(getuserposts.fulfilled , (state , action)=>{
        state.userposts = action.payload 
      });
        builder.addCase(getuserposts.rejected , (state, action)=>{
         console.log(state, action)
      });

    }
})

export const postsReducer = postsSlice.reducer




















