'use client';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useFormik } from "formik";
import { useAppDispatch } from "@/hooks/store.hooks";
import { signup } from "@/Store/features/user.slice";
import { object, ref, string } from "yup";
import { useRouter } from "next/navigation";



export default function SignupPage() {
  const diapatch = useAppDispatch()
  const router = useRouter()
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  

        const validationSchema = object({
            name:string().required("Name is required").min(3,"Name must be at least 3 char").max(25,"Name can not be more than 25 char"),
            email:string().required("email is required").email("Email is invalid"),
            password:string().required("Password is Required").matches(passwordRegex , "At least 8 characters At least one uppercase letter At least one lowercase letter At least one number At least one special character"),
            rePassword:string().required("Confirm password is required").oneOf([ref("password")]),
        })

        const formik = useFormik({
          initialValues:{
          name: "",
          email:"",
          password:"",
          rePassword:"",
          dateOfBirth:"",
          gender:""
      },
        validationSchema,
        onSubmit: (values)=>{
          diapatch(signup(values)).then((res)=>{
           if(res.payload.message === "success") {
              setTimeout(()=>{
                   router.push("/login")
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
        backgroundColor: "#e3f2fd", // soft blue background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Create Account
        </Typography>

        <form style={{ display: "flex", flexDirection: "column", gap: "20px" }} onSubmit={formik.handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            value = {formik.values.name}
            onChange={formik.handleChange}
            name = "name"

            
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            required
            value = {formik.values.email}
            onChange={formik.handleChange}
            name = "email"
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value = {formik.values.password}
            onChange={formik.handleChange}
            name = "password"
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type="password"
            required
            value = {formik.values.rePassword}
            onChange={formik.handleChange}
            name = "rePassword"
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            required
            value = {formik.values.dateOfBirth}
            onChange={formik.handleChange}
            name = "dateOfBirth"
          />
          <TextField
            select
            label="Gender"
            fullWidth
            variant="outlined"
            defaultValue=""
            required
            value = {formik.values.gender}
            onChange={formik.handleChange}
            name = "gender"
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>

          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            Already have an account?{' '}
            <Link
              href="/login"
              style={{
                fontWeight: "bold",
                color: "#1976d2",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.textDecoration = "none";
              }}
            >
              Login
            </Link>
          </Typography>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              backgroundColor: "#1976d2",
              '&:hover': {
                backgroundColor: "#115293",
              },
            }}
          >
            Signup
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
