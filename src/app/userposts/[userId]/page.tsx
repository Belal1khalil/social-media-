"use client"
import Loading from '@/Components/loading/Loading'
import PostCard from '@/Components/PostCard/PostCard'
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks'
import { Post } from '@/types/posts.types'
import { Box, Typography } from '@mui/material'
import React, { use, useEffect  } from 'react'
import { getuserposts } from "@/Store/features/posts.slice";

export default function Page({params}:{params:Promise<{userId : string}>}) {
     const dispatch = useAppDispatch()

      const {userId} = use(params)
  
     
        const userposts = useAppSelector((store)=>store.postsReducer.userposts)
        
 
      useEffect(()=>{
      dispatch(getuserposts(userId))
      } , [userposts])


  return (
    <>
     {userposts === null ? (
      <Loading/>
     ) : userposts.length === 0 ? (
           <Box
        sx={{
          textAlign: "center",
          mt: 8,
          color: "text.secondary",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold">No Posts Yet</Typography>
        <Typography variant="body1">
          You haven’t shared anything yet. Start by creating your first post!
        </Typography>
        <Typography fontSize="40px">📝</Typography>
      </Box>
     ): (
      userposts?.map((post:Post)=><PostCard postInfo={post} key={post._id}/>)
     )
     }
     </>
  )
}









































//  const {token} = useAppSelector((store)=>store.userReducer)
//      const [posts , setPosts] = useState<Post[] | null>(null)

//   async  function getUserPost({id: string}) {
//        try {
//          const options= {
//             url:`https://linked-posts.routemisr.com/users/${id}/posts`,
//             method:"GET",
//             headers:{
//                 token,
//             }
//         }
//           const {data} = await axios.request(options)
//           setPosts(data.posts)
    
//        } catch (error) {
//         console.log(error)
//        }
//     }

//     useEffect(()=>{
//        getUserPost()
//     } , [])