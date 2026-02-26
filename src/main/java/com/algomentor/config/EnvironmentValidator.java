package com.algomentor.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@Profile("prod")
public class EnvironmentValidator {
    
    private static final Logger logger = LoggerFactory.getLogger(EnvironmentValidator.class);
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${spring.datasource.url}")
    private String databaseUrl;
    
    @Value("${spring.datasource.username}")
    private String databaseUsername;
    
    @Value("${spring.datasource.password}")
    private String databasePassword;
    
    @Value("${cors.allowed.origins}")
    private String corsAllowedOrigins;
    
    @EventListener(ApplicationReadyEvent.class)
    public void validateEnvironment() {
        logger.info("Validating production environment variables...");
        
        validateNotEmpty("JWT_SECRET", jwtSecret);
        validateNotEmpty("DATABASE_URL", databaseUrl);
        validateNotEmpty("DATABASE_USERNAME", databaseUsername);
        validateNotEmpty("DATABASE_PASSWORD", databasePassword);
        validateNotEmpty("CORS_ALLOWED_ORIGINS", corsAllowedOrigins);
        
        // Validate JWT secret strength
        if (jwtSecret.length() < 32) {
            throw new IllegalStateException("JWT_SECRET must be at least 32 characters long for production");
        }
        
        // Validate CORS is not wildcard
        if (corsAllowedOrigins.contains("*")) {
            throw new IllegalStateException("CORS_ALLOWED_ORIGINS cannot contain wildcard (*) in production");
        }
        
        logger.info("✓ All required environment variables are properly configured");
    }
    
    private void validateNotEmpty(String name, String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalStateException("Required environment variable " + name + " is not set");
        }
    }
}
