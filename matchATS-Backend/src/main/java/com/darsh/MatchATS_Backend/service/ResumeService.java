package com.darsh.MatchATS_Backend.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.Collections;
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
        if(resumes.isEmpty()){
            throw new Exception("Upload Valid Resume");
        }

        String prompt = String.format("""
                You are an ATS Parser. Analyze the resumes against the JD.
                
                JOB DESCRIPTION:
                %s
                
                RESUMES OF ALL APPLICANTS:
                %s
                
                Return ONLY a JSON object with this exact structure:
                {
                  "ID": "id of resume",
                  "NAME": "Name of applicant",
                  "SCORE": ATS score out of 100,
                  "SKILLS": ["skill 1","skill 2", ...],
                  "STATUS": "Strong Match" or "Partial Match" or "Low Match",
                  "EXPERIENCE": "IN YEARS",
                }
                """, jd, resumes);

        try {
            return chatClient.prompt(prompt).call().content();
        } catch (Exception e) {
            return "AI service unavailable. Please try again later.";
        }

    }
}
