package com.shortformradar.exception;

public class TrendNotFoundException extends RuntimeException {

    public TrendNotFoundException(Long id) {
        this("Trend not found with id: " + id);
    }

    public TrendNotFoundException(String message) {
        super(message);
    }
}

