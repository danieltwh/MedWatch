import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

// import Protected, { ProtectedRoute } from "./components/Protected";
// import ProtectedRoute from "./components/Protected";
// import { ProtectedRoutes } from "./components/Protected";
import {ProtectedRoutes, PublicRoutes} from "./components/Protected";

import ResponsiveAppBar from "./components/responsiveAppBar";
import LoginPage from "./pages/loginPage";
import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';


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

  const authenticated = localStorage.getItem("authenticated");

  console.log(authenticated);

  function checkUserAuthenticated() {
    var userLogged = localStorage.getItem("authenticated");
    return userLogged == 'true';
  }


  return (
    <BrowserRouter>
    <Routes >
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login"/>} />
      </Route> 

      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<ResponsiveAppBar/>}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
