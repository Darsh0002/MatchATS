package com.darsh.MatchATS_Backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResumeService {

    private final ChatClient chatClient;

    public ResumeService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }


    public String analyzeResume(String resumeText, String jd) {
        String prompt = String.format("""
                You are an expert ATS (Applicant Tracking System).
                Analyze the Resume against the provided Job Description.
                
                JOB DESCRIPTION:
                %s
                
                RESUME TEXT:
                %s
                
                Return ONLY a JSON object with this exact structure:
                {
                  "matchScore": number (0-100),
                  "strengths": ["point 1", ...],
                  "weaknesses": ["point 1", ...],
                  "missingSkills": ["skill 1", ...],
                  "recommendation": "string"
                }
                """, jd, resumeText);

        try {
            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            return "AI service unavailable. Please try again later.";
        }

    }

    public String findBestCandidate(List<String> resumes, String jd) throws Exception {
        if (resumes.isEmpty()) {
            throw new Exception("Upload Valid Resume");
        }

        String prompt = String.format("""
                You are a professional Applicant Tracking System (ATS). Your goal is to conduct a semantic analysis between a Job Description and a list of candidate resumes.
                
                ### CRITERIA FOR EVALUATION:
                1. SCORE: Calculate based on technical skill overlap, years of experience relevance, and project alignment (0-100).
                2. STATUS: 
                   - "Strong Match": Score > 80
                   - "Partial Match": Score 50-80
                   - "Low Match": Score < 50
                3. SKILLS: Extract only the most relevant technical skills that appear in BOTH the JD and the Resume.
                4. EXPERIENCE: Extract total years of experience. If less than 1 year, specify in months (e.g., "6 Months").
                
                ### INPUT DATA:
                JOB DESCRIPTION:
                %s
                
                CANDIDATE DATA (Resumes separated by separators):
                %s
                
                ### OUTPUT INSTRUCTIONS:
                - Return a JSON ARRAY of objects.
                - Each object must follow this schema:
                  {
                    "id": (unique index starting from 1),
                    "name": "Full Name",
                    "score": (integer),
                    "skills": ["Skill1", "Skill2"],
                    "status": "Match Status",
                    "experience": "Duration"
                  }
                - IMPORTANT: Return ONLY the raw JSON. No markdown blocks, no "```json", no conversational text.
                """, jd, resumes);

        try {
            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            return "AI service unavailable. Please try again later.";
        }

    }
}
