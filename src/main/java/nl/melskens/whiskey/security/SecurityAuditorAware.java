package nl.melskens.whiskey.security;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.enums.Role;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SecurityAuditorAware implements AuditorAware<String> {

    private final SecurityContext securityContextUtils;

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of(securityContextUtils.getCurrentUsername().orElse(Role.SYSTEM.name().toLowerCase()));
    }
}
