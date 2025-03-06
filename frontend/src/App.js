import React, { useState } from "react";
import axios from "axios";

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async() => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setPrediction(response.data.prediction);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return ( <
            div style = {
                { textAlign: "center", marginTop: "50px" } } >
            <
            h1 > Cotton Disease Detection < /h1> <
            input type = "file"
            onChange = { handleFileChange }
            style = {
                { display: "block", margin: "0 auto 10px" } }
            /> {
                preview && < img src = { preview }
                alt = "Selected"
                style = {
                    { maxWidth: "500px", height: "300px", margin: "10px auto", display: "block" } }
                />} <
                button onClick = { handleUpload }
                style = {
                    { display: "block", margin: "10px auto" } } > Upload & Predict < /button> {
                    prediction && < h2 > Prediction: { prediction } < /h2>} <
                        /div>
                );
            }

            export default App;