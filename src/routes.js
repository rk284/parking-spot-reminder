import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Home from "./components/home";
import SavedSpot from "./components/savedSpot";

import { AuthProvider } from "./context/authContext";
import { ParkingProvider } from "./context/parkingContext";
import PrivateRoute from "./privateRoute";

const AppRoutes = () =>{
    return(
       
            <Router>
                <Routes>
                    <Route  path="/register" element={  <AuthProvider> <Register /> </AuthProvider> } />
                    <Route  path="/login" element={ <AuthProvider> <Login /> </AuthProvider> } />
                    <Route path="/" element={<Navigate to="/register" /> } />


                    <Route  path="/" element={ <AuthProvider> <PrivateRoute /> </AuthProvider>} >
                        <Route path="home" element={ <ParkingProvider>  <Home /> </ParkingProvider> }  />
                        <Route path="saved-spot" element={ <ParkingProvider>  <SavedSpot /> </ParkingProvider> }  />
                        
                    </Route>
                    
                </Routes>
            </Router>
        
    );
};

export default AppRoutes;