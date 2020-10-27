package nl.melskens.whiskey.web.dtos.distillery;

import lombok.Data;
import nl.melskens.whiskey.domain.Address;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class DistilleryDto {

  @NotBlank
  private String name;

  @NotNull
  private Address address;
}
