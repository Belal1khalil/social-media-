import { Box, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppSelector } from "@/hooks/store.hooks";
import { useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function PostForm() {
  const { token } = useAppSelector((store) => store.userReducer);

  const postContentRef = useRef<HTMLInputElement>(null);
  const postFileRef = useRef<HTMLInputElement>(null);

 

  async function createPost() {
    const content = postContentRef.current?.value || "";
    const file = postFileRef.current?.files?.[0];
    const postData = new FormData();
    postData.append("body", content);

    if(!content && !file) {
      toast.error("Post cannot be empty")
      return;
    }

    if (file) {
      postData.append("image", file); 
    }
    const toastId = toast.loading("Creating Post")
    try {
      const options = {
        url:"https://linked-posts.routemisr.com/posts",
        method:"POST",
        headers:{
            token
        },
        data:postData

      }
      const {data} = await axios.request(options)
      if(data.message === "success") {
        toast.success("post created successfully")
      }
  
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      toast.dismiss(toastId)
    }
  }

  return (
    <Box sx={{ width: "75%", mx: "auto" }}>
      <TextField
        fullWidth
        multiline
        minRows={7}
        placeholder="What's on your mind?"
        inputRef={postContentRef}
      />

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload Photo
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            ref={postFileRef}
          />
        </Button>

        <Button
          onClick={createPost}
          variant="contained"
          endIcon={<SendIcon />}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
}
