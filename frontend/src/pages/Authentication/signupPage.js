import 'App.css';
import styles from './signin.module.css';
import { blue } from '@mui/material/colors';


import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert, FormHelperText } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { signup } from 'features/api';
import { useDispatch } from 'react-redux';
import { authActions, selectAuth } from 'features/authSlice';
const login_wallpaper = process.env.PUBLIC_URL + '/login_wallpaper.jpeg';

const ERROR_MESSAGE = {
  missing: "Missing information",
  invalid_email: "Invalid Email",
  email_taken: "Email has been taken",
  no_selection: "Please choose an option"
}

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MedWatch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const initialState = { firstname: "", lastname: "", email: "", password: "", role: "" };

function SignupPage() {

  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const nav = useNavigate();
  const { location } = useLocation();

  const dispatch = useDispatch();
  const auth = useDispatch(selectAuth);


  const clearError = () => {
    // console.log('here1')
    // if (signupError || errorMsg != "") {
    //   setSignupError(false);
    //   setErrorMsg("");

    //   setFieldErrors({ firstname: "", lastname: "", email: "", password: "", role: "" });
    //   console.log('here2')
      
    // }

    setSignupError(false);
    setErrorMsg("");

    // setFieldErrors({ firstname: "", lastname: "", email: "", password: "", role: "" });
    setFieldErrors({...initialState})
  }

  const [credential, setCredential] = useState({ firstname: "", lastname: "", email: "", password: "", role: "" });
  const [fieldErrors, setFieldErrors] = useState({ firstname: "", lastname: "", email: "", password: "", role: "" });

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearError();

    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
      role: data.get('role')
    });
    
    let newFieldErrors = { ...initialState };
    let hasError = false;
    // Check for errors
    // Check firstname
    if (data.get('firstname').length == 0) {
      console.log(data.get('firstname'));
      newFieldErrors.firstname = ERROR_MESSAGE.missing;

      hasError = true;
    }
    if (data.get('lastname').length == 0) {
      newFieldErrors.lastname = ERROR_MESSAGE.missing;

      hasError = true;
    }
    if (data.get('email').length == 0) {
      newFieldErrors.email = ERROR_MESSAGE.missing;

      hasError = true;
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.get("email"))) {
      newFieldErrors.email = ERROR_MESSAGE.invalid_email;

      hasError = true;
    }
    if (data.get('password').length == 0) {
      newFieldErrors.password = ERROR_MESSAGE.missing;

      hasError = true;
    }
    if (!data.get('role')) {
      newFieldErrors.role = ERROR_MESSAGE.no_selection;

      hasError = true;
    }

    if (hasError) {
      setSignupError(true);
      setErrorMsg("Missing value");
      setFieldErrors({ ...newFieldErrors })
      return
    }
    // console.log("okay to send")

    const resp = await signup(data);

    if (resp.status == 200) {
      setHasSignedUp(true);
      // console.log("success")
    } else if (resp.status == 409) {
      // Email already taken
      setSignupError(true);
      setErrorMsg(resp.body.detail);

      setFieldErrors({
        ...fieldErrors,
        email: resp.body.detail
      })
    } else {
      setSignupError(true);
      setErrorMsg(resp.body.detail);
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundImage: `url(${login_wallpaper})`,
            // backgroundImage: login_wallpaper,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 0,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* <img src="logo_black.png" alt="Logo" />  */}
            {/* <Typography component="h1"  className={styles.title} >Welcome to MedWatch</Typography> */}
            <Typography sx={{ my: 7, display: "flex", alignItems: "center" }} component="h1" variant="h4">
              <Avatar sx={{ m: 1, bgcolor: "primary.dark", padding: "6px" }} src="logo.png" id="abs" alt="A">
              </Avatar>
              MedWatch
            </Typography>

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} img="static/images/logo.png" /> */}
            {/* <LockOutlinedIcon /> */}
            {/* <img src="./logo.png" alt="Logo" />  */}
            {/* </Avatar> */}

            {(!hasSignedUp) ? (
              <>
                <Typography style={{marginBottom: "8px"}}component="h1" variant="h5">
                  Sign Up
                </Typography>
                {signupError && <Alert severity="error">{errorMsg}</Alert>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        // margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="given-name"
                        autoFocus
                        error={fieldErrors.firstname.length != 0}
                        helperText={(fieldErrors.firstname.length != 0) ? fieldErrors.firstname : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        // margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="family-name"
                        autoFocus
                        error={fieldErrors.lastname.length != 0}
                        helperText={(fieldErrors.lastname.length != 0) ? fieldErrors.lastname : ""}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        // margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        pattern="/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"
                        error={fieldErrors.email.length != 0}
                        helperText={(fieldErrors.email.length != 0) ? fieldErrors.email : ""}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        // margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={fieldErrors.password.length != 0}
                        helperText={(fieldErrors.password.length != 0) ? fieldErrors.password : ""}
                      />
                    </Grid>


                    <Grid item xs={12} container direction="row">
                      {/* <FormControl>
                    <FormLabel required id="role-selection-label">Role</FormLabel>
                    <RadioGroup row
                      aria-labelledby="role-selection-group"
                      name="role">
                      <FormControlLabel value="0" control={<Radio />} label="Staff" />
                      <FormControlLabel value="1" control={<Radio />} label="Family" />
                    </RadioGroup>
                  </FormControl> */}

                      {/* <FormControl component="fieldset" error={true}>

                    <FormLabel required id="role-selection-label">Role</FormLabel>
                    <RadioGroup row
                      aria-labelledby="role-selection-group"
                      name="role"
                    // value="0"                        
                    >
                      <FormControlLabel value="0" control={<Radio />} label="Staff" />
                      <FormControlLabel value="1" control={<Radio />} label="Family" />
                    </RadioGroup>
                    <FormHelperText>Help</FormHelperText>
                  </FormControl> */}


                      <FormControl component="fieldset" error={fieldErrors.role.length != 0}>
                        <FormLabel required id="role-selection-label">Role</FormLabel>
                        <RadioGroup row
                          aria-labelledby="role-selection-group"
                          name="role"
                          style={{ alignContent: "right" }}
                        // value="0"                        
                        >
                          <FormControlLabel value="0" control={<Radio />} label="Staff" />
                          <FormControlLabel value="1" control={<Radio />} label="Family" />
                        </RadioGroup>
                        <FormHelperText>{(fieldErrors.role.length != 0) ? fieldErrors.role : ""}</FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                    <Grid item>
                      <Link href="/login" variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </>
            ) : (
              <>
                <Grid container spacing={2}>

                  <Grid item xs={12}>
                    <Typography component="h2" variant="h5">Account Created</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Thank you for signing up with MedWatch.<br />
                      Your account has been succesfully created. <br />
                      Please proceed to login.
                    </Typography>
                  </Grid>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 5, mb: 2 }}
                    onClick={() => nav("/login")}
                  >
                    Go to Login
                  </Button>
                  {/* <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2">
                        {"Already have an account? Sign In"}
                      </Link>
                    </Grid>
                  </Grid> */}
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </>
            )}


          </Box>
        </Grid>
      </Grid >
    </ThemeProvider >
  );
}

export default SignupPage;
