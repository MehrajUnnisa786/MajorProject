import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home() {
    const navigate = useNavigate();

    return ( <
        div className = "home-container" >
        <
        h1 className = "home-title" > Welcome to Cotton Disease Detection < /h1> <
        p className = "home-description" >
        Upload images of your cotton plant leaves and detect diseases using our deep learning model. <
        /p>

        <
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
        Cotton(Gossypium) is a soft, natural fiber that grows around the seeds of the cotton plant and is widely used in the textile industry
        for its softness, breathability, and durability.Cultivated
        for thousands of years, cotton has played a vital role in the global economy, with evidence of its use found in ancient civilizations.Today, major cotton - producing countries include China, India,
        the United States, and Brazil, where advanced farming techniques and technology help improve yield and quality. <
        /p>

        <
        p className = "about-plant" >
        Cotton plants are susceptible to various diseases that can significantly impact yield and fiber quality.Common diseases include Bacterial Blight, which causes water - soaked lesions and defoliation; Cotton Leaf Curl Virus(CLCuV), which leads to leaf curling and stunted growth; and Fusarium Wilt, a fungal infection that blocks water flow, causing wilting and plant death.These diseases spread through infected seeds, insects, and contaminated soil.Effective disease management includes using resistant varieties, crop rotation, pest control, and AI - powered disease detection
        for early diagnosis and prevention. <
        /p> <
        /div>
    );
}

export default Home;