import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const App = () => {
    const token = localStorage.getItem("token");

    return ( <
        >
        <
        Navbar / >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/help"
        element = { < Help / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        /> {
            token ? ( <
                Route path = "/predict"
                element = { < Predict / > }
                />
            ) : ( <
                Route path = "/predict"
                element = { < Navigate to = "/login" / > }
                />
            )
        } <
        /Routes> <
        />
    );
};

export default App;