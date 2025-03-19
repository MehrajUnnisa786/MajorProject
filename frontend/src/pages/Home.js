import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/home.css";

function Home() {
    const navigate = useNavigate(); // Initialize navigation function

    return ( <
        div className = "home-container" >
        <
        h1 className = "home-title" > Welcome to Cotton Disease Detection < /h1> <
        p className = "home-description" >
        Upload images of your cotton plant leaves and detect diseases instantly using our advanced AI model. <
        /p>

        { /* Button to navigate to Predict page */ } <
        button className = "cta-button"
        onClick = {
            () => navigate("/predict") } >
        Get Started <
        /button>

        <
        h2 className = "side-heading" > About Cotton < /h2> <
        img src = "/static/cotton.jpg"
        alt = "Cotton Plant"
        className = "cotton-image" / >

        <
        p className = "about-plant" >
        Cotton is a soft, natural fiber that grows around the seeds of the cotton plant( * Gossypium * ).It is widely used in the textile industry due to its softness, breathability, and durability. <
        /p>

        <
        p className = "about-plant" >
        The cultivation of cotton dates back thousands of years, with evidence of its use found in ancient civilizations.Today, major cotton - producing countries include China, India, the United States, and Brazil. <
        /p> <
        /div>
    );
}

export default Home;