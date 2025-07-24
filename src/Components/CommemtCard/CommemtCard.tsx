import { Comment } from '@/types/posts.types'
import { Box, Button, CardHeader,  Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image';
import user from "../../../assests/imgs/user (1).png"
import { useAppSelector } from '@/hooks/store.hooks';
import axios from 'axios';
import toast from 'react-hot-toast';



export default function CommemtCard({commentInfo}:{commentInfo: Comment}) {
    const {token} = useAppSelector((store)=>store.userReducer)
     
  
    function handlepath(path:string) {
    if(path.includes("undefined")) return user;
    else return path
   }

   async function deleteComment(id:string) {
    const options= {
      url:`https://linked-posts.routemisr.com/comments/${id}`,
      method:"DELETE",
      headers:{
        token,
      }
       
    }
      const {data} =  await axios.request(options)
       if(data.message === "success") {
        toast.success(" Comment Deleted Successfully")
       } else {
        toast.error(data?.message)
       }
   }

   
 
 
 
    return (
   <>
   <Box sx={{bgcolor:"#f1f1f1",  px:3 , py:2 , borderRadius:"8px" , mt:2}}>
       <CardHeader
        avatar={
        <Image src={handlepath(commentInfo.commentCreator.photo)} width={50} height={50} alt={`${commentInfo.commentCreator.name}`}/>
        }
        action={
           <>
            <Button 
            variant="outlined"
             color="error"
             onClick={() => deleteComment(commentInfo._id)}
             >
                Delete
              </Button>
              </>
              
              
        }
        title={commentInfo.commentCreator.name}
        subheader={new Date(commentInfo.createdAt).toLocaleDateString()}
      /> 
      <Typography component={"p"} sx={{pl:5}}>
       {commentInfo.content}
      </Typography>
      
   </Box>

   
   </>
  )
}
