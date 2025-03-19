import React, { useState } from "react";
import axios from "axios";
import "../styles/predict.css"; // Import the CSS file

const Predict = () => {
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [prediction, setPrediction] = useState("");

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
            }
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
                div className = "predict-container" >
                <
                h1 > Cotton Disease Detection < /h1>

                { /* Custom File Upload Button */ } <
                label htmlFor = "file-upload"
                className = "custom-file-upload" >
                Choose File <
                /label> <
                input id = "file-upload"
                type = "file"
                onChange = { handleFileChange }
                />

                { /* Display file name */ } {
                    selectedFile && < p className = "file-name" > { selectedFile.name } < /p>}

                    { /* Show Preview Image */ } { preview && < img src = { preview }
                        alt = "Selected"
                        className = "preview-image" / > }

                    <
                    button onClick = { handleUpload }
                    className = "upload-button" >
                        Upload & Predict <
                        /button>

                    {
                        prediction && < h2 className = "prediction-text" > Prediction: { prediction } < /h2>} <
                            /div>
                    );
                };

                export default Predict;