package nl.melskens.whiskey.services;

import lombok.RequiredArgsConstructor;
import nl.melskens.whiskey.domain.Distillery;
import nl.melskens.whiskey.repositories.DistilleryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DistilleryService {

    private final DistilleryRepository distilleryRepository;

    @Transactional(readOnly = true)
    public Page<Distillery> getAll(final String criteria, final Pageable pageable) {
        if (criteria == null) {
            return this.distilleryRepository.findAll(pageable);
        } else {
            return this.distilleryRepository.findAllByNameContains(criteria, pageable);
        }
    }
}
