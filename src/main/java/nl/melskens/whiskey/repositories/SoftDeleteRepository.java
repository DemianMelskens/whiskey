package nl.melskens.whiskey.repositories;

import nl.melskens.whiskey.domain.abstracts.AbstractSoftDeleteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

@NoRepositoryBean
public interface SoftDeleteRepository<T extends AbstractSoftDeleteEntity<ID>, ID extends Serializable> extends JpaRepository<T, ID> {

    @Override
    @Query("select e from #{#entityName} e where e.deleted=false")
    List<T> findAll();

    @Override
    @Query("select e from #{#entityName} e where e.deleted=false")
    Optional<T> findById(ID id);

    //Look up deleted entities
    @Query("select e from #{#entityName} e where e.deleted=true")
    List<T> findAllWithDeleted();


    @Override
    @Modifying
    @Query("update #{#entityName} e set e.deleted=true, e.deleted_date=:#{T(java.time.Instant).now()} where e.id=:id")
    void deleteById(@Param("id") ID id);

    @Override
    @Modifying
    @Query("update #{#entityName} e set e.deleted=true, e.deleted_date=:#{T(java.time.Instant).now()} where e.id=:#{#t.id}")
    void delete(@Param("t") T t);

    @Override
    default void deleteAll(Iterable<? extends T> entities) {
        entities.forEach(this::delete);
    }

    ;

    @Override
    @Modifying
    @Query("update #{#entityName} e set e.deleted=true, e.deleted_date=:#{T(java.time.Instant).now()}")
    void deleteAll();

    @Query("delete from #{#entityName} e where e.id=:id")
    List<T> permanentlyDeleteById(@Param("id") ID id);

    @Query("delete from #{#entityName} e where e.id=:#{#t.id}")
    List<T> permanentlyDelete(@Param("t") T t);

    default void permanentlyDeleteAll(Iterable<? extends T> entities) {
        entities.forEach(this::permanentlyDelete);
    }

    @Query("delete from #{#entityName} e")
    void permanentlyDeleteAll();
}
