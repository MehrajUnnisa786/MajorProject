import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [error, setError] = useState("");
        const navigate = useNavigate();

        // Redirect user if already logged in
        useEffect(() => {
            const token = localStorage.getItem("token");
            if (token && window.location.pathname !== "/predict") {
                navigate("/predict", { replace: true }); // Avoids stacking navigation history
            }
        }, [navigate]);

        const handleLogin = async(e) => {
            e.preventDefault();
            setError("");

            try {
                const response = await fetch("http://127.0.0.1:5000/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Login failed");
                }

                // Store authentication token
                localStorage.setItem("token", data.token);

                alert("Login successful!");
                navigate("/predict"); // Redirect to Predict page
            } catch (err) {
                setError(err.message);
            }
        };

        return ( <
            div className = "d-flex justify-content-center align-items-center"
            style = {
                {
                    background: "linear-gradient(to right, #4e54c8, #8f94fb)",
                    minHeight: "100vh",
                }
            } >
            <
            div className = "card p-4 shadow rounded"
            style = {
                { width: "450px" } } >
            <
            div className = "text-center mb-4" >
            <
            h3 className = "fw-bold"
            style = {
                { color: "#4e54c8" } } > Welcome Back < /h3> <
            p className = "text-muted" > Sign in to access your account < /p> <
            /div> {
                error && < div className = "alert alert-danger" > { error } < /div>} <
                    form onSubmit = { handleLogin } >
                    <
                    div className = "mb-3" >
                    <
                    label className = "form-label fw-bold"
                style = {
                        { textAlign: "left", display: "block" } } > Email < /label> <
                    input
                type = "email"
                className = "form-control"
                placeholder = "Enter email"
                required
                value = { email }
                onChange = {
                    (e) => setEmail(e.target.value) }
                /> <
                /div> <
                div className = "mb-3 text-left" >
                    <
                    label className = "form-label fw-bold"
                style = {
                        { textAlign: "left", display: "block" } } > Password < /label> <
                    input
                type = "password"
                className = "form-control"
                placeholder = "Enter password"
                required
                value = { password }
                onChange = {
                    (e) => setPassword(e.target.value) }
                /> <
                /div> <
                button type = "submit"
                className = "btn btn-primary w-100" > Login < /button> <
                    /form> <
                    div className = "text-center mt-3" >
                    <
                    p > Don 't have an account? <a href="/signup" className="text-primary">Sign up</a></p> <
                    /div> <
                    /div> <
                    /div>
            );
        };

        export default Login;