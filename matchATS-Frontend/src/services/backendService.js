import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "multipart/form-data",
    }
});

export const analyzeResume = (payload) => {
    return apiClient.post("/resumes/analyze", payload);
};

export const findBestMatch = (payload) => {
    console.log("api is calling");
    
    return apiClient.post("/resumes/match", payload);
};