package nl.melskens.whiskey.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import nl.melskens.whiskey.domain.enums.Role;
import nl.melskens.whiskey.security.UserPrincipal;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider implements InitializingBean {

    private static final String AUTHORITIES_KEY = "auth";
    private static final String EMAIL_KEY = "email";
    private static final String USER_NAME_KEY = "username";

    @Value("${application.jwt.secret}")
    private String secret;

    @Value("${application.jwt.base64-secret}")
    private String base64Secret;

    @Value("${application.jwt.expiration}")
    private int expiration;

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception {
        final byte[] keyBytes;

        if (!StringUtils.isEmpty(secret)) {
            log.warn("Warning: the JWT key used is not Base64-encoded.");
            keyBytes = secret.getBytes(StandardCharsets.UTF_8);
        } else {
            log.debug("Using a Base64-encoded JWT secret key");
            keyBytes = Decoders.BASE64.decode(base64Secret);
        }
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String createToken(final Authentication authentication, final boolean rememberMe) {
        final UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        final String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        final long now = (new Date()).getTime();
        final Date expirationDate = new Date(now + this.expiration);

        if (!(authentication.getPrincipal() instanceof UserPrincipal)) {
            throw new IllegalStateException("Expecting only UserPrincipal instances");

        }

        return Jwts.builder()
                .setSubject(String.valueOf(userPrincipal.getId()))
                .claim(USER_NAME_KEY, userPrincipal.getUsername())
                .claim(EMAIL_KEY, userPrincipal.getEmail())
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(this.key, SignatureAlgorithm.HS512)
                .setExpiration(expirationDate)
                .compact();
    }

    public Authentication getAuthentication(final String token) {
        final Claims claims = Jwts.parserBuilder()
                .setSigningKey(this.key).build()
                .parseClaimsJws(token)
                .getBody();

        final UserPrincipal principal = new UserPrincipal(
                Long.valueOf(claims.getSubject()),
                claims.get(USER_NAME_KEY, String.class),
                claims.get(EMAIL_KEY, String.class),
                "",
                Role.valueOf(claims.get(AUTHORITIES_KEY).toString())
        );

        return new UsernamePasswordAuthenticationToken(principal, token, principal.getAuthorities());
    }

    public boolean validateToken(final String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key).build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (final JwtException | IllegalArgumentException e) {
            log.info("Invalid JWT token.");
            log.trace("Invalid JWT token trace.", e);
        }
        return false;
    }
}
