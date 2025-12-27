package com.darsh.MatchATS_Backend.controller;

import com.darsh.MatchATS_Backend.service.ResumeService;
import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ResumeController {
    @Autowired
    private ResumeService resumeService;

    @PostMapping("/analyze-resume")
    public ResponseEntity<String> analyzeResume(@RequestParam("file") MultipartFile file,
                                                @RequestParam(value = "jd", required = false, defaultValue = "General software engineering role") String jd) {
        Tika tika = new Tika();
        String resumeText;
        try {
            resumeText = tika.parseToString(file.getInputStream());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        String response = resumeService.analyzeResume(resumeText, jd);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/find")
    public ResponseEntity<String> findMatch(@RequestParam("files") List<MultipartFile> resumes,
                                            @RequestParam(value = "jd", required = false, defaultValue = "General software engineering role") String jd) {

        Tika tika = new Tika();
        int n = resumes.size();
        List<String> resumeTexts = new ArrayList<>();

        try {
            for (MultipartFile resume : resumes) {
                resumeTexts.add(tika.parseToString(resume.getInputStream()));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }


        String response = null;
        try {
            response = resumeService.findBestCandidate(resumeTexts, jd);
        } catch (Exception e) {
            ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(response);
    }
}
