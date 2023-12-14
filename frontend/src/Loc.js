import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import PrivateRoutes from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import Signup from "./user/Signup";
import UserDashboard from "./user/UserDashboard";
import Signin from "./user/Signin";
import Cart from "./core/Cart";

const  Loc=() => {
    return(
        <BrowserRouter>
            {/* <Router> */}
                <Routes>                
                    <Route exact path="/" element={<Home/>} />        
                    <Route exact path="/signup" element={<Signup/>} />
                    <Route exact path="/signin" element={<Signin/>} />
                    <Route exact path="/cart" element={<Cart/>} />
                    <Route exact path="/user/dashboard" element={<PrivateRoutes > <UserDashboard /> </PrivateRoutes>}  /> 
        
                </Routes>
            {/* </Router> */}
      </BrowserRouter>
    )
};

export default Loc;