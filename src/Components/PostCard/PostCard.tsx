'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShareIcon from '@mui/icons-material/Share';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatIcon from '@mui/icons-material/Chat';
import { Post } from '@/types/posts.types';
import Image from 'next/image';
import CommemtCard from '../CommemtCard/CommemtCard';
import { Box, Button, Divider, TextField } from '@mui/material';
import Link from 'next/link';
import {  useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRef } from "react";
import { getpostDetails } from '@/Store/features/posts.slice';





export default function PostCard({postInfo  , showAllcomments= false}:{postInfo:Post , showAllcomments?:boolean}) {
   
  const {token} = useAppSelector((store)=>store.userReducer) 
   const commentRef = useRef<HTMLInputElement>(null); 
  
   const dispatch = useAppDispatch()

    
  async function deletePost(id:string) {
    const toastId = toast.loading("Deleting")
     try {
       const options = {
        url:`https://linked-posts.routemisr.com/posts/${id}`,
        method:"DELETE",
        headers:{
         token,
        }
      }
      const {data} = await axios.request(options)
      if(data.message === "success") {
        toast.success("post Deleted Successfully")
         
      }
     } catch (error) {
      console.log(error)
     } finally {
      toast.dismiss(toastId)
     }
    }

  async function createComment() {
    const content = commentRef.current?.value || "";
    
     
  if (!content) {
    toast.error("Comment cannot be empty.");
    return;
  }
   const toastId = toast.loading("Adding Comment.......")
     try {
       const options= {
        url:"https://linked-posts.routemisr.com/comments",
       method:"POST",
       headers:{
        token,
       },
       data:{
        content,
        post:postInfo._id
       }
    }
    const {data} = await axios.request(options)
   
    if(data.message === "success") {
      toast.success(" Comment created successfully")
      dispatch(getpostDetails(postInfo._id))
      if (commentRef.current) {
        commentRef.current.value = "";
      }
    }

     } catch (error) {
      console.log(error)
     }finally {
      toast.dismiss(toastId)
     }
   }

   

   
 
 
  return (
    <Card sx={{ maxWidth: '85%', mx: 'auto', mt: 3 }}>
      <CardHeader
        avatar={
      <Image 
      src={postInfo.user.photo} 
      width={50}
      height={50}
      style={{
        border: '2px solid #1976d2',
        objectFit: 'cover',
        borderRadius: '50%'
      }}
      alt={`${postInfo.user.name}`}/>
        
        }
        action={
          <IconButton aria-label="settings">
           <>
             <Button 
            variant="outlined"
             color="error"
              onClick={()=>{
                deletePost(postInfo._id)
              }}
             >
                  Delete
               </Button>
               
           </>

          </IconButton>
        }
        title={postInfo.user.name}
        subheader={new Date(postInfo.createdAt).toLocaleDateString()}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postInfo.body}
        </Typography>
      </CardContent>

     {postInfo.image && <CardMedia
        component="img"
        height="250"
        image={postInfo.image}
        alt="Paella dish"
      /> }

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon />
        </IconButton>
        <IconButton aria-label="share">
           <Typography >
             {postInfo.comments.length}
            </Typography>  <ChatIcon sx={{fontSize:"20px" , ml:1}} />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
         <Divider>Comments</Divider>
      <Box sx={{p:2}}>
           {postInfo.comments.length > 0 && !showAllcomments && <CommemtCard commentInfo={postInfo.comments[0]}/>}
           {postInfo.comments.length > 1 && showAllcomments &&  postInfo.comments.map((comment)=><CommemtCard commentInfo={comment} key={comment._id}/>)}
     {!showAllcomments && postInfo.comments.length >1 &&  <Button variant='contained' fullWidth sx={{mt:2}}>
         <Link href={`/post/${postInfo._id}`}>
           show All Comments
         </Link>
      </Button>}
     
      <TextField 
      fullWidth 
      multiline 
      minRows={2} 
      placeholder='Add your comment' 
      sx={{mt:2}}
      inputRef={commentRef}
   
      />
       <Box sx={{ mt:2 , display:"flex" , gap:1, justifyContent:"flex-end"}}>
        <Button
       
       variant='outlined' 
       color="primary"
       onClick={createComment}>
         Add Commemt
       </Button>
        
       

       </Box>
      </Box>
      
    </Card>
  );
}









