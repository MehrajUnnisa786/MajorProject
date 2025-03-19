import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // Import styles

const Navbar = () => {
    return ( <
        nav >
        <
        Link to = "/" > Home < /Link> <
        Link to = "/predict" > Predict < /Link> <
        Link to = "/help" > Help < /Link> <
        /nav>
    );
};

export default Navbar;