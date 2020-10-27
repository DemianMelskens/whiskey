package nl.melskens.whiskey.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SecurityContext {

    public Optional<Long> getCurrentUserId() {
        final org.springframework.security.core.context.SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .map(Authentication::getPrincipal)
                .filter(principal -> principal instanceof UserPrincipal)
                .map(UserPrincipal.class::cast)
                .map(UserPrincipal::getId);
    }

    public Optional<String> getCurrentUsername() {
        final org.springframework.security.core.context.SecurityContext securityContext = SecurityContextHolder.getContext();
        return Optional.ofNullable(securityContext.getAuthentication())
                .map(this::getUsernameFromAuthentication);
    }

    private String getUsernameFromAuthentication(final Authentication authentication) {
        if (authentication.getPrincipal() instanceof UserDetails) {
            final UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            return springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            return (String) authentication.getPrincipal();
        }

        return null;
    }
}