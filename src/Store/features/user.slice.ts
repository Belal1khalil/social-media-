
import { userState } from "@/types/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
import toast from "react-hot-toast";

 const initialState:userState = {
    token: localStorage.getItem("token")|| "" ,
 }
  ///////////// handle login
   export const login = createAsyncThunk("user/login" , async (values:{email:string , password:string}) =>{
    const options = {
      url:"https://linked-posts.routemisr.com/users/signin",
      method:"POST",
      data:values,
    }
    const { data } = await axios.request(options)
     return data;
  })

  /////////// handle signup
   
   export const signup = createAsyncThunk("user/signup" , async (values:{email:string , password:string ,rePassword:string ,dateOfBirth: string; gender: string}) =>{
    const options = {
      url:"https://linked-posts.routemisr.com/users/signup",
      method:"POST",
      data:values,
    }
    const { data } = await axios.request(options)
    return data;
  })



 const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers: function(builder) {
      builder.addCase(login.fulfilled , (state , action )=>{
        state.token = action.payload.token;
        localStorage.setItem("token" , action.payload.token)
        toast.success(`welcome back`) 
      });

       builder.addCase(login.rejected ,  ()=>{
        toast.error(`Incorrect Email or Password`) 
      });

      builder.addCase(signup.fulfilled , (state , action)=> {
         if(action.payload.message === "success") {
          toast.success("Account Created Successfully")
         } 
      });

        builder.addCase(signup.rejected ,  (state , action)=>{
            console.log("rejected")
          console.log( state , action)
      
      });

     
    }
})

 export const userReducer = userSlice.reducer

