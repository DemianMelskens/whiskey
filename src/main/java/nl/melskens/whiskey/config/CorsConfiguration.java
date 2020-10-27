package nl.melskens.whiskey.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Slf4j
@Configuration
public class CorsConfiguration {

    @Value("${application.cors.allowed-origins}")
    private List<String> allowedOrigins;

    @Value("${application.cors.allowed-methods}")
    private List<String> allowedMethods;

    @Value("${application.cors.allowed-headers}")
    private List<String> allowedHeaders;

    @Value("${application.cors.exposed-headers}")
    private List<String> exposedHeaders;

    @Value("${application.cors.allow-credentials}")
    private Boolean allowCredentials;

    @Value("${application.cors.max-age}")
    private Long maxAge;

    @Bean
    public CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        final org.springframework.web.cors.CorsConfiguration config = this.assembleConfiguration();
        if (config.getAllowedOrigins() != null && !config.getAllowedOrigins().isEmpty()) {
            log.debug("Registering CORS filter");
            source.registerCorsConfiguration("/api/**", config);
            source.registerCorsConfiguration("/v2/api-docs", config);
        }
        return new CorsFilter(source);
    }

    private org.springframework.web.cors.CorsConfiguration assembleConfiguration() {
        org.springframework.web.cors.CorsConfiguration configuration = new org.springframework.web.cors.CorsConfiguration();
        configuration.setAllowedOrigins(allowedOrigins);
        configuration.setAllowedMethods(allowedMethods);
        configuration.setAllowedHeaders(allowedHeaders);
        configuration.setExposedHeaders(exposedHeaders);
        configuration.setAllowCredentials(allowCredentials);
        configuration.setMaxAge(maxAge);
        return configuration;
    }
}
