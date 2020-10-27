package nl.melskens.whiskey.domain;


import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "brand")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    private Bottler bottler;

    @ManyToOne(fetch = FetchType.LAZY)
    private Distillery distillery;

    @OneToMany(
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            mappedBy = "brand")
    private List<Bottle> whiskies = new ArrayList<>();
}
