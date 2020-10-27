package nl.melskens.whiskey.domain;

import lombok.Data;
import nl.melskens.whiskey.domain.enums.Country;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Data
@Embeddable
public class Address {

  @Enumerated(EnumType.STRING)
  private Country country;

  private String state;

  private String city;

  @Column(name = "street_name")
  private String streetName;

  @Column(name = "zip_code")
  private String zipCode;

  @Column(name = "house_number")
  private String houseNumber;

  private Double lat;

  private Double lon;
}
