package com.algomentor.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Configuration
@Profile("prod")
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Bean
    public DataSource dataSource() {
        String jdbcUrl = databaseUrl;
        
        // Convert Render's postgresql:// URL to jdbc:postgresql://
        if (jdbcUrl != null && jdbcUrl.startsWith("postgresql://")) {
            jdbcUrl = "jdbc:" + jdbcUrl;
        }
        
        // Extract username and password from URL if present
        String username = null;
        String password = null;
        
        if (jdbcUrl != null && jdbcUrl.contains("@")) {
            // Format: jdbc:postgresql://username:password@host:port/database
            String[] parts = jdbcUrl.split("@");
            if (parts.length == 2) {
                String credentials = parts[0].substring(parts[0].lastIndexOf("//") + 2);
                String[] credParts = credentials.split(":");
                if (credParts.length == 2) {
                    username = credParts[0];
                    password = credParts[1];
                    // Reconstruct URL without credentials
                    jdbcUrl = "jdbc:postgresql://" + parts[1];
                }
            }
        }
        
        DataSourceBuilder<?> dataSourceBuilder = DataSourceBuilder.create();
        dataSourceBuilder.driverClassName("org.postgresql.Driver");
        dataSourceBuilder.url(jdbcUrl);
        
        if (username != null) {
            dataSourceBuilder.username(username);
        }
        if (password != null) {
            dataSourceBuilder.password(password);
        }
        
        return dataSourceBuilder.build();
    }
}
