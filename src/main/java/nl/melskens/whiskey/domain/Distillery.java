package nl.melskens.whiskey.domain;


import lombok.Data;
import nl.melskens.whiskey.domain.enums.Country;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "distillery")
public class Distillery {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @Embedded
  private Address address;

  @OneToMany(
    cascade = CascadeType.ALL,
    orphanRemoval = true,
    mappedBy = "distillery")
  private List<Brand> brands = new ArrayList<>();
}
