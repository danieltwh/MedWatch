import React, { useEffect } from 'react'
import { Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';

import { useDispatch, useSelector } from "react-redux";
import { authActions, selectAuth } from "../features/authSlice";

// function Protected({ authenticated, children }) {
//     console.log(authenticated);
//     if (!authenticated) {
//         return <Navigate to="/login" replace />
//     }
//     return children
// }
// export default Protected;


// function ProtectedRoute({component: Component, ...restOfProps}) {
//     // console.log(authenticated);

//     const authenticated = localStorage.getItem("authenticated");

//     console.log("This", authenticated);

//     return (
//         <Route 
//             {...restOfProps} 
//             render={(props) => authenticated ? 
//                 <Component {...props} /> :
//                 <Navigate to="/login" replace />
//             }
//         />
//     );
// }
// export default ProtectedRoute;


// export const ProtectedRoute = ({ children }) => {
//     const { user } = useAuth();
//     if (!user) {
//       // user is not authenticated
//       return <Navigate to="/login" />;
//     }
//     return children;
// };

export const PublicRoutes = () => {
    // const authenticated = localStorage.getItem('authenticated');

    const auth = useSelector(selectAuth);

    const location = useLocation();
    // const {authenticated} = useAuth();

    // useEffect(() => {
    //     console.log("Checking Public");
    //     // console.log(auth);
    //     // console.log(auth.authenticated)
    // }, [authenticated])

    // if (auth.isLoading) {
    //     return null;
    // }

    // return (!authenticated) ? <Outlet /> : <Navigate to="/home" replace state={{path: location.pathname}}/>;

    // return (auth.authenticated == null || auth.authenticated != "true") ? <Outlet /> : <Navigate to="/home" replace state={{path: location.pathname}}/>;
    // return (!auth.authenticated) ? <Outlet /> : <Navigate to="/home" replace state={{path: location.pathname}}/>;
    return (!auth.authenticated) ? <Outlet /> : <Navigate to="/patientlist" replace state={{path: location.pathname}}/>;
}



export const ProtectedRoutes = () => {
    // const authenticated = localStorage.getItem('authenticated');
    const location = useLocation();
    // const {authenticated} = useAuth();

    const auth = useSelector(selectAuth);

    // useEffect(() => {
    //     console.log("Checking private");
    //     // console.log(auth);
    //     console.log(authenticated);

    //     if(authenticated) {
    //         console.log("Private routes allowed")
    //     }

    // }, [authenticated])


    if (auth.isLoading) {
        return null;
    }

    
    // return (authenticated == true) ? <Outlet /> : <Navigate to="/login" replace state={{path: location.pathname}}/>;
    // return (authenticated) ? <Outlet /> : <Navigate to="/login" replace state={{path: location.pathname}}/>;

    // return (auth.authenticated != null || auth.authenticated == "true") ? <Outlet /> : <Navigate to="/login" replace state={{path: location.pathname}}/>;
    return (auth.authenticated) ? <Outlet /> : <Navigate to="/login" replace state={{path: location.pathname}}/>;
    // return <Outlet />;
}