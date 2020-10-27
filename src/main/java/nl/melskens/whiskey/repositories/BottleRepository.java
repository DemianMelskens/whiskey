package nl.melskens.whiskey.repositories;

import nl.melskens.whiskey.domain.Bottle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BottleRepository extends JpaRepository<Bottle, Long> {

    @Query(nativeQuery = true, value="select * from bottle b where b.id in (select f.bottle_id from favorites f where f.user_id =:userId)")
    List<Bottle> findFavorites(@Param("userId") Long userId);
}
