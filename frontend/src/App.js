import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { authActions, selectAuth } from "./features/authSlice";

// Theme
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import themes from "themes";

// Routes
import { ProtectedRoutes, PublicRoutes } from "./components/Protected";

import ResponsiveAppBar from "./components/responsiveAppBar";
import LoginPage from "pages/Authentication/loginPage";
import SignupPage from "pages/Authentication/signupPage";
// import HomePage from "pages/homePage";
// import DashboardPage from './pages/dashboardPage';

import SignIn from "pages/Authentication/SignIn";
import SignUp from "pages/Authentication/SignUP";
import Settings from "pages/Authentication/Settings";
import ResetPass from "pages/Authentication/ResetPass";
import Dashboard from "pages/Dashboard";
import PatientList from "pages/PatientList";
import VideoPage from "pages/videoPage";

let isInitial = true;

const config = {
	// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
	// like '/berry-material-react/react/default'
	basename: "/free",
	defaultPath: "/dashboard/default",
	fontFamily: `'Roboto', sans-serif`,
	borderRadius: 12,
};

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

	// function checkUserAuthenticated() {
	// 	var userLogged = localStorage.getItem("authenticated");
	// 	return userLogged == "true";
	// }

	// function getUser() {
	// 	return {
	// 		token_type: localStorage.getItem("token_type"),
	// 		token: localStorage.getItem("token"),
	// 		authenticated: localStorage.getItem("authenticated"),
	// 	};
	// }

	// useEffect(() => {
	// 	if (isInitial) {
	// 		if (checkUserAuthenticated()) {
	// 			var user = getUser();
	// 			// console.log(user);
	// 			dispatch(authActions.login(user));
	// 		} else {
	// 			dispatch(authActions.logout());
	// 		}
	// 		// console.log(auth);
	// 		isInitial = false;
	// 	}
	// }, [dispatch]);

	return (
		<StyledEngineProvider injectFirst>
			{/* <ThemeProvider theme={themes(customization)}> */}
			<ThemeProvider
				theme={themes({
					isOpen: [], // for active default menu
					defaultId: "default",
					fontFamily: config.fontFamily,
					borderRadius: config.borderRadius,
					opened: true,
				})}
			>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<PublicRoutes />
							}
						>
							<Route
								exact
								path="/login"
								element={<LoginPage />}
							/>
							{/* <Route exact path="/signin" element={<SignIn/>} /> */}
							<Route
								exact
								path="/signup"
								element={<SignupPage />}
							/>
							{/* <Route exact path="/signup2" element={<SignUp/>} /> */}
							<Route
								exact
								path="/*"
								element={<Navigate to="/login" />}
							/>
						</Route>

						<Route
							element={
								<ProtectedRoutes />
							}
						>
							<Route element={<ResponsiveAppBar />}>
								{/* <Route
									exact
									path="/home"
									element={<Dashboard />}
								/> */}
								{/* <Route exact path="/dashboard" element={<DashboardPage />} /> */}
								<Route
									exact
									path="/dashboard"
									element={<Dashboard />}
								/>
								<Route
									exact
									path="/patientlist"
									element={<PatientList />}
								/>
								{/* <Route
									exact
									path="/stream"
									element={<VideoPage />}
								/> */}
								<Route
									exact
									path="/settings"
									element={<Settings />}
								/>
								<Route
									exact
									path="/resetpass"
									element={<ResetPass />}
								/>
								<Route
									exact
									path="/resetpass"
									element={<ResetPass />}
								/>
								<Route
									exact
									path="/*"
									element={<Navigate to="/patientlist" />}
								/>
							</Route>
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</StyledEngineProvider>
	);
}

export default App;
