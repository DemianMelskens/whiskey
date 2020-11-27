package nl.melskens.whiskey.domain;

import lombok.Data;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;

@Data
@Entity
@Table(name = "bottle")
public class Bottle {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  private Long age;

  private BigDecimal abv; // in percentages

  private Long volume; // in ml

  @ManyToOne(fetch = FetchType.LAZY)
  private Brand brand;
}
