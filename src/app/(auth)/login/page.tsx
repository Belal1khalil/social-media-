'use client';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import {useFormik} from "formik"
import { login } from '@/Store/features/user.slice';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { useRouter } from 'next/navigation';



export default function LoginPage() {

   const dispatch =  useAppDispatch()
   const router =  useRouter()

    useAppSelector((store)=> store.userReducer.token)
    
    const formik = useFormik({
     initialValues:{  
    email:"",
    password:"",
     },
     onSubmit:(values)=>{
        dispatch(login(values)).then((res)=> {
            if(res.payload.message = "success") {
                setTimeout(()=>{
                  router.push("/")
                } , 2000)
            }

        }).catch((error)=>{
          console.log(error)
        })
     },

    })
  return (
    <Box
      sx={{
         my:8,
        backgroundColor: '#e3f2fd',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 450,
          p: 5,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          Login
        </Typography>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            fullWidth
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{
              mt: 1,
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Login
          </Button>

          {/* Sign Up link */}
          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 2 }}
          >
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              style={{
                fontWeight: 'bold',
                color: '#1976d2',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textDecoration = 'none';
              }}
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
}
