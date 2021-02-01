package nl.melskens.whiskey.repositories;

import nl.melskens.whiskey.domain.Distillery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DistilleryRepository extends JpaRepository<Distillery, Long> {

    Page<Distillery> findAllByNameContains(final String criteria, final Pageable pageable);
}
