import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import Help from "./pages/Help";
import Navbar from "./components/Navbar";

const App = () => {
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
        Route path = "/predict"
        element = { < Predict / > }
        /> <
        Route path = "/help"
        element = { < Help / > }
        /> <
        /Routes> <
        />
    );
};

export default App;