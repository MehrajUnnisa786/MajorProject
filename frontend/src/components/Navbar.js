import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return ( <
        nav >
        <
        Link to = "/" > Home < /Link> <
        Link to = "/help" > Help < /Link> {
            token ? ( <
                >
                <
                Link to = "/predict" > Predict < /Link> <
                button onClick = { handleLogout }
                className = "logout-button" > Logout < /button> <
                />
            ) : ( <
                >
                <
                Link to = "/login" > Login < /Link> <
                Link to = "/signup" > Signup < /Link> <
                />
            )
        } <
        /nav>
    );
};

export default Navbar;