package nl.melskens.whiskey.repositories;

import nl.melskens.whiskey.domain.Bottler;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BottlerRepository extends JpaRepository<Bottler, Long> {

    Page<Bottler> findAllByNameContains(final String criteria, final Pageable pageable);
}
