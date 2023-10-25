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
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Alert } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { login } from 'features/api';
import { useDispatch } from 'react-redux';
import { authActions, selectAuth } from 'features/authSlice';
const login_wallpaper = process.env.PUBLIC_URL + '/login_wallpaper.jpeg';


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

function LoginPage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [authenticated, setAuthentciated] = useState(
    localStorage.getItem("authenticated") || false
  );
  const [loginError, setLoginError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const nav = useNavigate();
  const {location} = useLocation();
  
  const dispatch = useDispatch();
  const auth = useDispatch(selectAuth);

  const clearError = () => {
    if(loginError || errorMsg != "") {
      setLoginError(false);
      setErrorMsg("");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    clearError();

    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const resp = await login(data);

    if (resp.status == 200) {
      setAuthentciated(true);
      localStorage.setItem("authenticated", true);
      localStorage.setItem("token", resp.body.access_token);
      localStorage.setItem("token_type", resp.body.token_type);

      // Dispatch action
      dispatch(authActions.login({
        token: resp.body.access_token,
        token_type: resp.body.token_type
      }));

      // nav(location?.path || "/dashboard", { replace: true });
      nav(location?.path || "/patientlist", {replace: true});
    } else if(resp.status == 400) {
      setLoginError(true);
      setErrorMsg(resp.body.detail);
    } else {
      setLoginError(true);
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
            
            

            <Typography sx={{ my: 7 ,display: "flex", alignItems: "center" }} component="h1" variant="h4">
              <Avatar sx={{ m: 1, bgcolor: "primary.dark", padding:"6px"  }} src="logo.png" id="avatar" alt="M">
              </Avatar>
              MedWatch
            </Typography>

            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} img="static/images/logo.png" /> */}
              {/* <LockOutlinedIcon /> */}
              {/* <img src="./logo.png" alt="Logo" />  */}
            {/* </Avatar> */}
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            {loginError && <Alert severity="error">{errorMsg}</Alert>}
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginPage;
