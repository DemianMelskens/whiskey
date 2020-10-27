package nl.melskens.whiskey.repositories;

import nl.melskens.whiskey.domain.Bottler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BottlerRepository extends JpaRepository<Bottler, Long> {
}
