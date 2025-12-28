import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
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

export const sendEmail = (payload) => {
    // Note the { headers: { ... } } wrapper - this was missing!
    return axios.post(`http://localhost:8080/send/mail`, payload, {
        headers: {
            "Content-Type": "application/json",
        }
    });
};