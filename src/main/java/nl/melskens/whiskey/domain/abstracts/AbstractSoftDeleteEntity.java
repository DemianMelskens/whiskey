package nl.melskens.whiskey.domain.abstracts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Instant;

@Data
@MappedSuperclass
public abstract class AbstractSoftDeleteEntity<ID extends Serializable> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private ID id;

    @JsonIgnore
    private Boolean deleted;

    @JsonIgnore
    @Column(name = "deleted_date")
    private Instant deletedDate;
}
