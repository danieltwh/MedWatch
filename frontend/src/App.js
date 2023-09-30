import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { authActions, selectAuth } from "./features/authSlice";

// import Protected, { ProtectedRoute } from "./components/Protected";
// import ProtectedRoute from "./components/Protected";
// import { ProtectedRoutes } from "./components/Protected";
import {ProtectedRoutes, PublicRoutes} from "./components/Protected";

import ResponsiveAppBar from "./components/responsiveAppBar";
import LoginPage from "./pages/loginPage";
import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUP'
import Settings from './components/pages/Settings'
import ResetPass from './components/pages/ResetPass'

let isInitial  = true;

function App() {
  // const [authenticated, setAuthentciated] = useState(
  //   localStorage.getItem("authenticated") == 'true' || false
  //   // false
  // );
  // // console.log(authenticated);

  // useEffect(() => {
  //   // localStorage.setItem("userLogged", JSON.stringify(userLogged));
  //   var userLogged = localStorage.getItem("authenticated");
  //   if(userLogged == 'true') {
  //     setAuthentciated(true);
  //   }

  //   console.log("Here");

  // }, []);

  // const authenticated = localStorage.getItem("authenticated");
  // console.log(authenticated);

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);



  function checkUserAuthenticated() {
    var userLogged = localStorage.getItem("authenticated");
    return userLogged == 'true';
  }

  function getUser() {
    return {
      token_type: localStorage.getItem("token_type"),
      token: localStorage.getItem("token"),
      authenticated: localStorage.getItem("authenticated")
    }
  }

  useEffect(() => {
    if(isInitial) {
      if (checkUserAuthenticated()) {
        var user = getUser();
        // console.log(user);
        dispatch(authActions.login(user));
      } else {
        dispatch(authActions.logout());
      }
      // console.log(auth);
      isInitial = false;
    }
  }, [dispatch])


  return (
    <BrowserRouter>
    <Routes >
      <Route element={<PublicRoutes authenticated={auth.authenticated}/>}>
        <Route exact path="/login" element={<LoginPage />} />
        {/* <Route exact path="/*" element={<Navigate to="/login"/>} /> */}
        <Route exact path="/" element={<SignIn/>} />
        <Route exact path="/signup" element={<SignUp/>} />

      </Route> 

      <Route element={<ProtectedRoutes authenticated={auth.authenticated} />}>
        <Route path="" element={<ResponsiveAppBar/>}>
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/dashboard" element={<DashboardPage />} />
          <Route exact path="/settings" element={<Settings/>} />
          <Route exact path="/resetpass" element={<ResetPass/>} />
          {/* <Route path="/*" element={<Navigate to="/home"/>} /> */}
           <Route exact path="/*" element={<Navigate to="/home"/>} />
        </Route>
      </Route>    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
