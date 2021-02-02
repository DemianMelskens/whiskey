package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Bottler;
import nl.melskens.whiskey.repositories.BottlerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BottlerService {
    private final BottlerRepository bottlerRepository;

    @Transactional(readOnly = true)
    public Page<Bottler> getAll(final String criteria, final Pageable pageable) {
        if (criteria == null) {
            return this.bottlerRepository.findAll(pageable);
        } else {
            return this.bottlerRepository.findAllByNameContains(criteria, pageable);
        }
    }
}
