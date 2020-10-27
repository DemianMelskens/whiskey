package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.User;
import nl.melskens.whiskey.exceptions.EmailAlreadyInUseException;
import nl.melskens.whiskey.exceptions.UsernameAlreadyInUseException;
import nl.melskens.whiskey.repositories.UserRepository;
import nl.melskens.whiskey.security.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final SecurityContext securityContext;

    @Transactional
    public void register(final User user) {
        if (this.userRepository.existsByUsername(user.getUsername())) {
            throw new UsernameAlreadyInUseException(String.format("Username: %s already in use!", user.getUsername()));
        }

        if (this.userRepository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyInUseException(String.format("Email: %s already in use!", user.getEmail()));
        }

        this.userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAll() {
        return this.userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        final Long userId = securityContext.getCurrentUserId().orElseThrow(EntityNotFoundException::new);
        return userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
    }

    @Transactional
    public void setLastLoggedIn(final Long id) {
        this.userRepository.findById(id).ifPresent(user ->
                user.setLastLogin(Instant.now())
        );
    }
}
