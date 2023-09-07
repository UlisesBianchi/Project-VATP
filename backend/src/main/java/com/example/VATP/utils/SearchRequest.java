package com.example.VATP.utils;

import java.time.LocalDate;

public class SearchRequest {
    private LocalDate date;
    private String keywords;

    public SearchRequest(LocalDate date, String keywords) {
        this.date = date;
        this.keywords = keywords;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }
}