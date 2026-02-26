package com.algomentor.security;

import com.algomentor.config.RateLimitConfig;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {
    
    @Autowired
    private RateLimitConfig rateLimitConfig;
    
    @Value("${rate.limit.enabled:true}")
    private boolean rateLimitEnabled;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!rateLimitEnabled) {
            return true;
        }
        
        // Skip rate limiting for health checks and auth endpoints
        String path = request.getRequestURI();
        if (path.startsWith("/actuator") || path.startsWith("/api/v1/auth")) {
            return true;
        }
        
        String key = getClientKey(request);
        Bucket bucket = rateLimitConfig.resolveBucket(key);
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
        
        if (probe.isConsumed()) {
            response.addHeader("X-Rate-Limit-Remaining", String.valueOf(probe.getRemainingTokens()));
            return true;
        } else {
            long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000;
            response.addHeader("X-Rate-Limit-Retry-After-Seconds", String.valueOf(waitForRefill));
            response.sendError(HttpStatus.TOO_MANY_REQUESTS.value(), "Rate limit exceeded. Try again in " + waitForRefill + " seconds.");
            return false;
        }
    }
    
    private String getClientKey(HttpServletRequest request) {
        // Use IP address as key, or user ID if authenticated
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader; // Use token as key for authenticated users
        }
        return request.getRemoteAddr();
    }
}
