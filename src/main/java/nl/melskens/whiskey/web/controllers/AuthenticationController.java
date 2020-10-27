package nl.melskens.whiskey.web.controllers;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.security.UserPrincipal;
import nl.melskens.whiskey.security.jwt.JwtFilter;
import nl.melskens.whiskey.security.jwt.TokenProvider;
import nl.melskens.whiskey.services.UserService;
import nl.melskens.whiskey.web.dtos.user.JwtDto;
import nl.melskens.whiskey.web.dtos.user.LoginDto;
import nl.melskens.whiskey.web.dtos.user.RegisterDto;
import nl.melskens.whiskey.web.mappers.UserMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserMapper userMapper;
    private final TokenProvider tokenProvider;

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@Valid @RequestBody LoginDto loginDTO) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication, loginDTO.isRememberMe());

        final HttpHeaders headers = new HttpHeaders();
        headers.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        final long userId = ((UserPrincipal) authentication.getPrincipal()).getId();
        userService.setLastLoggedIn(userId);

        return new ResponseEntity<>(new JwtDto(jwt), headers, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterDto registerDTO) {
        this.userService.register(this.userMapper.toEntity(registerDTO));
        return ResponseEntity.ok("User registered successfully!");
    }
}
