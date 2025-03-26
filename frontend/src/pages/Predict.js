import React, { useState } from "react";
import axios from "axios";
import "../styles/predict.css";

const Predict = () => {
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [prediction, setPrediction] = useState("");
        const [errorMessage, setErrorMessage] = useState("");

        const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file) {
                setSelectedFile(file);
                setPreview(URL.createObjectURL(file));
                setErrorMessage(""); // Clear previous errors
            }
        };

        const handleUpload = async() => {
            if (!selectedFile) {
                setErrorMessage("Please select a file first.");
                return;
            }

            const formData = new FormData();
            formData.append("file", selectedFile);

            try {
                const token = localStorage.getItem("token"); // ✅ Fetch token
                if (!token) {
                    setErrorMessage("Unauthorized: Please log in first.");
                    return;
                }

                const response = await axios.post("http://127.0.0.1:5000/predict", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${token}` // ✅ Send JWT token
                    }
                });

                setPrediction(response.data.prediction);
                setErrorMessage(""); // Clear errors on success
            } catch (error) {
                console.error("Error uploading file:", error);

                if (error.response) {
                    if (error.response.status === 401) {
                        setErrorMessage("Unauthorized: Please log in again.");
                    } else {
                        setErrorMessage("Prediction failed. Try again later.");
                    }
                } else {
                    setErrorMessage("Network error. Check your connection.");
                }
            }
        };

        return ( <
                div className = "predict-container" >
                <
                h1 > Cotton Disease Detection < /h1>

                <
                label htmlFor = "file-upload"
                className = "custom-file-upload" >
                Choose File <
                /label> <
                input id = "file-upload"
                type = "file"
                onChange = { handleFileChange }
                />

                {
                    selectedFile && < p className = "file-name" > { selectedFile.name } < /p>} { preview && < img src = { preview }
                        alt = "Selected"
                        className = "preview-image" / > }

                    <
                    button onClick = { handleUpload }
                    className = "upload-button" >
                        Upload & Predict <
                        /button>

                    {
                        prediction && < h2 className = "prediction-text" > Prediction: { prediction } < /h2>} {
                            errorMessage && < p className = "error-text" > { errorMessage } < /p>}  <
                                /div>
                        );
                    };

                    export default Predict;