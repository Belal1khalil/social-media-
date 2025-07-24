"use client"
import Loading from "@/Components/loading/Loading";
import PostCard from "@/Components/PostCard/PostCard";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks"
import { getpostDetails } from "@/Store/features/posts.slice";
import { use, useEffect } from "react"


export default function Page({params}:{params:Promise<{postId : string}>}) {
  
  
  const dispatch = useAppDispatch();
  const {postId} = use(params)
  console.log(postId)

 


  useEffect(()=>{
   dispatch(getpostDetails(postId))
  } , [])


  const {postDetails} = useAppSelector((store)=>store.postsReducer)

  return (
    <>
    {postDetails ? <PostCard postInfo={postDetails} key={postDetails._id} showAllcomments={true}/>:<Loading/>}
    </>
  )
}
