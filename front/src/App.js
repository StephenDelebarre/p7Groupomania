import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import React from "react";
import Login from "./page/Login";
import Signup from "./page/Signup"
import Home from "./page/Home"
import ProtectedRoutes from "./services/ProtectedRoutes";
import Error from "./page/Error"

function App() {

    return (
        <BrowserRouter> 
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Login" element={ <Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path ="/Home" element={<ProtectedRoutes />}>
                    <Route path="/Home" element={<Home />} />
                </Route>
                <Route path="*" element={<Error />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;