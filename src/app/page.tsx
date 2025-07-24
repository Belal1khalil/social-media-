"use client"
import Loading from "@/Components/loading/Loading";
import PostCard from "@/Components/PostCard/PostCard";
import PostForm from "@/Components/PostForm/PostForm";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getposts } from "@/Store/features/posts.slice";
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';

import { useEffect } from "react";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

export default function Home() {

 


const dispatch =   useAppDispatch();
 const {posts} = useAppSelector((store)=> store.postsReducer)

useEffect(()=>{
  dispatch(getposts())
})

  return (
   <ProtectedRoute>
    <Box>
    <Grid container>
     
     <Grid size={{ xs: 12, md: 6 }} sx={{p:2 , mx:"auto"}}>
      <PostForm/>
      {posts? posts?.map((post)=><PostCard postInfo={post} key={post._id}/>):<Loading/>}
     </Grid>
    
   </Grid>
 </Box>
   </ProtectedRoute>
  );
}
