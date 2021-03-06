package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Bottle;
import nl.melskens.whiskey.domain.User;
import nl.melskens.whiskey.repositories.BottleRepository;
import nl.melskens.whiskey.security.SecurityContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BottleService {

    private final BottleRepository bottleRepository;
    private final UserService userService;
    private final SecurityContext securityContext;

    @Transactional(readOnly = true)
    public Page<Bottle> getAll(final String criteria, final Pageable pageable) {
        if (criteria == null) {
            return this.bottleRepository.findAll(pageable);
        } else {
            return this.bottleRepository.findAllByNameContains(criteria, pageable);
        }
    }

    @Transactional(readOnly = true)
    public List<Bottle> getFavorites() {
        final Long userId = securityContext.getCurrentUserId().orElseThrow(EntityNotFoundException::new);
        return bottleRepository.findFavorites(userId);
    }

    @Transactional
    public Bottle create(final Bottle bottle) {
        return this.bottleRepository.save(bottle);
    }

    @Transactional
    public void addFavorite(final Long bottleId) {
        final User user = userService.getCurrentUser();
        final Optional<Bottle> bottle = bottleRepository.findById(bottleId);
        bottle.ifPresent(user::addFavorite);
    }

    @Transactional
    public void removeFavorite(final Long bottleId) {
        final User user = userService.getCurrentUser();
        final Optional<Bottle> bottle = bottleRepository.findById(bottleId);
        bottle.ifPresent(user::removeFavorite);
    }
}
