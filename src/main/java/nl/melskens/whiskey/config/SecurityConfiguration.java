package nl.melskens.whiskey.config;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.enums.Role;
import nl.melskens.whiskey.security.jwt.JwtConfigurer;
import nl.melskens.whiskey.security.jwt.TokenProvider;
import nl.melskens.whiskey.services.UserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    public void configure(final AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    public void configure(final WebSecurity web) {
        web.ignoring()
            .antMatchers(HttpMethod.OPTIONS, "/**")
            .antMatchers("/swagger-ui/index.html")
            .antMatchers("/test/**");
    }

    @Override
    public void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
        http
            .csrf().disable()//NOSONAR
            .authorizeRequests()//NOSONAR
            .antMatchers("/authenticate").permitAll()
            .antMatchers("/register").permitAll()
            .antMatchers(HttpMethod.GET, "/bottles", "/brands", "/distilleries", "/bottlers").permitAll()
            .antMatchers("/bottles/favorites/**", "/users/current").authenticated()
            .anyRequest().hasAuthority(Role.ADMIN.name())
            .and()
            .apply(securityConfigurerAdapter());
        // @formatter:on
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private JwtConfigurer securityConfigurerAdapter() {
        return new JwtConfigurer(tokenProvider);
    }
}
