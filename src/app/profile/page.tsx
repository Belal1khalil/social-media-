'use client';

import {
  Box,
  Paper,
  Typography,
  Avatar,
  Stack,
  Divider,
  Button,
  TextField,
  Collapse,
} from '@mui/material';
import {
  
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarMonth as CalendarMonthIcon,
  Wc as WcIcon,
  Cake as CakeIcon,
  Upload as UploadIcon,
} from '@mui/icons-material';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import Loading from '@/Components/loading/Loading';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/store.hooks';

type User = {
  _id: string;
  photo?: string;
  name: string;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  bio?: string;
  location?: string;
  image?: { secure_url?: string };
  createdAt: string;
  
};


export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { token } = useAppSelector((store) => store.userReducer)



  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        'https://linked-posts.routemisr.com/users/profile-data',
        { headers: { token } }
      );
      if (data.message === 'success') {
        setUser(data.user);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  };

  async function changePassword(values: { password: string; newPassword: string }) {
    const toastId = toast.loading('Updating Password');
    try {
      const options = {
        url: 'https://linked-posts.routemisr.com/users/change-password',
        method: 'PATCH',
        headers: {
          token,
        },
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message === 'success') {
        toast.success('Password Updated Successfully');
      }
    } catch (error) {
      toast.error('Failed to update password');
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function uploadPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    const toastId = toast.loading('Uploading image...');
    try {
      const { data } = await axios.put(
        'https://linked-posts.routemisr.com/users/upload-photo',
        formData,
        {
          headers: {
            token: token!,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (data.message === 'success') {
        toast.success('Image uploaded successfully');
        getUserData(); // Refresh profile image
      }
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
    },
    onSubmit: (values) => {
      changePassword(values);
    },
  });

  useEffect(() => {
    getUserData();
  }, []);

  if (!user) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="#e3f2fd"
      >
        <Loading/>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#e3f2fd',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '90vw',
          maxWidth: 1000,
          height: '90vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'auto',
          borderRadius: 4,
        }}
      >
        {/* Avatar Section */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#bbdefb',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 3,
          }}
        >
          <Avatar
            src={user.photo || '/default-avatar.png'}
            alt={user.name}
            sx={{
              width: 200,
              height: 200,
              border: '5px solid #1976d2',
            }}
          />

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={uploadPhoto}
            style={{ display: 'none' }}
          />

          <Button
            variant="outlined"
            startIcon={<UploadIcon />}
            sx={{ mt: 2 }}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Photo
          </Button>
        </Box>

        {/* Info Section */}
        <Box
          sx={{
            flex: 2,
            backgroundColor: '#fff',
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
          }}
        >
              <Typography variant="h4" fontWeight="bold" sx={{textAlign:"center"}}>
                     userProfile:
               </Typography>
          <Typography variant="h4" fontWeight="bold">
             {user.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon fontSize="small" />
            <Typography>{user.email}</Typography>
          </Stack>

          {user.phone && (
            <Stack direction="row" spacing={1} alignItems="center">
              <PhoneIcon fontSize="small" />
              <Typography>{user.phone}</Typography>
            </Stack>
          )}

          {user.gender && (
            <Stack direction="row" spacing={1} alignItems="center">
              <WcIcon fontSize="small" />
              <Typography>{user.gender}</Typography>
            </Stack>
          )}

          {user.dateOfBirth && ( 
            <Stack direction="row" spacing={1} alignItems="center">
              <CakeIcon fontSize="small" />
              <Typography>{user.dateOfBirth}</Typography>
            </Stack>
          )}

          <Button variant='contained' sx={{width:"75%" , mx:"auto"} }>
           <Link href={`/userposts/${user._id}`}>
                View posts
           </Link>
          </Button>
          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary">
            <CalendarMonthIcon sx={{ mr: 1 }} fontSize="small" />
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </Typography>

          <Button
            variant="contained"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </Button>

          <Collapse in={showPasswordForm}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2} mt={2}>
                <TextField
                  type="password"
                  label="Password"
                  onChange={formik.handleChange}
                  name="password"
                  value={formik.values.password}
                />
                <TextField
                  type="password"
                  label="New Password"
                  onChange={formik.handleChange}
                  name="newPassword"
                  value={formik.values.newPassword}
                />
                <Button variant="contained" type="submit">
                  Submit Change
                </Button>
              </Stack>
            </form>
          </Collapse>
        </Box>
      </Paper>
    </Box>
  );
}
