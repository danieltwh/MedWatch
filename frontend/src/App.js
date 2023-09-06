import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import ResponsiveAppBar from "./components/responsiveAppBar";
import HomePage from './pages/homePage';
import DashboardPage from './pages/dashboardPage';


function App() {
  return (
    <BrowserRouter>
    <Routes >
      <Route path="/" element={<ResponsiveAppBar/>}>
        <Route path="home" element={<HomePage />} />
        <Route path="dashboard" element={<DashboardPage />} />  
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      
    
    </Routes>
      
      
    </BrowserRouter>
  );
}

export default App;
