package com.algomentor.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class RateLimitConfig {
    
    @Value("${rate.limit.requests:100}")
    private int requestLimit;
    
    @Value("${rate.limit.duration:60000}")
    private long durationMillis;
    
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();
    
    public Bucket resolveBucket(String key) {
        return cache.computeIfAbsent(key, k -> createNewBucket());
    }
    
    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(
            requestLimit,
            Refill.intervally(requestLimit, Duration.ofMillis(durationMillis))
        );
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
