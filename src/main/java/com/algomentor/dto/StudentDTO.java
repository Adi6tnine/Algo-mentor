package com.algomentor.dto;

import java.time.LocalDateTime;

public class StudentDTO {
    private Long id;
    private String name;
    private String email;
    private String rollNumber;
    private String section;
    private String hackerrankProfile;
    private String leetcodeProfile;
    private String group;
    private int problemCount;
    private LocalDateTime createdAt;
    
    // HackerRank Stats
    private int hackerRankTotal;
    private int hackerRankEasy;
    private int hackerRankMedium;
    private int hackerRankHard;
    
    // LeetCode Stats
    private int leetCodeTotal;
    private int leetCodeEasy;
    private int leetCodeMedium;
    private int leetCodeHard;
    
    public StudentDTO() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getRollNumber() {
        return rollNumber;
    }
    
    public void setRollNumber(String rollNumber) {
        this.rollNumber = rollNumber;
    }
    
    public String getSection() {
        return section;
    }
    
    public void setSection(String section) {
        this.section = section;
    }
    
    public String getHackerrankProfile() {
        return hackerrankProfile;
    }
    
    public void setHackerrankProfile(String hackerrankProfile) {
        this.hackerrankProfile = hackerrankProfile;
    }
    
    public String getLeetcodeProfile() {
        return leetcodeProfile;
    }
    
    public void setLeetcodeProfile(String leetcodeProfile) {
        this.leetcodeProfile = leetcodeProfile;
    }
    
    public int getProblemCount() {
        return problemCount;
    }
    
    public void setProblemCount(int problemCount) {
        this.problemCount = problemCount;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getGroup() {
        return group;
    }
    
    public void setGroup(String group) {
        this.group = group;
    }
    
    public int getHackerRankTotal() {
        return hackerRankTotal;
    }
    
    public void setHackerRankTotal(int hackerRankTotal) {
        this.hackerRankTotal = hackerRankTotal;
    }
    
    public int getHackerRankEasy() {
        return hackerRankEasy;
    }
    
    public void setHackerRankEasy(int hackerRankEasy) {
        this.hackerRankEasy = hackerRankEasy;
    }
    
    public int getHackerRankMedium() {
        return hackerRankMedium;
    }
    
    public void setHackerRankMedium(int hackerRankMedium) {
        this.hackerRankMedium = hackerRankMedium;
    }
    
    public int getHackerRankHard() {
        return hackerRankHard;
    }
    
    public void setHackerRankHard(int hackerRankHard) {
        this.hackerRankHard = hackerRankHard;
    }
    
    public int getLeetCodeTotal() {
        return leetCodeTotal;
    }
    
    public void setLeetCodeTotal(int leetCodeTotal) {
        this.leetCodeTotal = leetCodeTotal;
    }
    
    public int getLeetCodeEasy() {
        return leetCodeEasy;
    }
    
    public void setLeetCodeEasy(int leetCodeEasy) {
        this.leetCodeEasy = leetCodeEasy;
    }
    
    public int getLeetCodeMedium() {
        return leetCodeMedium;
    }
    
    public void setLeetCodeMedium(int leetCodeMedium) {
        this.leetCodeMedium = leetCodeMedium;
    }
    
    public int getLeetCodeHard() {
        return leetCodeHard;
    }
    
    public void setLeetCodeHard(int leetCodeHard) {
        this.leetCodeHard = leetCodeHard;
    }
}
