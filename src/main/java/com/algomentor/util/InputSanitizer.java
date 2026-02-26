package com.algomentor.util;

import org.springframework.stereotype.Component;
import org.owasp.encoder.Encode;

/**
 * Utility class for sanitizing user inputs to prevent XSS attacks
 */
@Component
public class InputSanitizer {
    
    /**
     * Sanitize HTML content to prevent XSS
     */
    public String sanitizeHtml(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forHtml(input);
    }
    
    /**
     * Sanitize for HTML attribute context
     */
    public String sanitizeHtmlAttribute(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forHtmlAttribute(input);
    }
    
    /**
     * Sanitize for JavaScript context
     */
    public String sanitizeJavaScript(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forJavaScript(input);
    }
    
    /**
     * Sanitize for URL context
     */
    public String sanitizeUrl(String input) {
        if (input == null) {
            return null;
        }
        return Encode.forUriComponent(input);
    }
    
    /**
     * Remove potentially dangerous characters
     */
    public String removeSpecialCharacters(String input) {
        if (input == null) {
            return null;
        }
        // Allow alphanumeric, spaces, and common punctuation
        return input.replaceAll("[^a-zA-Z0-9\\s\\-_@.,'!?]", "");
    }
    
    /**
     * Trim and normalize whitespace
     */
    public String normalizeWhitespace(String input) {
        if (input == null) {
            return null;
        }
        return input.trim().replaceAll("\\s+", " ");
    }
}
